import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './App.css'; // Import the CSS file

const App = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [sentimentCounts, setSentimentCounts] = useState({ Positive: 0, Negative: 0 });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResults(response.data); // Store response data
      setError(""); // Clear any previous errors
      
      // Analyze sentiments
      const counts = response.data.reduce((acc, curr) => {
        acc[curr.sentiment] = (acc[curr.sentiment] || 0) + 1;
        return acc;
      }, {});
      setSentimentCounts(counts);
    } catch (err) {
      setError("Error uploading file: " + err.message);
      setResults([]); // Clear previous results
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>RESTAURANT REVIEWS ANALYZER</h1>
        <div className="upload-section">
          <div className="custom-file-upload">
            <input
              type="file"
              id="fileInput"
              accept=".pdf"
              onChange={handleFileChange}
            />
            <label htmlFor="fileInput">CHOOSE FILE</label>
            {file && <span className="file-name">{file.name}</span>}
          </div>
          <button className="upload-button" onClick={handleUpload}>UPLOAD</button>
        </div>
        {error && <div className="error">{error}</div>}
      </header>

      <main className="main">
        <section className="results">
          {results.length > 0 ? (
            <>
              <h2 className='results-side-header'>Results:</h2>
              <ul>
                {results.map((item, index) => (
                  <li key={index}>
                    <strong className='results-side-header'>Review:</strong> {item.review} <br />
                    <strong className='results-side-header'>Sentiment:</strong> {item.sentiment}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="placeholder">
              <p>Please upload a file to analyze reviews.</p>
            </div>
          )}
        </section>
        <section className="sentiment-analysis">
          {results.length > 0 ? (
            <>
              <h2 className='results-side-header'>Sentiment Analysis:</h2>
              {/* <Plot
                data={[
                  {
                    x: ['Positive', 'Negative'],
                    y: [sentimentCounts.Positive, sentimentCounts.Negative],
                    type: 'bar',
                    marker: { color: ['grey', 'black'] },
                  },
                ]}
                layout={{
                  title: 'Sentiment Distribution',
                  xaxis: { title: 'Sentiment' },
                  yaxis: { title: 'Number of Reviews' },
                }}
              /> */}
              <Plot
                data={[
                  {
                    x: ['Positive', 'Negative'],
                    y: [sentimentCounts.Positive, sentimentCounts.Negative],
                    type: 'bar',
                    marker: {
                      color: ['#34495e', '#1a242f'], // Custom colors for bars (Positive: Greenish, Negative: Redish)
                    },
                  },
                ]}
                layout={{
                  title: {
                    text: 'Sentiment Distribution',
                    font: {
                      size: 24,
                      color: '#2c3e50', // Title font color
                    },
                  },
                  xaxis: {
                    title: {
                      text: 'Sentiment',
                      font: {
                        size: 16,
                        color: '#34495e', // X-axis title color
                      },
                    },
                    tickfont: {
                      size: 14,
                      color: '#2c3e50', // X-axis tick color
                    },
                  },
                  yaxis: {
                    title: {
                      text: 'Number of Reviews',
                      font: {
                        size: 16,
                        color: '#34495e', // Y-axis title color
                      },
                    },
                    tickfont: {
                      size: 14,
                      color: '#2c3e50', // Y-axis tick color
                    },
                  },
                  paper_bgcolor: '#ecf0f1', // Background color outside the plot area
                  plot_bgcolor: '#ecf0f1', // Background color of the plot area
                }}
              />

              <div className='sentiment-p'>
                <p>Total number of reviews : {results.length}</p>
                <p>Positive reviews : {sentimentCounts.Positive}</p>
                <p>Negative reviews : {sentimentCounts.Negative}</p>
                <p>Percentage : {(sentimentCounts.Positive/results.length*100).toFixed(2)}</p>
              </div>
            </>
          ) : (
            <div className="placeholder">
              <p>Sentiment analysis results will appear here after uploading a file.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;


