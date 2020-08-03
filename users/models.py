import secrets

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from django.core.mail import send_mail

EMAIL_TOKEN_LEN = 100
SYSTEM_ADMINISTRATOR_TYPE = 'System Administrator'
AUTHOR_TYPE = 'Author'
REVIEWER_TYPE = 'Reviewer'


class User(AbstractUser):

    # First Name and Last Name do not cover name patterns
    # around the globe.
    class STATUS:
        ACTIVE = 10
        INVITATION = 20
        INACTIVE = 30
        choices = (
            (ACTIVE, 'Active'),
            (INVITATION, 'Invitation'),
            (INACTIVE, 'Inactive'),
        )

    class ROLE:
        ADMIN = 'Admin'
        EDITOR = 'Editor'
        choices = (
            (ADMIN, ADMIN),
            (EDITOR, EDITOR),
        )
    first_name = models.CharField(_("First Name"), max_length=50)
    last_name = models.CharField(_("Last Name"),  max_length=50)
    email = models.CharField(_("Email"),  max_length=50, unique=True)
    accepted_terms_date = models.DateTimeField(_("Accepted Terms date"), null=True, blank=True)
    status = models.PositiveSmallIntegerField(_("Status"), choices=STATUS.choices, default=STATUS.INACTIVE)
    user_type = models.ForeignKey('UserType', null=True, blank=True, on_delete=models.SET_NULL)
    emailConfirmationToken = models.CharField(max_length=EMAIL_TOKEN_LEN, null=True, unique=True)
    role = models.CharField(_("Role"), max_length=20, choices=ROLE.choices, default=ROLE.EDITOR)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

    def send_invitation_email(self):
        """Send invitation email with password reset link."""
        self.emailConfirmationToken = secrets.token_hex(int(EMAIL_TOKEN_LEN / 2))
        self.save()
        link = f'{settings.FRONTEND_URL}/#/register?token={self.emailConfirmationToken}'
        return send_mail(
            'Invitation from SpiralMath',
            f'Welcome to SpiralMath, We are delighted that you will be working with SpiralMath to edit questions. '
            f'Before you can get started, we need to know a little more about you. '
            f'Please set up your account by clicking on the link below. \n\n{link}\n\n'
            f'Thank you,  SpiralMath',
            settings.DEFAULT_FROM_EMAIL,
            [self.email],
            fail_silently=False,
        )

    def send_confirmation_email(self):
        """Send forgot password email with password reset link."""
        self.emailConfirmationToken = secrets.token_hex(int(EMAIL_TOKEN_LEN / 2))
        self.save()
        link = f'{settings.FRONTEND_URL}/#/confirm-email/?token={self.emailConfirmationToken}'
        send_mail(
            'SpiralMath authentication',
            f'Reset your Password:\n\n{link} ',
            settings.DEFAULT_FROM_EMAIL,
            [self.email],
            fail_silently=False,
        )


class UserType(models.Model):
    """UserType"""

    # create, read, update, delete self questions All Authors can see all questions created by everyone.
    # approve / reject any author questions / cannot modify a question

    name = models.CharField(max_length=200, blank=True)
    create_questions = models.BooleanField(default=False)
    review_questions = models.BooleanField(default=False)
    is_deletable = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.pk)
