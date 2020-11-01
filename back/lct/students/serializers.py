from rest_framework import serializers

from lct.users.models import User


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "username", "full_name", "birth_date", "educ_org"]
