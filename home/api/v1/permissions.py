from rest_framework import permissions


class CreateQuestionPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        if request.user.is_authenticated and request.user.user_type:
            return request.user.user_type.create_question

        return False


class ReviewQuestionPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        if request.user.is_authenticated and request.user.user_type:
            return request.user.user_type.review_question

        return False
