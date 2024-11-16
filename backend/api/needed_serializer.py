from rest_framework import serializers
from .models import *

class SocialSerializer(serializers.ModelSerializer):

      class Meta:
            model = Social
            fields = ['label']

class SocialCompanySerializer(serializers.ModelSerializer):
     label = serializers.CharField(source='social.label',read_only=True)

     class Meta:
          model = SocialCompany
          fields = ['label','url']

class ContactSerializer(serializers.ModelSerializer):
      class Meta:
            model=Contact
            exclude = ['company','id']

class CompanyOfferDetailSerializer(serializers.ModelSerializer):
    socials = SocialCompanySerializer(source='socialcompany_set',many=True,read_only=True)
    contacts = ContactSerializer(many=True,read_only=True)

    class Meta:
        model = Company
        fields = ['name','logo','socials','contacts']