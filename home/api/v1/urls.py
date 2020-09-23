from django.urls import path, include
from rest_framework.routers import DefaultRouter

from home.api.v1.view.auth import AuthViewSet, SignupViewSet
from home.api.v1.view.user import UserViewSet
from home.api.v1.view.user_type import UserTypeViewSet
from home.api.v1.view.settings import SettingsViewSet
from home.api.v1.view.messages import MessagesViewSet
from home.api.v1.view.question import QuestionViewSet
from home.api.v1.view.creator import CreatorViewSet
from home.api.v1.view.answer import AnswerViewSet

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("auth", AuthViewSet, basename="auth")
router.register("user", UserViewSet, basename="user")
router.register("user-type", UserTypeViewSet, basename="user-type")
router.register("settings", SettingsViewSet, basename="settings")
router.register("messages", MessagesViewSet, basename="messages")
router.register("question", QuestionViewSet, basename="question")
router.register("creator", CreatorViewSet, basename="creator")
router.register("answer", AnswerViewSet, basename="answer")

urlpatterns = [
    path("", include(router.urls)),
]
