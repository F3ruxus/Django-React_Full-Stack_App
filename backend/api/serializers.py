# Importing necessary modules and classes
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

# Serializer class for User model
class UserSerializer(serializers.ModelSerializer):
    # Specifying the model and fields to be serialized
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    # Overriding the create method to create a new user
    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

# Serializer class for Note model
class NoteSerializer(serializers.ModelSerializer):
    # Specifying the model and fields to be serialized
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}