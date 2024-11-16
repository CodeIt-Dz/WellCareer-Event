from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager as UserManager
from django.utils import timezone
from datetime import timedelta
from .enums import *
from django.core.validators import MinValueValidator
import uuid
# Create your models here.



class Profile(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = None
    groups = None
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100,null=True,blank=True)
    last_name = models.CharField(max_length=100,null=True,blank=True)
    phone_number = models.CharField(max_length=12,null=True,blank=True)

    password_reset_token = models.CharField(max_length=36,null=True,blank=True)
    is_reset_password_possible = models.BooleanField(default=False)
    password_reset_token_created_at = models.DateTimeField(null=True,blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def set_reset_password_token(self, token):
        self.password_reset_token = token
        self.password_reset_token_created_at = timezone.now()
        self.save()
    
    def is_reset_password_token_valid(self , token  ,expiration_hours=24):
        
        if not self.password_reset_token == token or not self.password_reset_token_created_at:
            return False
        expiration_time = self.password_reset_token_created_at + timedelta(hours=expiration_hours)
        return timezone.now() <= expiration_time

    def reset_password(self, token, new_password):
        if self.password_reset_token == token:
            self.set_password(new_password)
            self.password_reset_token = None
            self.save()
            return True
        return False      
    

      


class Employe(Profile):
      gender = models.CharField(max_length=10, choices=[(tag.value, tag.name) for tag in Gender] , null=True,blank=True) 
      address = models.TextField(null=True , blank=True)
      wilaya = models.CharField(max_length=100,null=True,blank=True)
      daira = models.CharField(max_length=100,null=True,blank=True)
      confirmation_code = models.CharField(max_length=36,null=True,blank=True)
      confirmation_code_created_at = models.DateTimeField(null=True,blank=True)
      birth_date = models.DateField()
      wished_salary = models.PositiveIntegerField(null=True,blank=True)
      military_service = models.BooleanField(default=False)
      married = models.BooleanField(default=False)
      driving_license = models.BooleanField(default=False)
      owns_vehicle = models.BooleanField(default=False)
      is_passport_valid = models.BooleanField(default=False)
      current_situation = models.CharField(max_length=20,choices=[(tag.value, tag.name) for tag in Situation],null=True,blank=True)
      is_immediate_available = models.BooleanField(default=True)
      mobility = models.CharField(max_length=20,choices=[(tag.value, tag.name) for tag in Mobility],default="Régional")
      skills = models.ManyToManyField('Skill',related_name='employes',blank=True)
      study_level = models.CharField(max_length=30 , null=True , blank=True )
      domainactivity = models.ForeignKey("Domainactivity",on_delete=models.SET_NULL,null=True,blank=True)
      profession = models.ForeignKey("Profession",on_delete=models.SET_NULL,null=True,blank=True)
      class Meta:
            verbose_name = "Employe"
            verbose_name_plural = "Employes"

      def set_confirmation_code(self, code):
          self.confirmation_code = code
          self.confirmation_code_created_at = timezone.now()
          self.save()

      def is_confirmation_code_valid(self, expiration_hours=24):
          if not self.confirmation_code or not self.confirmation_code_created_at:
              return False
          expiration_time = self.confirmation_code_created_at + timedelta(hours=expiration_hours)
          return timezone.now() <= expiration_time

      def __str__(self):
            return self.first_name + " " + self.last_name + " " + "Employe"


class Experience(models.Model):
      employe = models.ForeignKey(Employe, on_delete=models.CASCADE, related_name='experiences')
      title = models.CharField(max_length=100)
      company = models.CharField(max_length=100,null=True,blank=True)
      start_date = models.DateField()
      end_date = models.DateField(null=True,blank=True) # blank value in cas of on going work 
      description = models.TextField(null=True , blank=True)

      class Meta:
            verbose_name = "Experience"
            verbose_name_plural = "Experiences"

      def __str__(self):
            if self.company:
                  return self.title + " " + self.company + " " + "Experience"
            return self.title  + "Experience"




      
class Diplome(models.Model):
      employe = models.ForeignKey(Employe, on_delete=models.CASCADE, related_name='diplomes')
      degree = models.CharField(max_length=100)
      establishment = models.CharField(max_length=100)
      start_date = models.DateField()
      end_date = models.DateField(null=True,blank=True)
      description = models.TextField(null=True , blank=True)


      class Meta:
            verbose_name = "diplome"
            verbose_name_plural = "diplomes"

      def __str__(self):
            return self.degree + " " + self.establishment + " " + "diplome"



class Skill(models.Model):
      label = models.CharField(max_length=100)

      class Meta:
            verbose_name = "Skill"
            verbose_name_plural = "Skills"
            

      def __str__(self):
            return self.label + " " + "Skill"

class Language(models.Model):
      label = models.CharField(max_length=100)
      level = models.CharField(max_length=20,choices=[(tag.value, tag.name) for tag in NiveauLangue])

      class Meta:
            verbose_name = "Language"
            verbose_name_plural = "Languages"

      def __str__(self):
            return self.label + " " + self.level
      
      
class EmployeLanguage(models.Model):
     language = models.ForeignKey(Language,on_delete=models.SET_NULL,null=True,blank=True)
     employe = models.ForeignKey(Employe,on_delete=models.CASCADE,null=True,blank=True,related_name="languages")
     
     def __str__(self):
          return f"{self.employe} {self.language}"


class Company(models.Model):
      id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
      name = models.CharField(max_length=100)
      address = models.TextField(null=True , blank=True)
      phone_number = models.CharField(max_length=12 , null=True , blank=True)
      email = models.EmailField(null=True,blank=True)
      logo = models.ImageField(upload_to='logo/',null=True,blank=True)
      website = models.URLField(null=True,blank=True)
      confirmation_code = models.CharField(max_length=6,null=True,blank=True)
      confirmation_code_created_at = models.DateTimeField(null=True,blank=True)
      is_active = models.BooleanField(default=False) 


      class Meta:
            verbose_name = "Company"
            verbose_name_plural = "Companies"

      def set_confirmation_code(self, code):
          self.confirmation_code = code
          self.confirmation_code_created_at = timezone.now()
          self.save()

      def is_confirmation_code_valid(self, expiration_hours=24):
          if not self.confirmation_code or not self.confirmation_code_created_at:
              return False
          expiration_time = self.confirmation_code_created_at + timedelta(hours=expiration_hours)
          return timezone.now() <= expiration_time

      def __str__(self):
            return self.name + " " + "Company"




class SocialCompany(models.Model):
     company = models.ForeignKey(Company , on_delete=models.CASCADE,related_name="Socials")
     social = models.ForeignKey("Social" , on_delete=models.SET_NULL , null=True , blank=True )
     url = models.URLField()

     def __str__(self):
          return f'{self.company} {self.social}'
     


class Social(models.Model):
      label = models.CharField(max_length=60 , null=True , blank=True)

      def __str__(self):
           return self.label

      # url = models.URLField()
      # type = models.CharField(max_length=50)
      # company = models.ForeignKey(Company,on_delete=models.CASCADE,related_name='socials')





class Contact(models.Model):
      company = models.ForeignKey(Company , on_delete=models.CASCADE,related_name="contacts",null=True,blank=True)
      type = models.CharField(max_length=100,choices=[(tag.value, tag.name) for tag in Contact_type],blank=True)
      info = models.CharField(max_length=60 , null=True , blank=False)


      def __str__(self):
           return f'{self.company} {self.info}'



class CompanyUser(Profile):
      company = models.ForeignKey(Company, on_delete=models.CASCADE,related_name="company_admins",null=True,blank=True)
      is_admin = models.BooleanField(default=False)

      class Meta:
            verbose_name = "CompanyUser"
            verbose_name_plural = "CompanyUsers"
           
 
      def __str__(self) -> str:
            return self.company.name + " " + "Admin"
      
class Domainactivity(models.Model):#this would be setted by admin 
      name = models.CharField(max_length=100)



class Profession(models.Model):#this would be setted by admin profession=(metier)
      name = models.CharField(max_length=150) 
      

class Offer(models.Model):
      id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
      company = models.ForeignKey(Company, on_delete=models.CASCADE,related_name="offers")
      title = models.CharField(max_length=100)
      job_level = models.CharField(max_length=100,choices=[(tag.value, tag.name) for tag in Job_level])
      contract_type = models.CharField(max_length=100,choices=[(tag.value, tag.name) for tag in Contract_type])
      diplome = models.CharField(max_length=100,null=True,blank=True)
      start_date = models.DateField()
      end_date = models.DateField()
      description = models.TextField()
      contact = models.CharField(max_length=100,null=True , blank=True) #What is this ?
      available_spots = models.SmallIntegerField(validators=[MinValueValidator(1)])#could be changed 
      domain_activity = models.ForeignKey(Domainactivity,on_delete = models.DO_NOTHING,related_name='offers')
      profession = models.ForeignKey(Profession,on_delete = models.DO_NOTHING,related_name='offers')
      created_at = models.DateTimeField(auto_now_add=True , null=True,blank=True )
      skills = models.ManyToManyField(Skill,related_name='offers',blank=True)
      salary = models.PositiveIntegerField(null=True,blank=True)
      wilaya = models.CharField(max_length=100,null=True,blank=True)
      daira = models.CharField(max_length=100,null=True,blank=True)
      localisation = models.URLField(null=True , blank=True)


      def __str__(self):
            return self.title + " " + "Offer"



class Responsibilitie(models.Model):
      offer = models.ForeignKey(Offer, on_delete=models.CASCADE, related_name='responsibilities')
      description = models.TextField()
      

      def __str__(self):
            return self.description + " " + "Responsibilitie"


class Qualifications(models.Model):
      offer = models.ForeignKey(Offer, on_delete=models.CASCADE, related_name='qualifications')
      description = models.TextField()

      def __str__(self):
            return self.description + " " + "Qualification"
      


class ApplicationStatus(models.Model):
      name = models.CharField(max_length=50, unique=True)
      is_default = models.BooleanField(default=False)
      privileged = models.BooleanField(default=False)
      color = models.CharField(max_length=7, default="#FFFFFF")

      def __str__(self):
            return self.name

      def clean(self):
         if self.is_default:
            try:
                  temp = ApplicationStatus.objects.get(is_default=True)
                  if self != temp:
                        temp.is_default = False
                        temp.save()
            except ApplicationStatus.DoesNotExist:
                 pass


      def save(self, *args, **kwargs):
       
       
        self.clean()
        super().save(*args, **kwargs)
      

class OfferEmploye(models.Model):
      offer=models.ForeignKey(Offer,on_delete=models.CASCADE,related_name='candidates')
      employe = models.ForeignKey(Employe, on_delete=models.CASCADE , related_name='applied')
      status = models.ForeignKey(ApplicationStatus, default=None ,null=True ,on_delete=models.PROTECT
                                  ,related_name='applications')

      def save(self, *args, **kwargs):
        if not self.status:

            try:
                self.status = ApplicationStatus.objects.get(is_default=True)
            except ApplicationStatus.DoesNotExist:

                self.status = None
        super().save(*args, **kwargs)


      def __str__(self):
            return self.employe.first_name + " " + self.employe.last_name + " " + "OfferEmploye"
      

class Hobby (models.Model):
     label = models.CharField(max_length=100)

class EmployeHobby(models.Model):
     employe = models.ForeignKey(Employe,on_delete=models.CASCADE,related_name="hobbies")
     hobby = models.ForeignKey(Hobby,on_delete=models.CASCADE)



class SavedOfferEmploye(models.Model):
      offer = models.ForeignKey(Offer,on_delete=models.CASCADE,related_name='saved')
      employe = models.ForeignKey(Employe,on_delete=models.CASCADE,related_name='saved_offers')
      
      def __str__(self):
            return self.employe.first_name + " " + self.employe.last_name + " " + "SavedOfferEmploye"