# Importing necessary modules and classes
from django.db import models
from django.contrib.auth.models import User

# Defining the Note model
class Note(models.Model):
    # Specifying the fields of the model
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    # Overriding the __str__ method to return the title of the note
    def __str__(self):
        return self.title