
// import React, { useState } from 'react';
// import axios from 'axios';
// import Plot from 'react-plotly.js';
// import './App.css'; // Import the CSS file

// const App = () => {
//   const [file, setFile] = useState(null);
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState("");
//   const [sentimentCounts, setSentimentCounts] = useState({ Positive: 0, Negative: 0 });

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
      
//       // Analyze sentiments
//       const counts = response.data.reduce((acc, curr) => {
//         acc[curr.sentiment] = (acc[curr.sentiment] || 0) + 1;
//         return acc;
//       }, {});
//       setSentimentCounts(counts);
//     } catch (err) {
//       setError("Error uploading file: " + err.message);
//       setResults([]); // Clear previous results
//     }
//   };

//   return (
//     <div className="container">
//       <header className="header">
//         <h1>Restaurant Review Analyzer</h1>
//         <div className="upload-section">
//           <input type="file" accept=".pdf" onChange={handleFileChange} />
//           <button onClick={handleUpload}>Upload</button>
//         </div>
//         {error && <div className="error">{error}</div>}
//       </header>
//       <main className="main">
//         <section className="results">
//           {results.length > 0 ? (
//             <>
//               <h2>Results:</h2>
//               <ul>
//                 {results.map((item, index) => (
//                   <li key={index}>
//                     <strong>Review:</strong> {item.review} <br />
//                     <strong>Sentiment:</strong> {item.sentiment}
//                   </li>
//                 ))}
//               </ul>
//             </>
//           ) : (
//             <div className="placeholder">
//               <p>Please upload a file to analyze reviews.</p>
//             </div>
//           )}
//         </section>
//         <section className="sentiment-analysis">
//           {results.length > 0 ? (
//             <>
//               <h2>Sentiment Analysis:</h2>
//               <Plot
//                 data={[
//                   {
//                     x: ['Positive', 'Negative'],
//                     y: [sentimentCounts.Positive, sentimentCounts.Negative],
//                     type: 'bar',
//                     marker: { color: ['green', 'red'] },
//                   },
//                 ]}
//                 layout={{
//                   title: 'Sentiment Distribution',
//                   xaxis: { title: 'Sentiment' },
//                   yaxis: { title: 'Number of Reviews' },
//                 }}
//               />
//             </>
//           ) : (
//             <div className="placeholder">
//               <p>Sentiment analysis results will appear here after uploading a file.</p>
//             </div>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// };

// export default App;








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
        <h1>Restaurant Review Analyzer</h1>
        <div className="upload-section">
          <div className="custom-file-upload">
            <input
              type="file"
              id="fileInput"
              accept=".pdf"
              onChange={handleFileChange}
            />
            <label htmlFor="fileInput">Choose File</label>
            {file && <span className="file-name">{file.name}</span>}
          </div>
          <button className="upload-button" onClick={handleUpload}>Upload</button>
        </div>
        {error && <div className="error">{error}</div>}
      </header>

      <main className="main">
        <section className="results">
          {results.length > 0 ? (
            <>
              <h2>Results:</h2>
              <ol>
                {results.map((item, index) => (
                  <li key={index}>
                    <strong>Review:</strong> {item.review} <br />
                    <strong>Sentiment:</strong> {item.sentiment}
                  </li>
                ))}
              </ol>
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
              <div>
                <p>Total number of reviews : {results.length}</p>
                <p>Positive reviews : {sentimentCounts.Positive}</p>
                <p>Negative reviews : {sentimentCounts.Negative}</p>
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











// import React, { useState } from 'react';
// import axios from 'axios';
// import Plot from 'react-plotly.js';
// import './App.css';

// const App = () => {
//   const [file, setFile] = useState(null);
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState("");
//   const [sentimentCounts, setSentimentCounts] = useState({ Positive: 0, Negative: 0 });
//   const [theme, setTheme] = useState('light'); // State for theme

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
      
//       // Analyze sentiments
//       const counts = response.data.reduce((acc, curr) => {
//         acc[curr.sentiment] = (acc[curr.sentiment] || 0) + 1;
//         return acc;
//       }, {});
//       setSentimentCounts(counts);
//     } catch (err) {
//       setError("Error uploading file: " + err.message);
//       setResults([]); // Clear previous results
//     }
//   };

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
//   };

//   return (
//     <div className={`container ${theme}`}>
//       <header className="header">
//         <h1>Restaurant Review Analyzer</h1>
//         <div className="upload-section">
//           <input type="file" accept=".pdf" onChange={handleFileChange} />
//           <button onClick={handleUpload}>Upload</button>
//         </div>
//         {error && <div className="error">{error}</div>}
//         <button className="theme-toggle" onClick={toggleTheme}>
//           Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
//         </button>
//       </header>
//       <main className="main">
//         <section className="results">
//           {results.length > 0 ? (
//             <>
//               <h2>Results:</h2>
//               <ul>
//                 {results.map((item, index) => (
//                   <li key={index}>
//                     <strong>Review:</strong> {item.review} <br />
//                     <strong>Sentiment:</strong> {item.sentiment}
//                   </li>
//                 ))}
//               </ul>
//             </>
//           ) : (
//             <div className="placeholder">
//               <p>Please upload a file to analyze reviews.</p>
//             </div>
//           )}
//         </section>
//         <section className="sentiment-analysis">
//           {results.length > 0 ? (
//             <>
//               <h2>Sentiment Analysis:</h2>
//               <Plot
//                 data={[
//                   {
//                     x: ['Positive', 'Negative'],
//                     y: [sentimentCounts.Positive, sentimentCounts.Negative],
//                     type: 'bar',
//                     marker: { color: ['green', 'red'] },
//                   },
//                 ]}
//                 layout={{
//                   title: 'Sentiment Distribution',
//                   xaxis: { title: 'Sentiment' },
//                   yaxis: { title: 'Number of Reviews' },
//                 }}
//               />
//             </>
//           ) : (
//             <div className="placeholder">
//               <p>Sentiment analysis results will appear here after uploading a file.</p>
//             </div>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// };

// export default App;
