from django.shortcuts import render

# import user, generics, UserSerializer, isauthenticated, allowAny
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer, InputDataSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
from django.http import JsonResponse
#from django.views import View
from rest_framework.views import APIView
from .prediction import CustomData, PredictionPipeline
from rest_framework.response import Response


# Create your views here.


class ProcessDataView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = InputDataSerializer(data=request.data)
        if serializer.is_valid():
            try:
                custom_data = CustomData(
                    gender=serializer.validated_data['gender'],
                    race_ethnicity=serializer.validated_data['ethnicity'],
                    test_preparation_course=serializer.validated_data['test_preparation_course'],
                    reading_score=serializer.validated_data['reading_score'],
                    writing_score=serializer.validated_data['writing_score'],
                    parental_level_education=serializer.validated_data['parental_level_of_education'],
                    lunch=serializer.validated_data['lunch'],
                )
                
                data_frame = custom_data.get_data_as_dataframe()
                predict_pipeline = PredictionPipeline()
                result = predict_pipeline.predict(data_frame)

                return Response({'result': result.tolist()})
            except Exception as e:
                return Response({"error": str(e)})
        return Response(serializer.errors)
            # custom_data
            


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)


# Create a form
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
