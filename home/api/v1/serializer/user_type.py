from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from users.models import UserType


class UserTypeSerializer(serializers.ModelSerializer):

    name = serializers.CharField(
        validators=[UniqueValidator(queryset=UserType.objects.all())]
    )

    class Meta:
        model = UserType
        fields = ['id', 'name', 'create_questions', 'review_questions']
