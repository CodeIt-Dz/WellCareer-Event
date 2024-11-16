from django.contrib.auth import authenticate
from .limited_serializer import *
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser
from .permissions import IsHisProfileOrStaff , IsEmloyeeObject , IsCompanyAdmin , IsCompanyUser
from .models import *
from .serializers import *

from .paginators import CustomPagination





class OfferEmployeViewSet(viewsets.ModelViewSet):
    queryset = OfferEmploye.objects.all()
    serializer_class = OfferEmployeSerializer
    pagination_class = CustomPagination

    permission_classes_by_action = {
        "list":[IsAdminUser],
        "create":[IsHisProfileOrStaff],
        "applications":[IsHisProfileOrStaff],
        "destroy":[IsEmloyeeObject]
    }

    
    
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [IsAuthenticated()]
    
            
    def create(self, request, *args, **kwargs):
        try:
            offer_id = request.data['offer']
        except KeyError:
            return Response({'error':"Offer id n'est pas passeé "},status=status.HTTP_400_BAD_REQUEST)
        if request.user.is_staff:
            try:
                employe_id = request.data['employe']
            except KeyError:
                return Response({'error':'Employe id n\'est past passeé'})
        else:
            employe_id=request.user.employe.id
            request.data["employe"] = request.user.employe.id
        if OfferEmploye.objects.filter(employe_id=employe_id , offer_id = offer_id).count()==1:
            return Response({'error':"Employe deja inscrit"},status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)
        


    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        if response.status_code == 200:
            data = response.data
            for d in data:
                
                d["employe"] = EmployeSerializer(Employe.objects.get(pk=d["employe"])).data
                d["offer"] = OfferSerializer(Offer.objects.get(pk=d["offer"])).data
            response.data = data
        return response


    @action(detail=True, methods=['POST'])
    def accept(request, pk=None):
        offer_employe = OfferEmploye.objects.get(pk=pk)
        offer_employe.is_accepted = True
        offer_employe.save()
        return Response({'message': 'Offre acceptée avec succès.'}, status=status.HTTP_200_OK)


    @action(detail=False , methods=['GET'])
    def applications(self,request):
        print(request.user)
        if request.user.is_staff:
            try:
                employe_id = request.data['employe']
            except KeyError:
                return Response({'error':'Employe id n\'est past passeé'})
        else:
            employe_id=request.user.employe.id
        offers = OfferEmploye.objects.filter(employe_id=employe_id)


        paginator = CustomPagination()
        paginated_offers = paginator.paginate_queryset(offers,request)

        return paginator.get_paginated_response(ApplicationSerializer(paginated_offers,many=True).data)
    

class SavedOfferEmployeViewSet( viewsets.ModelViewSet):
    queryset = SavedOfferEmploye.objects.all()
    serializer_class = SavedOfferEmployeSerializer
    pagination_class = CustomPagination

    permission_classes_by_action = {
        "list":[IsHisProfileOrStaff],
        "create":[IsHisProfileOrStaff],
        "destroy":[IsEmloyeeObject]
    }

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [IsAuthenticated()]
    
    def create(self, request, *args, **kwargs):
        try:
            offer_id = request.data['offer']
        except KeyError:
            return Response({'error':"Offer id n'est pas passeé "},status=status.HTTP_400_BAD_REQUEST)
        if request.user.is_staff:
            try:
                employe_id = request.data['employe']
            except KeyError:
                return Response({'error':'Employe id n\'est past passeé'})
        else:
            employe_id=request.user.employe.id
            request.data["employe"] = request.user.employe.id
        if SavedOfferEmploye.objects.filter(employe_id=employe_id , offer_id = offer_id).count()==1:
            return Response({'error':" Vous avez deja sauvgarder cet offre "},status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)
        

    @action(detail=False , methods=['GET'])
    def my_saved(self,request):
        if request.user.is_staff:
            try:
                employe_id = request.data['employe']
            except KeyError:
                return Response({'error':'Employe id n\'est past passeé'})
        else:
            employe_id=request.user.employe.id
        saved_offers = SavedOfferEmploye.objects.filter(employe_id=employe_id)


        paginator = CustomPagination()
        paginated_offers = paginator.paginate_queryset(saved_offers,request)

        return paginator.get_paginated_response(DetailedSavedOfferEmployeSerializer(paginated_offers,many=True).data)