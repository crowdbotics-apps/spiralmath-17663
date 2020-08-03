from rest_framework import mixins, viewsets
from django.contrib.auth import get_user_model

from rest_framework.permissions import AllowAny
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.decorators import action
from rest_framework.response import Response
from home.api.v1.serializer.settings import SettingsSerializer, SettingsUpdate
from home.models import Settings, TERMS_CONDITION

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

    def get_serializer(self, *args, **kwargs):
        """
        Route serializers based on action.

            list, retrieve, create          SettingsSerializer
            update, partial_update          SettingsUpdate
        """
        if self.request.user.is_anonymous and AllowAny in self.permission_classes:
            kwargs['context'] = self.get_serializer_context()
            return self.serializer_class(*args, **kwargs)
        invoker_role = self.request.user.role

        serializer_class = super().get_serializer_class()
        if invoker_role == User.ROLE.ADMIN:
            if self.action in {'update', 'partial_update'}:
                serializer_class = SettingsUpdate
            elif self.action in {'retrieve', 'list'}:
                serializer_class = SettingsSerializer
            elif self.action in {'create'}:
                serializer_class = SettingsSerializer
            else:
                serializer_class = None

        if serializer_class is None:
            raise ValidationError(detail={self.action: ['Permission error.']})
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

    @action(
            detail=False,
            methods=['get'],
            url_path='terms',
            permission_classes=[AllowAny]
        )
    def terms(self, request):
        """Get Terms and Condition text."""
        terms = Settings.objects.filter(path=TERMS_CONDITION).first()
        return Response(
            data={
                'detail': terms.value,
            },
        )

    def destroy(self, request, *args, **kwargs):
        setting = self.get_object()
        if setting and not setting.is_deletable:
            raise PermissionDenied
        return super(SettingsViewSet, self).destroy(request, *args, **kwargs)
