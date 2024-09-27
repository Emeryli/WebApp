import os
import dill
from django.conf import settings
import pandas as pd


# create CustomData class:
class CustomData:
    # init
    def __init__(
        self,
        gender,
        race_ethnicity,
        parental_level_education,
        lunch,
        test_preparation_course,
        reading_score,
        writing_score,
    ):
        self.gender = gender
        self.race_ethnicity = race_ethnicity
        self.parental_level_education = parental_level_education
        self.lunch = lunch
        self.test_preparation_course = test_preparation_course
        self.reading_score = reading_score
        self.writing_score = writing_score

    # get data as data frame
    def get_data_as_dataframe(self):
        custom_data_input_dict = {
            "gender": [self.gender],
            "race/ethnicity": [self.race_ethnicity],
            "parental level of education": [self.parental_level_education],
            "lunch": [self.lunch],
            "test preparation course": [self.test_preparation_course],
            "reading score": [self.reading_score],
            "writing score": [self.writing_score],
        }
        return pd.DataFrame(custom_data_input_dict)


def load_object(file_name):
    file_path = os.path.join(settings.MEDIA_ROOT, file_name)
    with open(file_path, "rb") as obj:
        return dill.load(obj)


# create PredictPipeline class:
class PredictionPipeline:
    # init
    def __init__(self):
        pass

    # predict
    def predict(self, features):
        # model path
        model_name = "model.pkl"
        # preprocessor path
        preprocessor_name = "preprocessor.pkl"
        # load model object
        model = load_object(model_name)
        # load preprocessor object
        preprocessor = load_object(preprocessor_name)
        # transform
        data_scaled = preprocessor.transform(features)
        # predict
        prediction = model.predict(data_scaled)
        # return
        return prediction
