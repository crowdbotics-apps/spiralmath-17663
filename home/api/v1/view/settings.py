from rest_framework import mixins, viewsets
from django.contrib.auth import get_user_model

from rest_framework.exceptions import PermissionDenied
from home.api.v1.serializer.settings import SettingsSerializer
from home.models import Settings

User = get_user_model()


class SettingsViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """Updates and retrieves settings."""

    queryset = Settings.objects.all()
    serializer_class = SettingsSerializer

    def get_queryset(self: 'SettingsViewSet'):
        """Allows only ADMIN"""
        queryset = super().get_queryset()
        if self.request.user.role == User.ROLE.ADMIN:
            pass
        else:
            raise PermissionDenied
        return queryset
