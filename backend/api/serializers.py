from rest_framework import serializers
from .models import *


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
