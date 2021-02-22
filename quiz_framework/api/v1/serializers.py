from rest_framework import serializers

from quiz_framework.models import QuizFrameworks, QuizQuestions


class QuizQuestionsSerializer(serializers.ModelSerializer):

    class Meta:
        model = QuizQuestions
        fields = ['id', 'quiz', 'order', 'question']


class QuizQuestionNestedSerializer(serializers.ModelSerializer):

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

