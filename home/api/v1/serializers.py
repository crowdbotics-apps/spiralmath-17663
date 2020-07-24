from allauth.account.forms import ResetPasswordForm
from rest_auth.serializers import PasswordResetSerializer


class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""
    password_reset_form_class = ResetPasswordForm  # TODO for Natali

