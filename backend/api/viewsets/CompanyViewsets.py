from django.contrib.auth import authenticate
from ..limited_serializer import *
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.tokens import RefreshToken 
from ..models import *
from django.db.models import Count
from ..serializers import *
from ..utils import( generate_confirmation_code,
                    send_confirmation_code,    
                    clean_user_data )
from ..paginators import CustomPagination
from django_filters.rest_framework import DjangoFilterBackend
from ..filters import OfferFilter





class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    permission_classes_by_action = {
        "create":[AllowAny],
        "confirm_registration":[AllowAny]
        
    }
    
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [IsAuthenticated()]

    
    def create(self, request, *args, **kwargs):
        try:
            password = request.data["password"]
        except KeyError:
            return Response({
                "message": "Le mot de passe est requis pour créer un compte."
                
            } , status=status.HTTP_400_BAD_REQUEST)
        response = super().create(request, *args, **kwargs)
        if response.status_code == 201:
            # Retrieve all company insta nces with the same email as the newly created company, excluding the current company instance
            company_instances = Company.objects.filter(email=response.data['email']).exclude(pk=response.data['id'])
            # Get the current company instance using its primary key
            company = Company.objects.get(pk=response.data['id'])
            # Iterate through the company instances with the same email
            for c in company_instances:
                # Check if any of the existing companies is active
                if c.is_active:
                    # If an active company exists, delete the newly created company and return an error response
                    company.delete()
                    return Response({'error': 'Un compte avec cet email existe déjà.'}, status=status.HTTP_400_BAD_REQUEST)
                # If the company is not active, delete it
                c.delete()
                
        
            confirmation_code = generate_confirmation_code()
            send_confirmation_code(company, confirmation_code)
            company.set_confirmation_code(confirmation_code)
            
            company.is_active = False
            company.save()
            company_admin = CompanyUser.objects.create_user(company=company, email=company.email, password=password,is_admin=True)

            return Response({
                'message': 'Un code de confirmation a été envoyé à votre adresse email. Ce code expirera après 24 heures.',
                'expiration': '24 heures'
            }, status=status.HTTP_201_CREATED)
        

    @action(detail=False, methods=['POST'])
    def confirm_registration(self, request):
        code = request.data.get('code')
        email = request.data.get('email')
        
        try:
            company = Company.objects.get(email=email, confirmation_code=code, is_active=False)
            if not company.is_confirmation_code_valid():
                return Response({'error': 'Code de confirmation expiré.'}, status=status.HTTP_400_BAD_REQUEST)
            company.is_active = True
            company.confirmation_code = None
            company.save()
            
            return Response({
                            'company': company.id,
                            'message': 'Inscription confirmée avec succès.' 
                             
                             }, status=status.HTTP_200_OK)
        except Company.DoesNotExist:
            return Response({'error': 'Code de confirmation ou email invalide.'}, status=status.HTTP_400_BAD_REQUEST)


class CompanyUserViewSet(viewsets.ModelViewSet):
    queryset = CompanyUser.objects.all()
    serializer_class = CompanyUserSerializer

    permission_classes_by_action = {
        "login":[AllowAny]
    }
    
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [IsAuthenticated()]
    
    def create(self, request, *args, **kwargs):
        try:
            company = request.data["company"]
        except KeyError:
            company = request.user.companyadmin.company
            request.data["company"] = company
        return super().create(request, *args, **kwargs)
    

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
        
        # Generate JWT tokens for the authenticated user
        tokens = RefreshToken.for_user(user)
        
        # Serialize the user data
        user_data = CompanyUserSerializer(user.companyuser).data
        
        # Remove sensitive/unwanted information from the user data
        user_data = clean_user_data(user_data)

        
        # Return the tokens and user data
        return Response({
            'refresh': str(tokens),
            'access': str(tokens.access_token),
            'user': user_data
        })


class DomainactivityViewSet(viewsets.ModelViewSet):
    queryset=Domainactivity.objects.all()
    serializer_class=DomainactivitySerializer


class ProfessionViewSet(viewsets.ModelViewSet):
    queryset=Profession.objects.all()
    serializer_class = ProfessionSerializer


class SocialViewset(viewsets.ModelViewSet):
    queryset = Social.objects.all()
    serializer_class = SocialSerializer


class OfferViewSet(viewsets.ModelViewSet):
    queryset=Offer.objects.annotate(candidates_count=Count('candidates')).order_by('-created_at')
    pagination_class = CustomPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = OfferFilter
    
    def get_serializer_class(self):
        if self.request.user.is_staff :
            return OfferSerializer
        elif self.action == 'retrieve':
            return OfferDetailSerializer 
        else :
            return LimitedOfferSerializer

    permission_classes_by_action = {
        "list":[AllowAny],
        "accept":[],
        "retrieve":[AllowAny]
    }


    
    
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [IsAuthenticated()]


    

    def create(self, request, *args, **kwargs):
        try:
            company = request.data["company"]
        except KeyError:
            request.data["company"] = request.user.companyadmin.company.id
        return super().create(request, *args, **kwargs)
    

    @action(detail=False, methods=['GET'])
    def for_employe(self,request,employe_pk=None):
        employe = Employe.objects.get(pk=employe_pk)

        if employe.skills.exists():
            offers = offers.filter(skills__in=employe.skills.all()).distinct()
        
        if employe.wilaya:
            offers = offers.filter(wilaya=employe.wilaya)
        
        


        serializer = OfferSerializer(offers,many=True)
        return Response(serializer.data)

        
