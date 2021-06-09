from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _

User = get_user_model()

PK, K, G1, G2, G3, G4, G5, G6, \
    G7, G8, G9, G10, G11, G12 = ['PK', 'K', '1', '2', '3', '4', '5',
                                 '6', '7', '8', '9', '10', '11', '12']
GRADE_CHOICES = (
    (PK, 'PK'), (K, 'K'), (G1, '1'), (G2, '2'), (G3, '3'),
    (G4, '4'), (G5, '5'), (G6, '6'), (G7, '7'), (G8, '8'),
    (G9, '9'), (G10, '10'), (G11, '11'), (G12, '12')
)


class QuizFrameworks(models.Model):
    author = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        verbose_name=_('created by'),
        blank=True,
        null=True
    )
    grade = models.CharField(
        _('grade'),
        max_length=3,
        choices=GRADE_CHOICES
    )
    title = models.CharField(_('title'), max_length=200)
    description = models.TextField(_('description'))
    footer = models.CharField(_('footer'), max_length=200)
    sequence = models.DecimalField(
        _('sequence'),
        max_digits=1000,
        decimal_places=1
    )
    order = models.PositiveSmallIntegerField(
        default=0,
        blank=True,
        null=False
    )
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('quiz')
        verbose_name_plural = _('quiz frameworks')

    def __str__(self):
        return self.title


class QuizQuestions(models.Model):
    quiz = models.ForeignKey(
        QuizFrameworks,
        on_delete=models.CASCADE,
        related_name='questions'
    )
    question = models.ForeignKey(
        'home.Question',
        on_delete=models.CASCADE
    )
    order = models.PositiveSmallIntegerField(
        default=0,
        blank=True,
        null=False
    )
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['quiz', 'question']
        ordering = ['order', 'pk']
        verbose_name = _('quiz question')
        verbose_name_plural = _('quiz questions')

    def __str__(self):
        return f'{self.quiz.__str__()}'
