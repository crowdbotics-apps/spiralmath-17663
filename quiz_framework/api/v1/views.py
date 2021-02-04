from rest_framework import viewsets
from rest_framework import mixins
from rest_framework import permissions

from home.api.v1.permissions import CreateQuestionPermission
from quiz_framework.models import QuizFrameworks, QuizQuestions
from .serializers import QuizFrameworksSerializer, QuizQuestionsSerializer


class QuizViewSet(viewsets.ModelViewSet):
    serializer_class = QuizFrameworksSerializer
    permission_classes = [permissions.IsAuthenticated, CreateQuestionPermission]
    filterset_fields = ['grade']
    queryset = QuizFrameworks.objects.all()


class QuizQuestionViewSet(mixins.CreateModelMixin,
                          mixins.UpdateModelMixin,
                          mixins.DestroyModelMixin,
                          viewsets.GenericViewSet):
    serializer_class = QuizQuestionsSerializer
    permission_classes = [permissions.IsAuthenticated, CreateQuestionPermission]
    queryset = QuizQuestions.objects.all()
