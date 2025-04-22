import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MyTickets.css';

const MyTickets = ({ tickets, currency }) => {
  const navigate = useNavigate();
  return (
    <div className="my-tickets">

      <button className="back-btn" onClick={() => navigate('/')}>
        &larr; Back to Booking
      </button>

      <h2>My Tickets</h2>
      {tickets.length === 0 ? (
        <p className="no-tickets">You haven't purchased any tickets yet.</p>
      ) : (
        <div className="tickets-list">
          {tickets.map(ticket => (
            <div key={ticket.id} className="ticket-card">
              <h3>{ticket.match}</h3>
              <div className="ticket-details">
                <p><strong>Category:</strong> {ticket.category}</p>
                <p><strong>Price:</strong> {currency === 'USD' ? '$' : 'ر.س'} {ticket.price}</p>
                <p><strong>Date:</strong> {ticket.date}</p>
                <p><strong>Location:</strong> {ticket.location}</p>
                <p><strong>Seat Id:</strong> {ticket.seat_id}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;