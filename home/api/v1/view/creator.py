from rest_framework import mixins, viewsets
from django.contrib.auth import get_user_model

from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.permissions import AllowAny, IsAuthenticated
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

    def get_serializer(self, *args, **kwargs):
        """
        Route serializers based on action.

             create, update, partial_update  Admin only
             list, retrieve - anyone
        """
        if self.request.user.is_anonymous and AllowAny in self.permission_classes:
            kwargs['context'] = self.get_serializer_context()
            return self.serializer_class(*args, **kwargs)
        invoker_role = self.request.user.role

        serializer_class = super().get_serializer_class()
        if invoker_role == User.ROLE.ADMIN:
            if self.action in {'update', 'partial_update', 'retrieve', 'list', 'create'}:
                serializer_class = serializer_class
            else:
                serializer_class = None
        else:
            if self.action in {'create', 'update', 'partial_update'}:
                serializer_class = None
            else:
                serializer_class = serializer_class
        if serializer_class is None:
            raise ValidationError(detail={self.action: ['Permission error.']})
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)