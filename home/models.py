from django.db import models

# Create your models here.

from django.db import models

TERMS_CONDITION = 'terms-condition'
NON_REGISTERED_EMAIL_PATH = 'non-registered-email'
REGISTERED_EMAIL_PATH = 'registered-email'


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
    is_deletable = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.pk)
