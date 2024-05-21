import React, { createContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// AuthProvider component to provide the auth state to the component tree
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user data from localStorage if available
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to handle login
  const login = (username, password) => {
    // Fake authentication: in a real app, replace this with a call to your authentication API
    const authenticatedUser = { username };
    setUser(authenticatedUser);
    localStorage.setItem('user', JSON.stringify(authenticatedUser)); // Save user to localStorage
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
