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
    

      
class Student(models.Model):
      first_name = models.CharField(max_length=100,null=True , blank=True)
      last_name = models.CharField(max_length=100)
      gender = models.CharField(max_length=10, null=True , blank=True )
      phone_number = models.CharField(max_length=12,null=True,blank=True)
      birth_date = models.DateField(null=True , blank=True)
      major = models.CharField(max_length=100,null=True,blank=True)
      education_level = models.CharField(max_length=100,null=True,blank=True)
      professional_interests = models.JSONField(null=True,blank=True)

      def __str__(self):
           return self.first_name + " " + self.last_name + " " + "Student"


class FileTracker(models.Model):
    file = models.FileField(upload_to='excel_files/')

    def __str__(self):
        return self.file.name
