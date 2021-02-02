from rest_framework.routers import SimpleRouter

from .views import QuizViewSet, QuizQuestionViewSet


router = SimpleRouter()
router.register('quiz', QuizViewSet, basename='quiz')
router.register('quiz/question', QuizQuestionViewSet, basename='question')

urlpatterns = router.urls
