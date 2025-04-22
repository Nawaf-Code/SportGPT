import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogin, onLogout, currency, toggleCurrency }) => {
  const navigate = useNavigate();
 
  return (
    <header className="header">
      <div className="logo">
        <img src="/ai_sport_logo.png" alt="Logo" />
      </div>
      <div className="header-actions">
        <button className="currency-btn" onClick={toggleCurrency}>
          {currency === 'USD' ? '$' : 'ر.س'} {currency}
        </button>
        {isLoggedIn ? (
          <div className="profile-dropdown">
          <button className="profile-btn">Options</button>
          <div className="dropdown-content">
            <button 
              className="dropdown-btn"
              onClick={() => navigate('/my-tickets')}
            >
              My Tickets
            </button>
            <button 
              className="dropdown-btn" 
              onClick={() => navigate('/chat')}
            >
              Chat with SportGPT
            </button>
            <button 
              className="dropdown-btn"
              onClick={() => navigate('/report/first-half')}
            >
              First Half Match Report
            </button>
            <button 
              className="dropdown-btn"
              onClick={() => navigate('/report/full')}
            >
              Full Match Report
            </button>
            <button 
              className="dropdown-btn logout-btn"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
        ) : (
          <button className="login-btn" onClick={onLogin}>
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;