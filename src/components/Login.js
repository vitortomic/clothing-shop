import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import '../styles/Login.css';

function Login() {
  const { user, login } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    login(username, password);
  };

  if (user) {
    return (
      <Container maxWidth="sm" className="login-container">
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            You are already logged in!
          </Typography>
          <Typography variant="h6">
            Welcome back, {user.username}!
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" className="login-container">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
