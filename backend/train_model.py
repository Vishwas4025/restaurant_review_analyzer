# import pandas as pd
# import re
# import pickle
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.model_selection import train_test_split
# from sklearn.linear_model import LogisticRegression
# from sklearn.metrics import accuracy_score, classification_report
# import nltk

# # Download NLTK data
# nltk.download('stopwords')
# from nltk.corpus import stopwords
# from nltk.stem import WordNetLemmatizer

# # Load dataset
# dataset = pd.read_csv('reviews.tsv', delimiter='\t')

# # Preprocess reviews
# lemmatizer = WordNetLemmatizer()
# corpus = []

# for review in dataset['Review']:
#     review = re.sub('[^a-zA-Z]', ' ', review).lower().split()
#     review = [lemmatizer.lemmatize(word) for word in review if word not in stopwords.words('english')]
#     corpus.append(' '.join(review))

# # Vectorize text using TF-IDF
# tfidf = TfidfVectorizer(max_features=1500)
# X = tfidf.fit_transform(corpus).toarray()
# y = dataset.iloc[:, -1].values  # Assuming sentiment is the last column

# # Split dataset
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Train Logistic Regression model
# model = LogisticRegression(max_iter=1000)
# model.fit(X_train, y_train)

# # Evaluate model
# y_pred = model.predict(X_test)
# print(f"Accuracy: {accuracy_score(y_test, y_pred):.2f}")
# print(classification_report(y_test, y_pred))

# # Save the model and TF-IDF vectorizer
# with open('classifier.pkl', 'wb') as f:
#     pickle.dump(model, f)

# with open('tfidf_vectorizer.pkl', 'wb') as f:
#     pickle.dump(tfidf, f)



import pandas as pd
import re
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import nltk

# Download NLTK resources (only run once)
nltk.download('stopwords')
nltk.download('wordnet')

from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# Load dataset
dataset = pd.read_csv('reviews.tsv', delimiter='\t')

# Preprocess reviews
lemmatizer = WordNetLemmatizer()
corpus = []

for review in dataset['Review']:
    review = re.sub('[^a-zA-Z]', ' ', review).lower().split()
    review = [lemmatizer.lemmatize(word) for word in review if word not in stopwords.words('english')]
    corpus.append(' '.join(review))

# Vectorize text using TF-IDF
vectorizer = TfidfVectorizer(max_features=1500)
X = vectorizer.fit_transform(corpus).toarray()
y = dataset.iloc[:, -1].values  # Assuming the last column is the label

# Split dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the Logistic Regression model
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred):.2f}")
print(classification_report(y_test, y_pred))

# Save the trained model and vectorizer using pickle
with open('classifier.pkl', 'wb') as f:
    pickle.dump(model, f)

with open('vectorizer.pkl', 'wb') as f:
    pickle.dump(vectorizer, f)

print("Model and vectorizer saved successfully.")
