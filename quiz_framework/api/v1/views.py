from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.exceptions import PermissionDenied

from home.api.v1.view.question import UserTypePermissionMixin
from quiz_framework.models import QuizFrameworks, QuizQuestions
from .serializers import QuizFrameworksSerializer, QuizQuestionsSerializer


class QuizViewSet(UserTypePermissionMixin,
                  viewsets.ModelViewSet):
    serializer_class = QuizFrameworksSerializer

    def get_queryset(self):
        if not self.has_permission(self.request):
            raise PermissionDenied
        return QuizFrameworks.objects.all()


class QuizQuestionViewSet(UserTypePermissionMixin,
                          mixins.CreateModelMixin,
                          mixins.UpdateModelMixin,
                          mixins.DestroyModelMixin,
                          viewsets.GenericViewSet):
    serializer_class = QuizQuestionsSerializer

    def get_queryset(self):
        if not self.has_permission(self.request):
            raise PermissionDenied
        return QuizQuestions.objects.all()
