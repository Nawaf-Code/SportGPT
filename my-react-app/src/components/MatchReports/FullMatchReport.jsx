import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Report.css';

const FullMatchReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFullMatchReport = async () => {
      try {
        const response = await fetch('https://your-backend-api.com/reports/full-match');
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

    fetchFullMatchReport();
  }, []);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="report-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      
      <h2>Full Match Report</h2>
      
      {report ? (
        <div className="report-content">
          <div className="match-result">
            <div className="team home-team">
              <img src={report.homeTeam.logo} alt={report.homeTeam.name} />
              <span>{report.homeTeam.name}</span>
            </div>
            <div className="score">
              <span>{report.score.home} - {report.score.away}</span>
            </div>
            <div className="team away-team">
              <img src={report.awayTeam.logo} alt={report.awayTeam.name} />
              <span>{report.awayTeam.name}</span>
            </div>
          </div>
          
          <div className="match-details">
            <p><strong>Date:</strong> {report.date}</p>
            <p><strong>Venue:</strong> {report.venue}</p>
            <p><strong>Attendance:</strong> {report.attendance}</p>
            <p><strong>Referee:</strong> {report.referee}</p>
          </div>
          
          <div className="match-timeline">
            <h4>Match Timeline</h4>
            <div className="timeline">
              {report.timeline.map((event, index) => (
                <div key={index} className={`timeline-event ${event.type}`}>
                  <span className="minute">{event.minute}'</span>
                  <span className="event-description">
                    {event.team === 'home' ? report.homeTeam.name : report.awayTeam.name}: {event.description}
                  </span>
                  {event.type === 'goal' && <span className="event-icon">⚽</span>}
                  {event.type === 'card' && <span className="event-icon">🟨</span>}
                </div>
              ))}
            </div>
          </div>
          
          <div className="player-ratings">
            <h4>Player Ratings</h4>
            <div className="ratings-grid">
              <div className="team-ratings">
                <h5>{report.homeTeam.name}</h5>
                {report.playerRatings.home.map((player, index) => (
                  <div key={index} className="player-rating">
                    <span className="player-name">{player.name}</span>
                    <span className="rating">{player.rating}/10</span>
                  </div>
                ))}
              </div>
              <div className="team-ratings">
                <h5>{report.awayTeam.name}</h5>
                {report.playerRatings.away.map((player, index) => (
                  <div key={index} className="player-rating">
                    <span className="player-name">{player.name}</span>
                    <span className="rating">{player.rating}/10</span>
                  </div>
                ))}
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

export default FullMatchReport;