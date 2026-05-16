import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
import joblib

df = pd.read_csv(r"/home/k-k/civicAI/backend/app/ml/complaints.csv")

df['text'] = df['text'].str.lower()

print(df['category'].value_counts())
print(df['priority'].value_counts())
print(df['sentiment'].value_counts())


category_model = Pipeline([
    ('tfidf', TfidfVectorizer(ngram_range=(1,2), stop_words='english')),
    ('model', LogisticRegression(max_iter=1000))
])

category_model.fit(df['text'], df['category'])

priority_model = Pipeline([
    ('tfidf', TfidfVectorizer(ngram_range=(1,2), stop_words='english')),
    ('model', LogisticRegression(max_iter=1000))
])

priority_model.fit(df['text'], df['priority'])

sentiment_model = Pipeline([
    ('tfidf', TfidfVectorizer(ngram_range=(1,2), stop_words='english')),
    ('model', LogisticRegression(max_iter=1000))
])

sentiment_model.fit(df['text'], df['sentiment'])

joblib.dump(category_model, "backend/app/ml/category_model.pkl")

joblib.dump(priority_model, "backend/app/ml/priority_model.pkl")

joblib.dump(sentiment_model, "backend/app/ml/sentiment_model.pkl")

print('Model trained successfully')

print(
    category_model.predict(
        ["road broken badly"]
    )
)

print(
    category_model.predict(
        ["garbage everywhere"]
    )
)

print(
    category_model.predict(
        ["trees planted successfully"]
    )
)