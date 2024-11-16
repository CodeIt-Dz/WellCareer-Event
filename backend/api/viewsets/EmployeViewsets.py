from django.contrib.auth import authenticate
from ..limited_serializer import *
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from ..permissions import IsHisProfileOrStaff 
from rest_framework_simplejwt.tokens import RefreshToken 
from ..models import *
from ..serializers import *
from ..utils import( send_confirmation_code,    
                    send_reset_password_email )
from ..jwt import CustomTokenObtainPairSerializer






class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes_by_action = {
        'login': [AllowAny],
        
    }
    
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [AllowAny()]

    #Login for WellPharma Admin
    @action(detail=False, methods=['POST'])
    def login(self,request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Authenticate the user
        user = authenticate(email=email, password=password)

        if user is None:
            return Response({'error': 'Email ou mot de passe invalide.'}, status=status.HTTP_400_BAD_REQUEST)
        elif user.is_active == False:
            return Response({'error': 'Votre compte n\'est pas encore activé.'}, status=status.HTTP_400_BAD_REQUEST)
        elif user.is_staff == False:
            return Response({'error': 'Vous n\'êtes pas autorisé à accéder à cette ressource.'}, status=status.HTTP_403_FORBIDDEN)
        
        '''# Generate JWT tokens for the authenticated user
        tokens = RefreshToken.for_user(user)
        '''
        # Manually generate the refresh token
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token  # The access token is included in the refresh token object

        serializer = CustomTokenObtainPairSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        
        # Return the tokens and user data
        '''return Response({
            'refresh': tokens["refresh"],
            'access': tokens["access"]
            
        })'''
        return Response({
            'refresh': str(refresh),
            'access': str(access_token),
        }, status=status.HTTP_200_OK)


    @action(detail=False, methods=['POST'])
    def ask_reset_password_token(self, request):
        token = request.data.get('token')
        link = request.data.get('link')
        email = request.data.get('email')

        try:

            user = Profile.objects.get(email = email)
            
            
            user.set_reset_password_token(token)
            user.save()
            send_reset_password_email(user, link)
        except:
            return Response({'error':"Ce profile n'exsist pas"},status = status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Un email de réinitialisation de mot de passe a été envoyé à votre adresse email.'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def reset_password(self,request):
        token = request.data.get('token')
        password = request.data.get('password')
        try:
            user = Profile.objects.get(password_reset_token=token)
        except Profile.DoesNotExist:
            return Response({'error': 'Utilisateur non trouvé.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not user.is_reset_password_token_valid(token):
            return Response({'error': 'Token expiré.'}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(password)
        user.save()
        return Response({'message': 'Token valide.',"email":user.email}, status=status.HTTP_200_OK)
    

class EmployeViewSet(viewsets.ModelViewSet):
    queryset = Employe.objects.all()

    serializer_class =  EmployeSerializer
        
    permission_classes_by_action = {
        'login':[AllowAny],
        'confirm_registration':[AllowAny],
        'create':[AllowAny],#Register Employe
        
    }
    
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [ IsHisProfileOrStaff()]  
    

    
    # Register an employe
    
    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        link = request.data.get('link')
        token = request.data.get('token')
        try:
            employe_instance = Employe.objects.get(email=email)
            if employe_instance.is_active:
                return Response({'error': 'Un compte avec cet email existe déjà.'}, 
                                status=status.HTTP_400_BAD_REQUEST)
            else:
                employe_instance.delete()
        except Employe.DoesNotExist:
            pass  # If no existing employe, continue to create a new one
        
        response = super().create(request, *args, **kwargs)
        
        # If the creation was successful
        if response.status_code == 201:
            # Retrieve the newly created employe
            employe = Employe.objects.get(pk=response.data['id'])
            
            # Generate a confirmation code
            # confirmation_code = generate_confirmation_code()

            #getting the confermiation code from the front 

            
            # Send the confirmation code to the employe's email
            send_confirmation_code(employe, link)
            
            # Set the confirmation code for the employe
            employe.set_confirmation_code(token)
            
            # Set the employe as inactive until confirmation
            employe.is_active = False
            employe.save()
        
        # Return a response indicating that a confirmation code has been sent
        return Response({
            'message': 'Un lien de confirmation a été envoyé à votre adresse email. Ce code expirera après 24 heures.',
            'expiration': '24 heures'
        }, status=status.HTTP_201_CREATED)


    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        print("User Email: ", request.user.email)
        if response.status_code == 200:
            user_data = response.data
            print("User Data: ", user_data)
            user_data["diplomes"] = DiplomeSerializer(Diplome.objects.filter(employe=user_data["id"]), many=True).data
            user_data["experiences"] = ExperienceSerializer(Experience.objects.filter(employe=user_data["id"]), many=True).data
            user_data["skills"] = SkillSerializer(Skill.objects.filter(employes=user_data["id"]), many=True).data

            response.data = user_data
        return response

    # Confirm the registration of an employe
    @action(detail=False, methods=['POST'])
    def confirm_registration(self, request):
        token = request.data.get('token')
        
        try:
            # Try to find an inactive employe with the given email and confirmation code
            employe = Employe.objects.get(confirmation_code=token, is_active=False)
            
            # Check if the confirmation code is still valid
            if not employe.is_confirmation_code_valid():
                return Response({'error': 'Lien de confirmation expiré.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Activate the employe and clear the confirmation code
            employe.is_active = True
            employe.confirmation_code = None
            employe.save()
            
            return Response({'message': 'Inscription confirmée avec succès.'}, status=status.HTTP_200_OK)
        except Employe.DoesNotExist:
            return Response({'error': 'Lien de confirmation invalide.'}, status=status.HTTP_400_BAD_REQUEST)

    # Login an employe
    @action(detail=False, methods=['POST'])
    def login(self, request):
        email = request.data.get('email')
        print("User Email: ", email)
        
        try:
            # Fetch the user and check if they are active
            user = Employe.objects.get(email=email)
            if not user.is_active:
                return Response({'error': 'Votre compte n\'est pas encore activé.'}, status=status.HTTP_400_BAD_REQUEST)
        except Employe.DoesNotExist:
            return Response({'error': 'Email ou mot de passe invalide.'}, status=status.HTTP_400_BAD_REQUEST)
        
        password = request.data.get('password')
        user = authenticate(email=email, password=password)

        if user is None:
            return Response({'error': 'Email ou mot de passe invalide.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Manually generate the refresh token
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token  # The access token is included in the refresh token object

        # Add custom claims to the access token
        access_token['email'] = user.email
        access_token['full_name'] = f"{user.first_name} {user.last_name}"

        # Serialize the user data
        
        # Return both the refresh and access tokens
        return Response({
            'refresh': str(refresh),
            'access': str(access_token),
        }, status=status.HTTP_200_OK)
    

    @action(detail=True, methods=['GET'])
    def offerfy(self,request,pk=None):
        employe = Employe.objects.get(pk=pk)
        

        if employe.skills.exists():
            employe_skills = employe.skills.all()
            offers = Offer.objects.all()
            offers = offers.filter(skills__in=employe_skills)
            print("Offers: ", offers)
        
        
        
        


            serializer = LimitedOfferSerializer(offers,many=True)
            return Response(serializer.data)
        else:
            return Response({[]},status=status.HTTP_200_OK)
        
        

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

    permission_classes_by_action = {
        
    }
    
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [IsAuthenticated()]


class DiplomeViewSet(viewsets.ModelViewSet):
    queryset = Diplome.objects.all()
    serializer_class = DiplomeSerializer

    permission_classes_by_action = {
        
    }
    
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [IsAuthenticated()]


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

    permission_classes_by_action = {
        
    }
    
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [IsAuthenticated()]



class LanguageViewSet(viewsets.ModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

    permission_classes_by_action = {
        
    }
    
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [IsAuthenticated()]

