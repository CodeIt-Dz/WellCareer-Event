import random
import string
from django.core.mail import  EmailMessage
from django.conf import settings
from django.template.loader import render_to_string

def generate_confirmation_code():
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))


def send_confirmation_code( instance, link):
      subject = 'Confirmez Votre Inscription - WellPharma'
      from_email = settings.DEFAULT_FROM_EMAIL
      recipient_list = [instance.email]
      if instance.__class__.__name__ == 'Company':
            html_message = render_to_string('confirmation_email_company.html', {'link': link , 'company_name': instance.name})
      else:
            html_message = render_to_string('confirmation_email.html', {'link': link , 'employe_name': instance.first_name})
      email = EmailMessage(subject,html_message,from_email,recipient_list)
      email.content_subtype = "html"

      try :
            email.send()
            print("SENT !")
      except Exception as e:
            print(f'Failed to send email: {e}')      
        


def clean_user_data(user_data):
      user_data.pop('password', None)
      user_data.pop('groups', None)
      user_data.pop('user_permissions', None)
      user_data.pop('is_staff', None)
      user_data.pop('is_superuser', None)
      user_data.pop('is_active', None)
      user_data.pop('confirmation_code', None)
      user_data.pop('confirmation_code_created_at', None)
      user_data.pop('password_reset_token', None)
      user_data.pop('is_reset_password_possible', None)
      user_data.pop('password_reset_token_created_at', None)
      
      return user_data


def send_reset_password_email(user, link):
      subject = 'Réinitialisation de Mot de Passe - WellPharma'
      from_email = settings.DEFAULT_FROM_EMAIL
      recipient_list = [user.email]
      html_message = render_to_string('reset_password_email.html', {'link': link , 'user_name': user.first_name})
      email = EmailMessage(subject,html_message,from_email,recipient_list)
      email.content_subtype = "html"
      try:
            email.send()
      except Exception as e:
            print(f'Failed to send email: {e}')