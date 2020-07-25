from rest_framework import mixins, viewsets
from django.contrib.auth import get_user_model

from rest_framework.exceptions import PermissionDenied
from home.api.v1.serializer.user_type import UserTypeSerializer
from users.models import UserType

User = get_user_model()


class UserTypeViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """Updates and retrieves user_types."""

    queryset = UserType.objects.all()
    serializer_class = UserTypeSerializer

    def get_queryset(self: 'UserTypeViewSet'):
        """Allows only ADMIN"""
        queryset = super().get_queryset()
        role = self.request.user.role
        if role == User.ROLE.ADMIN:
            pass
        else:
            raise PermissionDenied
        return queryset