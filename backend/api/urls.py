# Importing the necessary modules and views
from django.urls import path
from . import views

# Defining the URL patterns for the application
urlpatterns = [
    # URL for listing and creating notes
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    
    # URL for deleting a note
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
]