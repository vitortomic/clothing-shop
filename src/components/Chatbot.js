import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../styles/Chatbot.css';

const socket = io('http://localhost:5005'); // Ensure this is the correct port

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Rasa server');
    });

    socket.on('bot_uttered', (response) => {
      setMessages((messages) => [...messages, { text: response.text, user: 'bot' }]);
    });

    return () => {
      socket.off('bot_uttered');
      socket.off('connect');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('user_uttered', { message: input });
    setMessages((messages) => [...messages, { text: input, user: 'user' }]);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>Chatbot</h3>
        <button onClick={onClose} className="close-button">X</button>
      </div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;
