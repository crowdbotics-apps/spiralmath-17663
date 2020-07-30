from rest_framework import serializers
from users.models import UserType


class UserTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserType
        fields = ['id', 'name', 'create_questions', 'review_questions']
