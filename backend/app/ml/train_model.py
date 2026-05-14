import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
import joblib

df = pd.read_csv(r"/home/k-k/civicAI/backend/app/ml/complaints.csv")

category_model = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('model', LogisticRegression())
])

category_model.fit(df['text'], df['category'])

priority_model = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('model', LogisticRegression())
])

priority_model.fit(df['text'], df['priority'])

sentiment_model = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('model', LogisticRegression())
])

sentiment_model.fit(df['text'], df['sentiment'])

joblib.dump(category_model, "backend/app/ml/category_model.pkl")

joblib.dump(priority_model, "backend/app/ml/priority_model.pkl")

joblib.dump(sentiment_model, "backend/app/ml/sentiment_model.pkl")

print('Model trained successfully')