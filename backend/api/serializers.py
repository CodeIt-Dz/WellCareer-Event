from rest_framework import serializers
from .models import *
from .utils import clean_user_data
from .needed_serializer import CompanyOfferDetailSerializer

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
      class Meta:
            model = Profile
            fields = '__all__'
            
      def create(self, validated_data):
            # Extract many-to-many data (e.g., groups, user_permissions) from validated_data
            user_permissions = validated_data.pop('user_permissions', None)
            
            # Create the Profile instance
            profile = Profile.objects.create_superuser(**validated_data)
            
            
            if user_permissions:
                  profile.user_permissions.set(user_permissions)
            
            return profile

class DomainactivitySerializer(serializers.ModelSerializer):
      
      class Meta:
            model = Domainactivity
            fields = ["name"]

class ProfessionSerializer(serializers.ModelSerializer):

      class Meta:
            model = Profession
            fields = ["name"]

class HobbySerializer(serializers.ModelSerializer):
      class Meta:
            model = Hobby
            fields = ['label']

class EmployeHobbySerializer(serializers.ModelSerializer):
      hobby = HobbySerializer(many=False)
      class Meta:
            model=EmployeHobby
            fields = ['id','hobby']

class LanguageSerializer(serializers.ModelSerializer):
      class Meta:
            model = Language
            fields = ['label','level']

class EmployeLanguageSerializer(serializers.ModelSerializer):
      language = LanguageSerializer(many=False)
      class Meta:
            model=EmployeLanguage
            fields = ['id','language']


class EmployeSerializer(serializers.ModelSerializer):
      hobbies = EmployeHobbySerializer(many=True,read_only=True)
      languages = EmployeLanguageSerializer(many=True,read_only=True)
      domainactivity = serializers.CharField(source='domainactivity.name',read_only=True)
      profession = serializers.CharField(source="profession.name",read_only=True)
      class Meta:
            model = Employe
            fields = '__all__'

      def to_representation(self, instance):
            rep  = super().to_representation(instance) 
            rep = clean_user_data(rep)
            return rep 

      
      def create(self, validated_data):
        # Extract many-to-many data (e.g., groups, user_permissions) from validated_data
        user_permissions = validated_data.pop('user_permissions', None)
        
        # Create the Employe instance
        employe = Employe.objects.create_user(**validated_data)
        
        
        if user_permissions:
            employe.user_permissions.set(user_permissions)
        
        return employe

class ExperienceSerializer(serializers.ModelSerializer):
      class Meta:
            model = Experience
            fields = ['id','title','company','start_date','end_date']

class DiplomeSerializer(serializers.ModelSerializer):
      class Meta:
            model = Diplome
            fields = ['id','degree','establishment','start_date','end_date']

class CompanySerializer(serializers.ModelSerializer):
      class Meta:
            model = Company
            fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
      class Meta:
            model = Skill
            fields = '__all__'




class CompanySerializer(serializers.ModelSerializer):
      class Meta:
            model = Company
            fields = '__all__'

class CompanyUserSerializer(serializers.ModelSerializer):

      class Meta:
            model = CompanyUser
            fields = '__all__'

      def to_representation(self, instance):
            rep  = super().to_representation(instance) 
            rep = clean_user_data(rep)
            return rep 




class SocialSerializer(serializers.ModelSerializer):

      class Meta:
            model = Social
            fields = '__all__'

class ResponsabiliteSerializer(serializers.ModelSerializer):
      class Meta:
            model= Responsibilitie
            fields = ['description']

class QualificationsSerializer(serializers.ModelSerializer):
      class Meta:
            model= Qualifications
            exclude = ['offer','id']

class OfferSerializer(serializers.ModelSerializer):
      company = CompanySerializer()
      class Meta:
            model = Offer
            fields = '__all__'



class OfferDetailSerializer(serializers.ModelSerializer):
      company = CompanyOfferDetailSerializer()
      qualifications = QualificationsSerializer(many=True,read_only=True)
      responsibilities = ResponsabiliteSerializer(many=True,read_only=True)
      skills = SkillSerializer(many=True,read_only=True)
      candidates = serializers.IntegerField(source='candidates_count', read_only=True)

      class Meta:
            model = Offer
            fields=['title','start_date','end_date','company','salary','contract_type','job_level','wilaya', 'daira','localisation','candidates','qualifications','responsibilities','skills']








class OfferForApplicationSerializer(serializers.ModelSerializer):
      company_name = serializers.CharField(source='company.name',read_only=True)

      class Meta:
            model = Offer
            fields = ['id','title' , 'wilaya' , 'daira' ,
                       'description' , 'job_level' , 'contract_type','company_name' ]

class ApplicationStatusSerializer(serializers.ModelSerializer):
      class Meta:
            model = ApplicationStatus
            fields = '__all__'


class OfferEmployeSerializer(serializers.ModelSerializer):
      class Meta:
            model = OfferEmploye
            fields = '__all__'


class ApplicationSerializer(serializers.ModelSerializer):
      status = ApplicationStatusSerializer(many=False,read_only=True)
      offer = OfferForApplicationSerializer(many=False,read_only=True)

      

      class Meta:
            model = OfferEmploye
            fields = '__all__'

      def to_representation(self, instance):
            rep =  super().to_representation(instance)

            if not instance.status.privileged :
                  rep['offer'].pop('company_name')

            return rep                  




class SavedOfferEmployeSerializer(serializers.ModelSerializer):
      class Meta:
            model = SavedOfferEmploye
            fields = '__all__'

class DetailedSavedOfferEmployeSerializer(serializers.ModelSerializer):
      offer = OfferForApplicationSerializer(many=False,read_only=True)
      class Meta:
            model = SavedOfferEmploye
            fields = '__all__'