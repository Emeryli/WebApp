from django.shortcuts import render
# import user, generics, UserSerializer, isauthenticated, allowAny
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
# Create your views here.

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class=NoteSerializer
    permission_classes=[IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self,serializer):
        serializer.save(author=self.request.user)
            

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user=self.request.user
        return Note.objects.filter(author=user)
    
    
# Create a form
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class= UserSerializer
    permission_classes= [AllowAny]