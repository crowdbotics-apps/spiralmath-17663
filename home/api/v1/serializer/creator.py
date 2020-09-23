from rest_framework import serializers
from home.models import Creator


class CreatorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Creator
        fields = ['id', 'first_name', 'last_name']
