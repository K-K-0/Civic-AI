import joblib

category_model = joblib.load("app/ml/category_model.pkl")

priority_model = joblib.load("app/ml/priority_model.pkl")

sentiment_model = joblib.load("app/ml/sentiment_model.pkl")

POSITIVE_WORDS = [
    "planted",
    "clean",
    "improved",
    "successful",
    "good",
    "better",
    "green",
    "restored",
    "fixed",
    "maintained"
]

NEGATIVE_WORDS = [
    "broken",
    "garbage",
    "damage",
    "pollution",
    "problem",
    "dirty",
    "overflowing",
    "leakage",
    "dangerous",
    "traffic"
]

def detect_sentiment(text):

    text = text.lower()

    positive_score = sum(
        word in text for word in POSITIVE_WORDS
    )

    negative_score = sum(
        word in text for word in NEGATIVE_WORDS
    )

    if positive_score > negative_score:
        return "Positive"

    return "Negative"

def predict_complaint(text: str):

    text = text.lower()

    category = category_model.predict([text])[0]
    priority = priority_model.predict([text])[0]
    sentiment = detect_sentiment(text)

    return {
        "category": category,
        "priority": priority,
        "sentiment": sentiment
    }