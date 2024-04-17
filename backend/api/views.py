# Importing necessary modules and classes
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# Class for listing and creating notes
class NoteListCreate(generics.ListCreateAPIView):
    # Specifying the serializer class for the notes
    serializer_class = NoteSerializer
    # Specifying the permission class for the view
    permission_classes = [IsAuthenticated]

    # Overriding the get_queryset method to filter notes by the current user
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    # Overriding the perform_create method to set the author of the note to the current user
    # We are also using serializer to check if the data is valid.
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

# Class for deleting notes
class NoteDelete(generics.DestroyAPIView):
    # Specifying the serializer class for the notes
    serializer_class = NoteSerializer
    # Specifying the permission class for the view
    permission_classes = [IsAuthenticated]

    # Overriding the get_queryset method to filter notes by the current user
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

# Class for creating new users
class CreateUserView(generics.CreateAPIView):
    # Specifying the queryset and serializer class for the users
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # Specifying the permission class for the view
    permission_classes = [AllowAny]