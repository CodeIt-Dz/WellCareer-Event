from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenRefreshView
)
from .viewsets.EmployeViewsets import *
from .viewsets.CompanyViewsets import *

router = DefaultRouter()
router.register(r'employe',EmployeViewSet,basename='employe')
router.register(r'experience',ExperienceViewSet,basename='experience')
router.register(r'diplome',DiplomeViewSet,basename='diplome')
router.register(r'skill',SkillViewSet,basename='skill')
router.register(r'language',LanguageViewSet,basename='language')
router.register(r'profile',ProfileViewSet,basename='profile')
router.register(r'company',CompanyViewSet,basename='company')
router.register(r'companyUser',CompanyUserViewSet,basename='companyUser')
router.register(r'offer',OfferViewSet,basename='offer')
router.register(r'offeremploye',OfferEmployeViewSet,basename='offeremploye')
router.register(r'savedoffer', SavedOfferEmployeViewSet ,basename='savedoffer')


urlpatterns = [
          path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

          
          
          ] + router.urls

