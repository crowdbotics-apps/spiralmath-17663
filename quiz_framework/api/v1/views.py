from rest_framework import viewsets
from rest_framework import mixins
from rest_framework import permissions

from rest_framework import filters

from home.api.v1.permissions import CreateQuestionPermission
from quiz_framework.models import QuizFrameworks, QuizQuestions
from .serializers import QuizFrameworksSerializer, QuizQuestionsSerializer


class QuizViewSet(viewsets.ModelViewSet):
    serializer_class = QuizFrameworksSerializer
    permission_classes = [permissions.IsAuthenticated, CreateQuestionPermission]
    filter_backends = [filters.OrderingFilter]
    filterset_fields = ['grade']
    ordering_fields = ['sequence', 'title']
    queryset = QuizFrameworks.objects.all()
    ordering = ['sequence', 'title']


class QuizQuestionViewSet(mixins.CreateModelMixin,
                          mixins.UpdateModelMixin,
                          mixins.DestroyModelMixin,
                          viewsets.GenericViewSet):
    serializer_class = QuizQuestionsSerializer
    permission_classes = [permissions.IsAuthenticated, CreateQuestionPermission]
    queryset = QuizQuestions.objects.all()
