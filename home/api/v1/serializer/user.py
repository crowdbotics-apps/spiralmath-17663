from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import ValidationError, PermissionDenied
from rest_framework.validators import UniqueValidator
from typing import List

User = get_user_model()


class UserSerializerBase(serializers.ModelSerializer):
    """List any users Serializer."""

    class Meta(object):
        model = User
        fields: List[str] = [
            'id',
            'email',
            'first_name',
            'last_name',
            'user_type',
            'accepted_terms_date',
            'role',
            'status',
        ]
        read_only_fields: List[str] = ['created', 'modified']

    def is_admin(self) -> bool:
        """Is caller User.ROLE.ADMIN or not."""
        return 'request' in self.context and self.context['request'].user.role == User.ROLE.ADMIN


class UserList(UserSerializerBase):
    """List any users Serializer."""

    class Meta(UserSerializerBase.Meta):
        fields = UserSerializerBase.Meta.fields + ['status']


class UserShortList(serializers.ModelSerializer):
    """List all users for any user - id and full names only."""

    fullname = serializers.SerializerMethodField(read_only=True)

    def get_fullname(self, obj):
        """Get user full name."""
        return obj.full_name()

    class Meta(UserSerializerBase.Meta):
        fields = ['id', 'fullname']


class UserCreate(UserSerializerBase):
    """Create a user Serializer."""

    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    class Meta(UserSerializerBase.Meta):
        fields = UserSerializerBase.Meta.fields + ['password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        """Admin create user."""
        validated_data['username'] = validated_data['email']
        new_user = super().create(validated_data)
        if new_user.send_invitation_email():
            new_user.status = User.STATUS.INVITATION
            new_user.save()
        return new_user


class UserUpdate(UserSerializerBase):
    """Update a user Serializer."""

    class Meta(UserSerializerBase.Meta):
        fields = ['first_name', 'last_name', 'role', 'user_type', 'status']

    def validate(self, data):
        """Admin update user."""
        if 'status' in data and data['status'] == User.STATUS.INVITATION:
            raise ValidationError(detail={'status': ['This status is not available.']})
        return data


class UserEditorUpdate(UserSerializerBase):
    """Update a user with Role Editor Serializer."""

    class Meta(UserSerializerBase.Meta):
        read_only_fields = UserSerializerBase.Meta.fields

    def update(self, instance, validated_data):
        """Editor is not allowed edit self."""
        raise PermissionDenied


class ResetPasswordSerializer(serializers.Serializer):
    """For user reset-password."""

    email = serializers.EmailField(required=True)


class InvitationSerializer(serializers.Serializer):
    """For user send-invitation."""

    id = serializers.IntegerField(required=True)


class ContactUsSerializer(serializers.Serializer):
    """For user contact-us."""

    email = serializers.EmailField()
    message = serializers.CharField(required=True)
