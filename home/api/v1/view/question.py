from rest_framework import exceptions, mixins, viewsets, status
from django.contrib.auth import get_user_model

from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import ValidationError, PermissionDenied, NotFound
from home.models import Question, Answer
from users.models import User, AUTHOR_TYPE
from home.api.v1.serializer.question import QuestionBase, QuestionCreate, QuestionList, QuestionUpdate
from home.api.v1.serializer.answer import AnswerSerializer


class QuestionViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """Updates and retrieves user_types."""

    queryset = Question.objects.all()
    serializer_class = QuestionBase
    filterset_fields = ("creator",)

    def get_queryset(self: 'QuestionViewSet'):
        """Allows only those who can create/review questions."""
        queryset = super().get_queryset()
        can_create = self.request.user.user_type.create_questions
        can_review = self.request.user.user_type.review_questions
        if can_create or can_review:
            pass
        else:
            raise PermissionDenied
        return queryset

    def get_serializer(self, *args, **kwargs):
        """
        Route serializers based on action.

            list                    QuestionList
            retrieve                QuestionUpdate
            update, partial_update  QuestionUpdate
            create                  QuestionCreate
        """
        if self.request.user.is_anonymous and AllowAny in self.permission_classes:
            kwargs['context'] = self.get_serializer_context()
            return self.serializer_class(*args, **kwargs)
        can_create_questions = False
        can_review_questions = False
        if self.request.user.user_type:
            can_create_questions = self.request.user.user_type.create_questions
            can_review_questions = self.request.user.user_type.review_questions
        if self.action == 'list' and (can_create_questions or can_review_questions):
            serializer_class = QuestionList
        elif self.action == 'retrieve' and (can_create_questions or can_review_questions):
            serializer_class = QuestionBase
        elif self.action in {'update', 'partial_update'} and (can_create_questions or can_review_questions):
            serializer_class = QuestionUpdate
        elif self.action == 'create' and can_create_questions:
            serializer_class = QuestionCreate
        else:
            serializer_class = None
        if serializer_class is None:
            raise exceptions.ValidationError(detail={self.action: ['Permission error.']})
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

    @action(
        detail=True,
        methods=['get'],
        url_path='answers',
        serializer_class=AnswerSerializer
    )
    def load(self, request, pk):
        answers = Answer.objects.filter(question=pk).all()
        return Response({"details": AnswerSerializer(answers, many=True).data})
