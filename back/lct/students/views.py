from rest_framework import viewsets

from lct.users.models import User
from lct.users.permissions import IsStaff

from .serializers import StudentSerializer


class StudentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.filter(role=User.Roles.STUDENT)
    serializer_class = StudentSerializer
    permission_classes = [IsStaff]
