from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from users.models import EMAIL_TOKEN_LEN


class LoginSerializer(serializers.Serializer):
    """Using in auth.login."""

    password = serializers.CharField(max_length=100)
    email = serializers.CharField()


class SignupSerializer(serializers.Serializer):
    """Using in auth.login."""

    newPassword = serializers.CharField(max_length=100)
    confirmPassword = serializers.CharField(max_length=100)
    token = serializers.CharField(max_length=EMAIL_TOKEN_LEN, min_length=EMAIL_TOKEN_LEN)

    def validate(self, data):
        """Check that newPassword should match with confirmPassword."""
        if data['newPassword'] != data['confirmPassword']:
            raise ValidationError(detail={'newPassword': ['not match with confirmPassword']})
        return data

