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
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
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
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Products', path: '/products', icon: <ListAltIcon /> },
    { text: 'Cart', path: '/cart', icon: <ShoppingCartIcon /> },
    { text: 'Search', path: '/search', icon: <SearchIcon /> },
    { text: 'Login', path: '/login', icon: <LoginIcon /> },
    { text: 'Logout', path: '/logout', icon: <LogoutIcon /> },
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
              <ListItemIcon>{item.icon}</ListItemIcon>
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
