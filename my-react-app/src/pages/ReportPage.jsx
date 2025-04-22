import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import '../components/MatchReports/Report.css';

const ReportPage = () => {
    const navigate = useNavigate();
  const { type } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const endpoint = type === 'first-half' 
          ? 'first-half-report' 
          : 'full-match-report';
        
        const response = await fetch(`http://127.0.0.1:8000/report/${endpoint}`);
        const data = await response.json();
        setReport(data.response);
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [type]);

  if (loading) return (
    <div className="loading-container">
      <div className="loading">Loading report...</div>
    </div>
  );

  return (


    <div className= "report-page-container">

    <button className="back-btn-report" onClick={() => navigate('/')}>
        &larr; Back to Booking
      </button>
      
    <div className= "report-content-centered">
      <h2 className= "report-content">{type === 'first-half' ? 'First Half' : 'Full Match'} Report</h2>

      
      {report ? (
        <div className="report-content">

          <div className="stats">
            {report
            }
          </div>
          
        </div>
      ) : (
        <p>No report available</p>
      )}
    </div>
    
    </div>
  );
};

export default ReportPage;