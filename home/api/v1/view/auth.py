from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.contrib.auth import login as django_login
from django.contrib.auth import logout

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import NotAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response

from home.api.v1.serializer.auth import LoginSerializer, SignupSerializer
from home.api.v1.serializer.user import UserSerializer

User = get_user_model()


def _auth(user: User):
    """Check user authentication and return it serialized."""
    if not user or not user.pk:
        raise NotAuthenticated
    if user.status in (  # TODO for Natali consider to refactor
            User.STATUS.INACTIVE,
            User.STATUS.INVITATION,
    ):
        raise NotAuthenticated

    user_object = UserSerializer(user).data

    response = {
        'userObj': user_object,
    }
    return Response(response)


def internal_login(request, email: str, password: str):
    """Login and auth response."""
    auth_user = authenticate(username=email, password=password, request=request)
    response = _auth(auth_user)
    django_login(request, auth_user)
    return response


class AuthViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'])
    def auth(self, request):
        """First API call for frontend."""
        try:
            return _auth(request.user)
        except NotAuthenticated as exception:
            return Response(
                data={
                    'detail': exception.detail,
                },
                status=status.HTTP_403_FORBIDDEN,
            )

    @action(detail=False, methods=['post'], serializer_class=LoginSerializer)
    def login(self, request):
        """Login and auth response."""
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return internal_login(
            request=request,
            email=request.data.get('email', ''),
            password=request.data.get('password', ''),
        )

    @action(detail=False, methods=['post'])
    def logout(self, request):
        """Logout user."""
        logout(request)
        return Response()


class SignupViewSet(ViewSet):
    serializer_class = SignupSerializer
    http_method_names = ["post"]
