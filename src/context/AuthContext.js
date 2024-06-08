import React, { createContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// AuthProvider component to provide the auth state to the component tree
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user data from sessionStorage if available
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to handle login
  const login = (username, password) => {
    // Fake authentication: in a real app, replace this with a call to your authentication API
    const storedUser = sessionStorage.getItem('user');
    if (storedUser != null) {
      alert('You must logout to login!');
    } else {
      const authenticatedUser = { username };
      setUser(authenticatedUser);
      sessionStorage.setItem('user', JSON.stringify(authenticatedUser)); // Save user to sessionStorage
    }
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user'); // Remove user from sessionStorage
    sessionStorage.removeItem('cart');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
