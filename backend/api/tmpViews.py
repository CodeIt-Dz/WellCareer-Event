import csv
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer
from django.conf import settings
import os

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def create(self, request, *args, **kwargs):
        print(request.data)
        return super().create(request, *args, **kwargs)


#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)

#         csv_file_path = os.path.join(settings.MEDIA_ROOT, 'students_data.csv')
#         is_file_new = not os.path.exists(csv_file_path)

#         with open(csv_file_path, mode='a', newline='', encoding='utf-8') as csv_file:
#             writer = csv.writer(csv_file)
#             if is_file_new:
#                 writer.writerow([
#                     'First Name', 'Last Name', 'Gender', 'Phone Number', 
#                     'Birth Date', 'Major', 'Education Level', 'Professional Interests'
#                 ])
#             writer.writerow([
#                 serializer.validated_data.get('first_name', ''),
#                 serializer.validated_data.get('last_name', ''),
#                 serializer.validated_data.get('gender', ''),
#                 serializer.validated_data.get('phone_number', ''),
#                 serializer.validated_data.get('birth_date', ''),
#                 serializer.validated_data.get('major', ''),
#                 serializer.validated_data.get('education_level', ''),
#                 serializer.validated_data.get('professional_interests', ''),
#             ])

#         self.perform_create(serializer)

#         headers = self.get_success_headers(serializer.data)
#         return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
