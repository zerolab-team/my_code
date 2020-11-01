from rest_framework import serializers

from lct.groups.models import Group
from lct.tasks.models import Task
from lct.users.models import User


class AssignTaskSerializer(serializers.Serializer):
    students = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role=User.Roles.STUDENT),
        many=True,
        allow_empty=True,
    )
    groups = serializers.PrimaryKeyRelatedField(
        queryset=Group.objects.all(), many=True, allow_empty=True
    )
    tasks = serializers.PrimaryKeyRelatedField(queryset=Task.objects.all(), many=True)
