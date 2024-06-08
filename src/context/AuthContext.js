import React, { createContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// AuthProvider component to provide the auth state to the component tree
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user data from sessionStorage if available
    const storedUser = sessionStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to handle login
  const login = (username, password) => {
    const storedUser = sessionStorage.getItem(username);
    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      if (userObject.password === password) {
        setUser(userObject);
        sessionStorage.setItem('currentUser', JSON.stringify(userObject));
        return { success: true };
      } else {
        return { success: false, message: 'Incorrect password' };
      }
    } else {
      return { success: false, message: 'User not found' };
    }
  };

  // Function to handle registration
  const register = (userData) => {
    const { username } = userData;
    if (sessionStorage.getItem(username)) {
      return { success: false, message: 'Username already taken' };
    } else {
      sessionStorage.setItem(username, JSON.stringify(userData));
      return { success: true };
    }
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('currentUser'); // Remove user from sessionStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
