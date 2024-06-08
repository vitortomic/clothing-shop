import React, { useState, useContext } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register'; 
import UserProfile from './components/UserProfile'; 
import PrivateRoute from './components/PrivateRoute';
import Chatbot from './components/Chatbot';
import FloatingButton from './components/FloatingButton';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { AuthContext } from './context/AuthContext';
import './App.css';

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Cart', path: '/cart', icon: <ShoppingCartIcon /> },
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
          <div style={{ flexGrow: 1 }} />
          {user && (
            <IconButton color="inherit" onClick={handleProfileClick}>
              <AccountCircle />
            </IconButton>
          )}
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
          {!user && (
            <>
              <ListItem button component={Link} to="/login" onClick={toggleDrawer}>
                <ListItemIcon><LoginIcon /></ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button component={Link} to="/register" onClick={toggleDrawer}>
                <ListItemIcon><LoginIcon /></ListItemIcon> 
                <ListItemText primary="Register" />
              </ListItem>
            </>
          )}
          {user && (
            <ListItem button onClick={() => { logout(); toggleDrawer(); }}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </List>
      </Drawer>
      <Container style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<PrivateRoute />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Container>
      <FloatingButton onClick={toggleChatbot} />
      <Chatbot isOpen={isChatbotOpen} onClose={toggleChatbot} />
    </div>
  );
}

export default App;
