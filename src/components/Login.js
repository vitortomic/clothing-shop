import React, { useContext } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import '../styles/Login.css';

function Login() {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    login(username, password);

    // Redirect to the previous page or home page after successful login
    const from = location.state?.from?.pathname || '/';
    navigate(from, { replace: true });
  };

  if (user) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} />;
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
