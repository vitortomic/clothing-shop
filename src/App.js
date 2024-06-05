import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Login from './components/Login';
import Logout from './components/Logout';
import PrivateRoute from './components/PrivateRoute';
import Chatbot from './components/Chatbot';
import FloatingButton from './components/FloatingButton';
import Search from './components/Search';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import './App.css';

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="app-container">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Clothing Shop
          </Typography>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/products">Products</Button>
          <Button color="inherit" href="/cart">Cart</Button>
          <Button color="inherit" href="/search">Search</Button>
          <Button color="inherit" href="/login">Login</Button>
          <Button color="inherit" href="/logout">Logout</Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<PrivateRoute component={Cart} />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Container>
      <FloatingButton onClick={toggleChatbot} />
      <Chatbot isOpen={isChatbotOpen} onClose={toggleChatbot} />
    </div>
  );
}

export default App;
