import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
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
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './App.css';

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Products', path: '/products' },
    { text: 'Cart', path: '/cart' },
    { text: 'Search', path: '/search' },
    { text: 'Login', path: '/login' },
    { text: 'Logout', path: '/logout' },
  ];

  return (
    <div className="app-container">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="app-title">
            Clothing Shop
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button component={Link} to={item.path} key={index} onClick={toggleDrawer}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
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
