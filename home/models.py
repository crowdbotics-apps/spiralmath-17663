from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import JSONField
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.translation import ugettext_lazy as _


User = get_user_model()


TERMS_CONDITION = 'terms-condition'
NON_REGISTERED_EMAIL_PATH = 'non-registered-email'
REGISTERED_EMAIL_PATH = 'registered-email'
STANDARD_CODE_PATH = 'standard-code'


class CustomText(models.Model):
    title = models.CharField(max_length=150)

    def __str__(self):
        return self.title

    @property
    def api(self):
        return f'/api/v1/customtext/{self.id}/'

    @property
    def field(self):
        return 'title'


class HomePage(models.Model):
    body = models.TextField()

    @property
    def api(self):
        return f'/api/v1/homepage/{self.id}/'

    @property
    def field(self):
        return 'body'


class Settings(models.Model):
    """Settings."""
    path = models.CharField(max_length=200, blank=True, unique=True)
    value = models.TextField(blank=True)
    value_json = JSONField(blank=True, null=True, default=None)
    is_deletable = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.pk)


class Messages(models.Model):
    """Messages."""
    users = JSONField(unique=True, default=list)
    content = JSONField(blank=True, null=True, default=dict)
    status = models.BooleanField(default=False)
    unread_counter = models.IntegerField(null=True, blank=True, default=None)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.pk)


class Creator(models.Model):
    """Creator."""
    first_name = models.CharField(_("First Name"), max_length=50)
    last_name = models.CharField(_("Last Name"), max_length=50)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.pk)


class Question(models.Model):
    """Question."""

    class QTYPE:
        MULTIPLE_CHOICE = "mc"
        SHORT_ANSWER = "sa"
        LONG_ANSWER = "la"
        TRUE_FALSE = "t/f"
        choices = (
            (MULTIPLE_CHOICE, 'Multiple choice'),
            (SHORT_ANSWER, 'Short answer'),
            (LONG_ANSWER, 'Long answer'),
            (TRUE_FALSE, 'True/False'),
        )

    class QSTYLE:
        WORD = "Word"
        NUMERIC = "Numeric"
        GRAPHIC = "Graphic"
        choices = (
            (WORD, "Word"),
            (NUMERIC, "Numeric"),
            (GRAPHIC, "Graphic"),
        )

    class ASTATUS:
        PENDING = 10
        APPROVED = 20
        REJECTED = 30
        choices = (
            (PENDING, 'Pending'),
            (APPROVED, 'Approved'),
            (REJECTED, 'Rejected'),
        )
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='question_user')
    value = models.TextField(_("Value"))
    author_name = models.CharField(_("Author Name"), max_length=200)
    reviewer_name = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True)
    grade_level = models.CharField(_("Grade Level"), max_length=3, db_index=True)
    language = models.TextField(_("Language"), default='en')
    question_type = models.CharField(
        _("Question type"), choices=QTYPE.choices, default=QTYPE.SHORT_ANSWER, max_length=100
    )
    content_source = models.TextField(_("Content source"), null=True, blank=True)
    image = models.ImageField(_("Image"), null=True, blank=True)
    image_source = models.CharField(_("Image source"), null=True, blank=True, max_length=250)
    alt_text = models.CharField(_("Alt text"), max_length=200, null=True, blank=True)
    mills_difficulty_level = models.IntegerField(
        _("Mills difficulty level"),
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    dok = models.IntegerField(_("Depth of Knowledge"), validators=[MinValueValidator(1), MaxValueValidator(4)], null=True)
    copyright_status = models.TextField(_("Copyright status"), null=True, blank=True)
    question_style = models.CharField(_("Question Style"), choices=QSTYLE.choices, default=QSTYLE.WORD, max_length=100)
    summative_status = models.BooleanField(_("Summative status"), default=False)
    approved_status = models.PositiveSmallIntegerField(_("Approved status"), choices=ASTATUS.choices, default=ASTATUS.PENDING)
    reviewer_feedback = models.TextField(_("Reviewer feedback"), null=True, blank=True)
    state_model = models.BooleanField(_("State-model"), default=False)
    author_memo = models.TextField(_("Author memo"), null=True, blank=True)
    creator = models.ForeignKey('Creator', on_delete=models.SET_NULL, null=True)
    standard_code = models.CharField(_("Standard code"), max_length=250)
    standard_set = JSONField(_("Standard set"), blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    reviewer_date = models.DateTimeField(auto_now=True)
    deleted = models.BooleanField(_("Deleted"), default=False)
    deleted_status = models.BooleanField(_("Deleted Status"), default=False)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.pk)


class Answer(models.Model):
    """Answer."""
    content = JSONField()
    question = models.ForeignKey('Question', on_delete=models.PROTECT)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.pk)
