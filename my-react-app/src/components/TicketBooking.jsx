import React, { useState } from 'react';
import './TicketBooking.css';

const TicketBooking = ({ currency, onBuyTicket }) => {
  const [ticketCount, setTicketCount] = useState(1);
  const [seatCategory, setSeatCategory] = useState('Gold');
  const [toggleStatus, setToggleStatus] = useState(false);

  const categories = [
    { name: 'Gold', price: currency === 'USD' ? 375 : 100, seatId: "204A" , color: "#efba19"},
    { name: 'Silver', price: currency === 'USD' ? 281: 75  , seatId: "430B", color: "#6f6761"},
    { name: 'CAT 1', price: currency === 'USD' ?  188 : 50 , seatId: "2600C1", color: "#3a449a"},
    { name: 'CAT 2', price: currency === 'USD' ?  94 : 25 , seatId: "3200C2", color: "#f57f2c"}
  ];

  const handleBuy = (category) => {
    const ticket = {
      id: Date.now(),
      category: category.name,
      price: category.price,
      currency,
      date: new Date().toLocaleDateString(),
      match: 'Football Match: Team A vs Team B',
      location: 'Stadium Name, City',
      seat_id: category.seatId
    };
    onBuyTicket(ticket);
  };

  return (
    <div className="ticket-booking">
      <div className="match-info">
        <img src="/matchPhoto.png" alt="Match" className="match-photo" />
        <div className="match-details">
          <h3>Al-Ittihad vs Al-Shabab - semi finals of the Saudi King's Cup</h3>
       
          <p>Date: October 15, 2025 - 8:00 PM</p>
          <p>Location: Alinma Stadium - Jeddah</p>
          
        </div>
      </div>

      <div className="booking-options">
        <div className="form-group">
          <label>Number of Tickets:</label>
          <select value={ticketCount} onChange={(e) => setTicketCount(e.target.value)}>
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Seat Category:</label>
          <select value={seatCategory} onChange={(e) => setSeatCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group toggle-group">
          <label>Special Requirements:</label>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={toggleStatus}
              onChange={() => setToggleStatus(!toggleStatus)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="ticket-list">
        <h3>Available Tickets</h3>
        {categories.map(category => (
          <div key={category.name} className="ticket-item">
            <div className="ticket-info">
              <div className="category-info">
                <div className="category-row">
                  <span 
                    className="color-square" 
                    style={{ backgroundColor: category.color }}
                  ></span>
                  <span className="category-name">{category.name}</span>
                </div>
                <div className="price-row">
                  {currency === 'USD' ? 'ر.س' : '$'} {category.price}
                </div>
              </div>
            </div>
            <button 
              className="buy-btn"
              onClick={() => handleBuy(category)}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketBooking;