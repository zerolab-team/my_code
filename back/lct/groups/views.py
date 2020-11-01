from rest_framework import viewsets

from lct.users.permissions import IsStaff

from .models import Group
from .serializers import GroupSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsStaff]
