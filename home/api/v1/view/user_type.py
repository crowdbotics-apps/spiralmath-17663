from rest_framework import mixins, viewsets

from home.api.v1.serializer.user_type import UserTypeSerializer
from users.models import UserType


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
