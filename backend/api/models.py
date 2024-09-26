from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Note(models.Model):
    # Fields
    gender = models.CharField(max_length=100)
    ethnicity = models.CharField(max_length=100)
    parental_level_of_education = models.CharField(max_length=100)
    lunch = models.CharField(max_length=100)
    test_preparation_course = models.CharField(max_length=100)
    reading_score = models.DecimalField(max_digits=5, decimal_places=2)
    writing_score = models.DecimalField(max_digits=5, decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE,related_name="notes")
    
    def __str__(self):
        return self.title
 
'''
    
'''