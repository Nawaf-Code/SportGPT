import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Report.css';

const FirstHalfReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFirstHalfReport = async () => {
      try {
        const response = await fetch('https://your-backend-api.com/reports/first-half');
        if (!response.ok) {
          throw new Error('Failed to fetch report');
        }
        const data = await response.json();
        setReport(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFirstHalfReport();
  }, []);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="report-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      
      <h2>First Half Match Report</h2>
      
      {report ? (
        <div className="report-content">
          <div className="report-header">
            <h3>{report.matchTitle}</h3>
            <p className="match-date">{report.date} • {report.venue}</p>
          </div>
          
          <div className="report-summary">
            <h4>Summary</h4>
            <p>{report.summary}</p>
          </div>
          
          <div className="key-moments">
            <h4>Key Moments</h4>
            <ul>
              {report.keyMoments.map((moment, index) => (
                <li key={index}>
                  <span className="minute">{moment.minute}'</span>
                  <span className="moment-description">{moment.description}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="statistics">
            <h4>Statistics</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">{report.stats.possession.home}%</span>
                <span className="stat-label">Home Possession</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{report.stats.possession.away}%</span>
                <span className="stat-label">Away Possession</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{report.stats.shots.home}</span>
                <span className="stat-label">Home Shots</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{report.stats.shots.away}</span>
                <span className="stat-label">Away Shots</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No report data available</p>
      )}
    </div>
  );
};

export default FirstHalfReport;