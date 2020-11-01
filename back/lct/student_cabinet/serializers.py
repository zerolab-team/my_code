from rest_framework import serializers

from lct.assign_tasks.models import AssignTask
from lct.languages.models import get_language_choices
from lct.task_dispatching.models import Dispatch, TestResult
from lct.tasks.models import Task


class AssignedNestedTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["name", "legend", "condition"]


class AssignedTaskSerializer(serializers.ModelSerializer):
    task = AssignedNestedTaskSerializer(read_only=True)

    class Meta:
        model = AssignTask
        fields = ["id", "is_solved", "status", "task", "score"]


class MakeDispatchSerializer(serializers.Serializer):
    file = serializers.FileField(required=False, allow_null=True)
    code = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    lang = serializers.ChoiceField(choices=get_language_choices())

    def validate(self, attrs):
        attrs = super().validate(attrs)
        if not attrs.get("file") and not attrs.get("code"):
            raise serializers.ValidationError(
                "Должен быть загружен либо код, либо файл"
            )
        return attrs


class TestResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestResult
        fields = ["status", "exec_time"]


class DispatchSerializer(serializers.ModelSerializer):
    results = TestResultSerializer(read_only=True, many=True, source="testresult_set")

    class Meta:
        model = Dispatch
        fields = [
            "id",
            "code",
            "lang",
            "sent_dt",
            "results",
            "status",
            "score",
            "exec_time",
        ]
