import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ChatWindow from './components/Chat/ChatWindow';
import ReportPage from './pages/ReportPage';
import TicketBooking from './components/TicketBooking';
import BigPhoto from './components/BigPhoto';
import MyTickets from './components/MyTickets';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [showMyTickets, setShowMyTickets] = useState(false);
  const [tickets, setTickets] = useState([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const toggleCurrency = () => {
    setCurrency(currency === 'USD' ? 'SAR' : 'USD');
  };

  const handleBuyTicket = (ticket) => {
    setTickets([...tickets, ticket]);
  };

  return (
    <Router>
      <div className="App">
      <Header 
        isLoggedIn={isLoggedIn} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
        currency={currency} 
        toggleCurrency={toggleCurrency}
        showMyTickets={() => setShowMyTickets(true)}
      />


        
        <Routes>
        <Route path="/my-tickets" element={<MyTickets 
          tickets={tickets} 
          currency={currency} 
          onBack={() => setShowMyTickets(false)}
        />} />

          <Route path="/" element={

        <div className="main-content">
          <TicketBooking 
            currency={currency} 
            onBuyTicket={handleBuyTicket} 
          />
          <BigPhoto />
        </div>

          } />

          <Route path="/chat" element={<ChatWindow />} />
          <Route path="/report/:type" element={<ReportPage />} />
          {/* ... other routes */}
        </Routes>


        
      </div>
    </Router>
  );
}

export default App;