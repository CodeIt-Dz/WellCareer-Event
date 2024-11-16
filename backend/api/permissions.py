from rest_framework.permissions import BasePermission
from .models import CompanyUser
class IsWellPharmaAdmin(BasePermission):
    """
    Custom permission to only allow WellPharma Admins to access certain views.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_staff



class IsEmloyeeObject(BasePermission):
    """
    Custom permission to only allow Users to access their own profile.
    """

    def has_object_permission(self, request, view, obj):
        print("Object id: ", obj.employe.id)
        print("return: ",request.user.id == obj.employe.id)
        return request.user.is_staff or (request.user.is_authenticated and request.user.id == obj.employe.id)
    
    


class IsHisProfileOrStaff(BasePermission):
    """
    Custom permission to only allow Users to access their own profile.
    """

    def has_object_permission(self, request, view, obj):
        # print("Request id: ", obj)
        
        # print(request.user.is_authenticated and request.user.id == obj.id)
        return request.user.is_authenticated and (request.user.id == obj.id or request.user.is_staff)
    
    def has_permission(self, request, view):
        return request.user.is_authenticated or  request.user.is_staff


class IsCompanyUser(BasePermission):
    def has_permission(self, request, view):
        #using company_id_from_url if the condition of id being present in  the url is always true if not remove it 
        company_id_from_url = view.kwargs.get('id')
        if company_id_from_url:
            return (isinstance(request.user , CompanyUser) and request.user.companyuser.company_id==company_id_from_url) or request.user.is_staff 
        else :
            #in the case there is no id in the url company_id_from_url would be None which could result in security problem
            return False
    def has_object_permission(self, request, view, obj):
        company_id_from_url = view.kwargs.get('id')
        if company_id_from_url:
            return (request.user.companyuser.id == obj.id        and request.user.companyuser.company_id==company_id_from_url ) or      request.user.is_staff
                #this part for the user to modify his profile     cofirm modifying the his parent company 
        else : 
            return False        
        
class IsCompanyAdmin(BasePermission):
    def has_permission(self,request,view):
        company_id_from_url = view.kwargs.get('id')
        if company_id_from_url:
            return (isinstance(request.user, CompanyUser) and request.user.companyuser.is_admin==True and request.user.companyuser.company_id==company_id_from_url) or request.user.is_staff
        else : 
            return False
    def has_object_permission(self,request,view,obj):
        company_id_from_url = view.kwargs.get('id')
        if company_id_from_url:
            return (request.user.companyuser.id == obj.id        and request.user.companyuser.company_id==company_id_from_url ) or      request.user.is_staff
                #this part for the user to modify his profile     confirm modifying inside his parent company 
        else : 
            return False  