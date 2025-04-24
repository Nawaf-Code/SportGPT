import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreeDot } from "react-loading-indicators";
import './ChatWindow.css';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingProgress, setTypingProgress] = useState(0);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const [set_id, setSetId] = useState('D1023');

  // Initial greeting from SportGPT
  useEffect(() => {
    setMessages([{
      text: "Hello Nawaf! I'm SportGPT. Ask me anything about the match, the players, or even statistics",
      sender: 'bot'
    }]);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Typing animation effect
  useEffect(() => {
    let interval;
    if (isTyping) {
      interval = setInterval(() => {
        setTypingProgress(prev => (prev >= 100 ? 0 : prev + 10));
      }, 300);
    } else {
      setTypingProgress(0);
    }
    return () => clearInterval(interval);
  }, [isTyping]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message to chat
    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    try {
      // Simulate API call to backend
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: inputMessage,
          set_id: set_id,
          context: 'football-match' 
        })
      });
      
      const data = await response.json();
      setMessages(prev => [...prev, { 
        text: data.response, 
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble connecting. Please try again later.", 
        sender: 'bot',
        isError: true
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-page">
      <button className="back-btn-chat" onClick={() => navigate('/')}>
        &larr; Back to Booking
      </button>      
      <div className="chat-container">
        <div className="chat-header">
          <h2>Chat with SportGPT</h2>
          <p>Ask questions about the match in real-time</p>
        </div>
        
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <div className="message-content">
                <div className="message-text">{message.text}</div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message bot">
              <div className="typing-indicator">

              <ThreeDot color="#3763DA" size="small" text="" textColor="" />
              <div>

              </div>

                <span className='textloding'>SportGPT is typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="input-area">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask SportGPT about the match..."
            disabled={isTyping}
          />
          <button 

            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;