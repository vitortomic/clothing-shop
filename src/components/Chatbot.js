import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Paper, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMessages([]);
      sendMessage('Hello'); // Send initial greeting message when the chatbot opens
    }
  }, [isOpen]);

  const sendMessage = async (message) => {
    if (!message) return;

    const userMessage = { sender: 'user', message: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
        sender: 'user',
        message: message,
      });

      const botMessages = response.data.map((msg) => ({
        sender: 'bot',
        message: msg.text,
      }));

      setMessages((prevMessages) => [...prevMessages, ...botMessages]);
    } catch (error) {
      console.error('Error communicating with Rasa:', error);
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return isOpen ? (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        width: '300px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 2,
        borderRadius: 1,
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6">Chatbot</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Paper sx={{ p: 2, height: '300px', overflowY: 'auto', mb: 1 }}>
        {messages.map((msg, index) => (
          <Typography
            key={index}
            sx={{
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              bgcolor: msg.sender === 'user' ? 'primary.light' : 'secondary.light',
              color: msg.sender === 'user' ? 'white' : 'black',
              p: 1,
              borderRadius: 1,
              mb: 1,
            }}
          >
            {msg.message}
          </Typography>
        ))}
      </Paper>
      <Box sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          sx={{ ml: 1, minWidth: 'fit-content' }}
        >
          <SendIcon />
        </Button>
      </Box>
    </Box>
  ) : null;
};

export default Chatbot;
