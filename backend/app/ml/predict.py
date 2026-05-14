import joblib

category_model = joblib.load("app/ml/category_model.pkl")

priority_model = joblib.load("app/ml/priority_model.pkl")

sentiment_model = joblib.load("app/ml/sentiment_model.pkl")

def predict_complaint(text: str):

    category = category_model.predict([text])[0]
    priority = priority_model.predict([text])[0]
    sentiment = sentiment_model.predict([text])[0]

    return {
        "category": category,
        "priority": priority,
        "sentiment": sentiment
    }