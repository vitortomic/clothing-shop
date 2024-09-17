import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const API_URL = 'http://localhost:3001';

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      
      if (response.data && response.data.token) {
        const userObject = { username, token: response.data.token };
        setUser(userObject);
        sessionStorage.setItem('currentUser', JSON.stringify(userObject));
        return { success: true };
      } else {
        return { success: false, message: 'Login failed' };
      }
    } catch (error) {
      return { success: false, message: error.response ? error.response.data.message : 'Error logging in' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);

      if (response.data && response.data.message === 'User registered successfully') {
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return { success: false, message: error.response ? error.response.data.message : 'Error registering' };
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      const token = user?.token;
      const response = await axios.put(
        `${API_URL}/update-profile`,
        updatedUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data) {
        setUser(updatedUser);
        sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
        return { success: true };
      } else {
        return { success: false, message: 'Failed to update user' };
      }
    } catch (error) {
      return { success: false, message: error.response ? error.response.data.message : 'Error updating profile' };
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
