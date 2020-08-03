from rest_framework import serializers
from home.models import Settings


class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Settings
        fields = ['id', 'path', 'value', 'is_deletable']


class SettingsUpdate(serializers.ModelSerializer):
    class Meta:
        model = Settings
        fields = ['id', 'path', 'value', 'is_deletable']
        read_only_fields = ('path', )
