from rest_framework import serializers

from .models import CheckerTest, InOutTest, Task, TaskSample


class TaskSampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskSample
        fields = ["data_in", "data_out"]


class InOutTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = InOutTest
        fields = ["data_in", "data_out"]


class CheckerTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckerTest
        fields = ["lang", "code"]


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "name", "legend", "condition"]
