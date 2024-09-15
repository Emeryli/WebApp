from django.urls import path
from . import views

urlpattern=[
    path("note/", views.NoteListCreate.as_view(), name="note-list"),
    path("note/delete/<int:pk>", views.NoteDelete.as_view(), name="delete-note")
]