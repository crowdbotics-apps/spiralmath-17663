from rest_framework import mixins, viewsets
from django.contrib.auth import get_user_model

from rest_framework.exceptions import PermissionDenied
from home.models import Answer
from home.api.v1.serializer.answer import AnswerSerializer

User = get_user_model()


class AnswerViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """Updates and retrieves answers."""

    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

    def get_queryset(self: 'AnswerViewSet'):
        """Allows only those who can create questions."""
        queryset = super().get_queryset()
        can_create = self.request.user.user_type.create_questions
        if can_create:
            pass
        else:
            raise PermissionDenied
        return queryset
