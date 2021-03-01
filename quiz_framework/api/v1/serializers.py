from rest_framework import serializers

from home.models import Question
from home.api.v1.serializer.question import QuestionBase
from quiz_framework.models import QuizFrameworks, QuizQuestions


class QuestionRelatedField(serializers.PrimaryKeyRelatedField):

    def to_representation(self, value):
        try:
            question = Question.objects.get(pk=value.pk)
        except Question.DoesNotExist:
            return None
        return QuestionBase(question).data


class QuizQuestionsSerializer(serializers.ModelSerializer):

    class Meta:
        model = QuizQuestions
        fields = ['id', 'quiz', 'order', 'question']


class QuizQuestionNestedSerializer(serializers.ModelSerializer):
    question = QuestionRelatedField(
        queryset=Question.objects.all()
    )

    class Meta:
        model = QuizQuestions
        fields = ['id', 'question', 'order']
        extra_kwargs = {
            'order': {
                'required': True
            }
        }


class QuizFrameworksSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    questions = QuizQuestionNestedSerializer(many=True, required=False)

    class Meta:
        model = QuizFrameworks
        fields = ['id', 'author', 'grade', 'order', 'title', 'description',
                  'footer', 'sequence', 'questions']

    def create(self, validated_data):
        quiz_questions = validated_data.pop('questions')
        quiz = super().create(validated_data)

        question_objs = []
        for question in quiz_questions:
            question_objs.append(
                QuizQuestions(
                    quiz=quiz,
                    order=question.get('order'),
                    question=question.get('question')
                )
            )
        QuizQuestions.objects.bulk_create(question_objs)
        return quiz

    def update(self, instance, validated_data):
        quiz_questions = validated_data.pop('questions')
        quiz_questions_pks = [_.id for _ in quiz_questions]

        for question in QuizQuestions.objects.filter(pk__in=quiz_questions_pks):
            pass

        return super().update(instance, validated_data)

