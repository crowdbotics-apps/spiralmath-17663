from rest_framework import mixins, viewsets
from django.contrib.auth import get_user_model

from rest_framework.exceptions import PermissionDenied
from home.models import Creator
from home.api.v1.serializer.creator import CreatorSerializer

User = get_user_model()


class CreatorViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """Updates and retrieves creators."""

    queryset = Creator.objects.all()
    serializer_class = CreatorSerializer

    def get_queryset(self: 'CreatorViewSet'):
        """Allows only ADMIN"""
        queryset = super().get_queryset()
        role = self.request.user.role
        if role == User.ROLE.ADMIN:
            pass
        else:
            raise PermissionDenied
        return queryset