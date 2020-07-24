from rest_framework import exceptions, mixins, permissions, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.generics import get_object_or_404
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError as DjangoValidationError
from home.api.v1.serializer.auth import SignupSerializer
from home.api.v1.view.auth import internal_login

from home.api.v1.serializer.user import (
    UserCreate,
    UserList,
    UserSerializerBase,
    UserUpdate,
)

from django.contrib.auth import get_user_model

User = get_user_model()


def validate_password(new_password: str, password_field='newPassword'):
    """Validate newPassword field using system password validators."""
    if not new_password:
        raise ValidationError(detail={password_field: 'required'})
    try:
        password_validation.validate_password(password=new_password)
    except DjangoValidationError as django_error:
        raise ValidationError({password_field: list(django_error)})


class UserViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    """Updates and retrieves user accounts."""

    queryset = User.objects.all()
    serializer_class = UserSerializerBase
    permission_classes = (permissions.AllowAny,)

    def get_serializer(self, *args, **kwargs):
        """
        Route serializers based on action.

            list                    UserList
            retrieve                UserUpdate
            update, partial_update  UserUpdate
            create                  UserCreate
        """
        if self.request.user.is_anonymous and AllowAny in self.permission_classes:
            kwargs['context'] = self.get_serializer_context()
            return self.serializer_class(*args, **kwargs)
        if self.action == 'list':
            serializer_class = UserList
        elif self.action in {'update'}:  # TODO for Natali implement and add  'partial_update', 'retrieve'
            serializer_class = UserUpdate
        elif self.action == 'create':
            serializer_class = UserCreate
        else:
            serializer_class = None

        if serializer_class is None:
            raise exceptions.ValidationError(detail={self.action: ['Permission error.']})
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

    @action(
        detail=False,
        methods=['post'],
        url_path='confirm-token',
        permission_classes=[AllowAny],
        serializer_class=SignupSerializer,
    )
    def confirm_token(self, request):
        """Activate new password by token from Email link (User.send_confirmation_email)."""
        serializer = SignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        new_password = serializer.data['newPassword']
        validate_password(new_password)
        token = serializer.data['token']
        token = token.strip()
        user = get_object_or_404(self.queryset, emailConfirmationToken=token)
        user.emailConfirmationToken = None
        user.status = User.STATUS.ACTIVE
        user.set_password(new_password)
        user.save()
        # authenticate new user and respond default /auth content
        return internal_login(request, user.username, new_password)
