from rest_framework import serializers

from lct.users.models import User

from .models import Group


class GroupSerializer(serializers.ModelSerializer):
    students = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role=User.Roles.STUDENT), many=True
    )

    class Meta:
        model = Group
        fields = ["name", "students"]
