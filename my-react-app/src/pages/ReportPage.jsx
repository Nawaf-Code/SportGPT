import React, { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  ThemeProvider,
  createTheme,
  Snackbar,
  IconButton,
} from '@mui/material';
import '../components/MatchReports/Report.css';




const FirstHalfReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loadingPhraseIndex, setLoadingPhraseIndex] = useState(0);
  const [displayedReport, setDisplayedReport] = useState('');
  const { type } = useParams();

  const loadingPhrases = [
    'Match Analyzing...'
  ];




  useEffect(() => {
    let typingInterval;
    if (report) {
      let index = 0;
      setDisplayedReport('');
      typingInterval = setInterval(() => {
        if (index < report.length) {
          setDisplayedReport((prev) => prev + report.charAt(index));
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 10); // Adjust typing speed here
    }
    return () => clearInterval(typingInterval);
  }, [report]);


  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchReport = async () => {
      try {
        const endpoint = type === 'first-half' 
          ? 'first-half-report' 
          : 'full-match-report';
        
        const response = await fetch(`http://127.0.0.1:8000/report/${endpoint}`, {
          signal: abortController.signal
        });
        
        if (!abortController.signal.aborted) {
          const data = await response.json();
          setReport(data.response);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching report:', error);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };
  
    fetchReport();
  
    return () => abortController.abort();
  }, [type]);




  if (error) return <div className="error-message">Error: {error}</div>;
  
  function FlashingText({ text, keyProp }) {
    return (
      <Typography
        key={keyProp} // Use key to force re-mount and restart animation
        variant="h5"
        color="primary"
        sx={{ mb: 2, textAlign: 'right' }}
      >
        {text.split('').map((char, index) => (
          <span
            key={index}
            className="flashing-letter"
            style={{
              animationDelay: `${index * 0.01}s`,
            }}
          >
            {char}
          </span>
        ))}
      </Typography>
    );
  }


  return (
    <div className="report-page">
      <button className="back-btn" onClick={() => navigate('/')}>
        &larr; Back to Booking
      </button>

      
      <div className="report-content">
      <h2>First Half Match Report</h2>

      {loading && (
          <Box
            sx={{
              mt: 4,
              minHeight: '220px', // Set a minimum height to prevent content shift
            }}
          >
            <Box sx={{ 
                mb: 2,
                textAlign: 'left', // Align text to left
                display: 'flex',
                justifyContent: 'flex-start' // Align container contents to left
              }}>
              <FlashingText
                keyProp={loadingPhraseIndex} // Use key to reset animation
                text={"Match Analyzing..."}
              />
            </Box>
            <Box>
              <ContentLoader
                
                speed={2}
                width="100%"
                height={160}
                backgroundColor="#f0f0f0"
                foregroundColor="#dedede"
              >
                {/* Adjusted shapes to simulate RTL loading */}
                <rect x="0" y="15" rx="4" ry="4" width="85%" height="15" />
                <rect x="0" y="45" rx="4" ry="4" width="95%" height="15" />
                <rect x="0" y="75" rx="4" ry="4" width="90%" height="15" />
                <rect x="0" y="105" rx="4" ry="4" width="100%" height="15" />
                <rect x="0" y="135" rx="4" ry="4" width="100%" height="15" />
              </ContentLoader>
            </Box>
          </Box>
        )}
      
      {displayedReport && (
          <>
          <Box sx={{ mt: 4 }}>
            <Typography
            variant="body1"
            sx={{ whiteSpace: 'pre-wrap', textAlign: 'justify' }}
            dangerouslySetInnerHTML={{ __html: displayedReport }}
          />
          </Box>
          
          <Box sx={{ m: 50 }}> </Box>



          </>
        )}
    </div>
    </div>
  );
};

export default FirstHalfReport;