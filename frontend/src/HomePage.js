import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/analyze'); // Redirect to the App.js component
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>RESTAURANT REVIEWS ANALYZER</h1>
      </header>
      <main className="home-main">
        
        {/* Call to Action Section */}
        <div className="cta-section">
          <h2>Ready to transform your restaurant’s feedback into actionable insights?</h2>
          <p>Click below to get started and elevate your restaurant’s success.</p>
          <button className="start-button" onClick={handleStart}>
            Start Analyzing Reviews Now
          </button>
        </div>
        <div className="features-section">
          <h2>Key Features</h2>
          <div className="steps-container">
            <div className="step-card">
              <h3>Sentiment Analysis</h3>
              <p>Automatically categorizes reviews into positive and negative sentiments.</p>
            </div>
            <div className="step-card">
              <h3>Data Visualization</h3>
              <p>Get insights through intuitive bar graphs and charts.</p>
            </div>
            <div className="step-card">
              <h3>Batch Processing</h3>
              <p>Analyze hundreds of reviews in a single PDF file.</p>
            </div>
            <div className="step-card">
              <h3>Customizable Reports</h3>
              <p>Export detailed analysis reports for team discussions.</p>
            </div>
            <div className="step-card">
              <h3>Easy-to-Use Interface</h3>
              <p>Simplify the review analysis process with an intuitive and user-friendly design.</p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        {/* <div className="benefits-section">
          <h2>Why Use Our Application?</h2>
          <div className="steps-container">
            <div className="step-card">
              <h3>Understand Customer Preferences</h3>
              <p>Identify areas of improvement based on customer feedback.</p>
            </div>
            <div className="step-card">
              <h3>Save Time</h3>
              <p>Automate the tedious process of manually analyzing reviews.</p>
            </div>
            <div className="step-card">
              <h3>Make Informed Decisions</h3>
              <p>Utilize data-driven insights to refine your restaurant’s services.</p>
            </div>
            <div className="step-card">
              <h3>Improve Customer Satisfaction</h3>
              <p>Act on feedback to offer a better dining experience.</p>
            </div>
          </div>
        </div> */}

        
        {/* <div className="how-to-use">
          <h2>How to Use</h2>
          <div className="steps-container">
            <div className="step-card">
              <h3>Step 1: Prepare Reviews</h3>
              <p>
                Prepare a PDF file containing restaurant reviews that you want to analyze.
              </p>
            </div>
            <div className="step-card">
              <h3>Step 2: Upload Your File</h3>
              <p>
                Click on the "Start Analyzing" button below to navigate to the
                upload page and select your file.
              </p>
            </div>
            <div className="step-card">
              <h3>Step 3: Analyze with AI</h3>
              <p>
                Our AI model will process the reviews, classify sentiments, and
                generate insights.
              </p>
            </div>
            <div className="step-card">
              <h3>Step 4: View Insights</h3>
              <p>
                View categorized reviews, sentiment distribution, and visual
                insights in an easy-to-understand format.
              </p>
            </div>
          </div>
        </div> */}
        {/* <button className="start-button" onClick={handleStart}>
          START ANALYZING
        </button> */}
      </main>
    </div>
  );
};

export default HomePage;
