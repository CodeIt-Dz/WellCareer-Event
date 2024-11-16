from .models import Employe , Company,OfferEmploye,Offer 
from .utils import clean_user_data
from rest_framework import serializers
from .serializers import DomainactivitySerializer , ProfessionSerializer


class LimitedCompanySerializer(serializers.ModelSerializer):
      class Meta:
            model = Company
            exclude = ['name','website','logo','email','phone_number']



class LimitedEmployeSerializer(serializers.ModelSerializer):
      class Meta:
            
            model = Employe
            exclude = ['first_name','last_name','email','phone_number']

      def to_representation(self, instance):
            rep  = super().to_representation(instance) 
            rep = clean_user_data(rep)
            return rep 
      
class LimitedOfferEmployeSerializer(serializers.ModelSerializer):# used for the company to check the applied employees (the employees should be anynomous)
      

      class Meta:
            model = OfferEmploye
            exclude = ['employe']

class LimitedOfferSerializer(serializers.ModelSerializer): # used for the employe to check the offered jobs by the company (the company should be anynomous)
      domain_activity = DomainactivitySerializer(many=False)
      profession = ProfessionSerializer(many=False)
      class Meta :
            model = Offer 
            exclude = ['company']