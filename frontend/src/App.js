// // frontend/src/App.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [file, setFile] = useState(null);
//   const [sentiment, setSentiment] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:5000/upload', formData);
//       setSentiment(response.data.sentiment);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Restaurant Review Analyzer</h1>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload and Analyze</button>
//       {sentiment && <h2>Sentiment: {sentiment}</h2>}
//     </div>
//   );
// }

// export default App;


// // success
// import React, { useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [file, setFile] = useState(null);
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState("");

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError("Please upload a file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setResults(response.data); // Store response data
//       setError(""); // Clear any previous errors
//     } catch (err) {
//       setError("Error uploading file: " + err.message);
//       setResults([]); // Clear previous results
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Restaurant Review Analyzer</h1>
//       <input type="file" accept=".pdf" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//       {error && <div style={{ color: 'red' }}>{error}</div>}
//       {results.length > 0 && (
//         <div>
//           <h2>Results:</h2>
//           <ul>
//             {results.map((item, index) => (
//               <li key={index}>
//                 <strong>Review:</strong> {item.review} <br />
//                 <strong>Sentiment:</strong> {item.sentiment}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;



import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

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
    <div style={{ padding: '20px' }}>
      <h1>Restaurant Review Analyzer</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {results.length > 0 && (
        <div>
          <h2>Results:</h2>
          <ul>
            {results.map((item, index) => (
              <li key={index}>
                <strong>Review:</strong> {item.review} <br />
                <strong>Sentiment:</strong> {item.sentiment}
              </li>
            ))}
          </ul>

          {/* Display sentiment analysis using Plotly */}
          <h2>Sentiment Analysis:</h2>
          <Plot
            data={[
              {
                x: ['Positive', 'Negative'],
                y: [sentimentCounts.Positive, sentimentCounts.Negative],
                type: 'bar',
                marker: { color: ['green', 'red'] },
              },
            ]}
            layout={{
              title: 'Sentiment Distribution',
              xaxis: { title: 'Sentiment' },
              yaxis: { title: 'Number of Reviews' },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default App;
