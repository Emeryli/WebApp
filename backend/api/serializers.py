# import user and serializer
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note
from django import forms


# create user serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = [
            "id",
            "gender",
            "ethnicity",
            "parental_level_of_education",
            "lunch",
            "test_preparation_course",
            "reading_score",
            "writing_score",
            "created_at",
            "author",
            "result",
        ]
        extra_kwargs = {"author": {"read_only": True}}


class InputDataSerializer(serializers.Serializer):
    gender = serializers.CharField()
    ethnicity = serializers.CharField()
    test_preparation_course = serializers.CharField()
    reading_score = serializers.IntegerField()
    writing_score = serializers.IntegerField()
    parental_level_of_education = serializers.CharField()
    lunch = serializers.CharField()
