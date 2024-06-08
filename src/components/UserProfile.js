import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        confirmPassword: user.password,
      });
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    const updatedUser = {
      ...formData,
    };

    updateUser(updatedUser);
    setMessage('Profile updated successfully');
  };

  return (
    <Container maxWidth="sm" className="profile-container">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        {message && <Alert severity={message.includes('successfully') ? 'success' : 'error'}>{message}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.username}
            onChange={handleChange}
            disabled
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <TextField
            label="First Name"
            name="firstName"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Address"
            name="address"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.address}
            onChange={handleChange}
            required
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default UserProfile;
