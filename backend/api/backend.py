from django.contrib.auth.backends import BaseBackend
from .models import Profile


class EmailBackend(BaseBackend):
    
    def authenticate(self, request, email=None, password=None):
            print("email",email)
            try :
                  profile = Profile.objects.get(email=email)
                  if profile.check_password(password):
                        return profile
            except Profile.DoesNotExist:
                  return None
    def get_user(self, user_id):
          try:
                return Profile.objects.get(pk=user_id)
          except Profile.DoesNotExist:
                return None