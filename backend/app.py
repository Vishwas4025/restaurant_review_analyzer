# from flask import Flask, request, jsonify
# import os
# import sqlite3
# import pickle
# import fitz  # PyMuPDF for PDF extraction
# from nltk.stem import WordNetLemmatizer
# from nltk.corpus import stopwords
# import re

# # Load model and vectorizer
# model = pickle.load(open('classifier.pkl', 'rb'))
# tfidf = pickle.load(open('tfidf_vectorizer.pkl', 'rb'))

# app = Flask(__name__)
# UPLOAD_FOLDER = 'uploads/'
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# def preprocess_text(text):
#     lemmatizer = WordNetLemmatizer()
#     text = re.sub('[^a-zA-Z]', ' ', text).lower().split()
#     return ' '.join([lemmatizer.lemmatize(word) for word in text if word not in stopwords.words('english')])

# @app.route('/upload', methods=['POST'])
# def upload_file():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file uploaded'}), 400

#     file = request.files['file']

#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400
    
#     file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
#     file.save(file_path)

#     # Extract text from PDF
#     doc = fitz.open(file_path)
#     text = ' '.join([page.get_text() for page in doc])

#     # Preprocess and predict sentiment
#     processed_text = preprocess_text(text)
#     vector = tfidf.transform([processed_text]).toarray()
#     sentiment = model.predict(vector)[0]
#     sentiment_label = 'Positive' if sentiment == 1 else 'Negative'

#     return jsonify({'sentiment': sentiment_label})

# @app.route('/reviews', methods=['GET'])
# def get_reviews():
#     conn = sqlite3.connect('database.db')
#     cursor = conn.execute("SELECT * FROM reviews")
#     reviews = [{'review': row[1], 'sentiment': row[2]} for row in cursor]
#     conn.close()
#     return jsonify(reviews)

# if __name__ == '__main__':
#     app.run(debug=True)



# import os
# import fitz  # PyMuPDF for PDF extraction
# import pickle
# from flask import Flask, request, jsonify
# from werkzeug.utils import secure_filename
# from nltk.stem import WordNetLemmatizer
# from nltk.corpus import stopwords
# import re
# import numpy as np

# # Initialize Flask app
# app = Flask(__name__)
# app.config['UPLOAD_FOLDER'] = 'uploads'

# # Load trained model
# model = pickle.load(open('classifier.pkl', 'rb'))
# lemmatizer = WordNetLemmatizer()
# stop_words = set(stopwords.words('english'))

# def preprocess_text(text):
#     """Preprocesses the input text by cleaning, lemmatizing, and removing stopwords."""
#     text = re.sub(r'[^a-zA-Z\s]', '', text)  # Keep only letters and spaces
#     words = text.lower().split()
#     words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]
#     return ' '.join(words)

# def extract_text_from_pdf(pdf_path):
#     """Extracts text from each page of the uploaded PDF."""
#     text = ""
#     with fitz.open(pdf_path) as pdf:
#         for page_num in range(pdf.page_count):
#             page = pdf.load_page(page_num)
#             text += page.get_text()
#     return text

# @app.route('/upload', methods=['POST'])
# def upload_file():
#     """Handles file upload, extracts text, preprocesses it, and predicts sentiment."""
#     if 'file' not in request.files:
#         return "No file part in the request", 400

#     file = request.files['file']
#     if file.filename == '':
#         return "No selected file", 400

#     if file:
#         filename = secure_filename(file.filename)
#         file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#         file.save(file_path)

#         # Extract text from PDF
#         extracted_text = extract_text_from_pdf(file_path)

#         # Split text into individual reviews (assuming each line is a review)
#         reviews = extracted_text.split('\n')
#         results = []

#         # Analyze sentiment for each review
#         for review in reviews:
#             if review.strip():  # Skip empty lines
#                 preprocessed_review = preprocess_text(review)

#                 # Reshape the review to 2D array
#                 prediction = model.predict(np.array([preprocessed_review]).reshape(1, -1))[0]

#                 sentiment = "Positive" if prediction == 1 else "Negative"
#                 results.append({"review": review, "sentiment": sentiment})

#         return jsonify(results), 200

# if __name__ == '__main__':
#     app.run(debug=True)


import os
import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from werkzeug.utils import secure_filename

import fitz  # PyMuPDF for PDF extraction
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
import re

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load the trained model and vectorizer
with open('classifier.pkl', 'rb') as f:
    model = pickle.load(f)

with open('vectorizer.pkl', 'rb') as f:
    tfidf_vectorizer = pickle.load(f)

# Helper function to preprocess incoming reviews
def preprocess_text(text):
    import re
    from nltk.stem import WordNetLemmatizer
    from nltk.corpus import stopwords

    lemmatizer = WordNetLemmatizer()
    stop_words = set(stopwords.words('english'))

    # Clean text: remove non-alphabet characters and lowercase
    text = re.sub('[^a-zA-Z]', ' ', text).lower().split()
    # Lemmatize and remove stopwords
    text = [lemmatizer.lemmatize(word) for word in text if word not in stop_words]
    return ' '.join(text)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "No file part in the request", 400

    file = request.files['file']
    if file.filename == '':
        return "No selected file", 400

    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Extract and preprocess text (you may adjust based on your file format)
        extracted_text = extract_text_from_pdf(file_path)  # Assumes PDF extraction logic
        reviews = extracted_text.split('\n')  # Assuming reviews are line-separated
        results = []

        for review in reviews:
            if review.strip():
                preprocessed_review = preprocess_text(review)

                # Transform review text into numeric features
                numeric_features = tfidf_vectorizer.transform([preprocessed_review])

                # Predict sentiment
                prediction = model.predict(numeric_features)[0]
                sentiment = "Positive" if prediction == 1 else "Negative"
                results.append({"review": review, "sentiment": sentiment})

        return jsonify(results), 200

# def extract_text_from_pdf(file_path):
#     # Placeholder function for PDF extraction logic
#     return "Sample review text from the PDF"
def extract_text_from_pdf(file_path):
    """Extracts text from each page of the uploaded PDF."""
    text = ""
    with fitz.open(file_path) as file:
        for page_num in range(file.page_count):
            page = file.load_page(page_num)
            text += page.get_text()
    return text


if __name__ == '__main__':
    # Ensure the uploads folder exists
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    app.run(debug=True)
