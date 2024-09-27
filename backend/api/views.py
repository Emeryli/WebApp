from django.shortcuts import render

# import user, generics, UserSerializer, isauthenticated, allowAny
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

from django.http import JsonResponse
from django.views import View
from .prediction import CustomData, PredictionPipeline
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# Create your views here.


@method_decorator(csrf_exempt, name="dispatch")
class ProcessDataView(View):
    def post(self, request):
        try:
            # decode
            body_unicode = request.body.decode("utf-8")
            # load
            body = json.loads(body_unicode)
            gender = body["gender"]
            ethnicity = body["ethnicity"]
            test_preparation_course = body["test_preparation_course"]
            reading_score = body["reading_score"]
            writing_score = body["writing_score"]
            parental_level_of_education = body["parental_level_of_education"]
            lunch = body["lunch"]
            # custom_data
            custom_data = CustomData(
                gender=gender,
                race_ethnicity=ethnicity,
                test_preparation_course=test_preparation_course,
                reading_score=reading_score,
                writing_score=writing_score,
                parental_level_education=parental_level_of_education,
                lunch=lunch,
            )
            # data_frame
            data_frame = custom_data.get_data_as_dataframe()
            # predict pipeline instance
            predict_pipeline = PredictionPipeline()
            result = predict_pipeline.predict(data_frame)
            return JsonResponse({"result": result.tolist()})
        except Exception as e:
            print(f"Error: {e}")


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
