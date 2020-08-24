from django.db import models

# Create your models here.

from django.db import models
from django.contrib.postgres.fields import JSONField

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
    users = JSONField(unique=True, default=[])
    content = JSONField(blank=True, null=True, default={})
    status = models.BooleanField(default=False)
    unread_counter = models.IntegerField(null=True, blank=True, default=None)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.pk)

