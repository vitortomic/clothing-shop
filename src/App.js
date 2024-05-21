import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Login from './components/Login';
import Logout from './components/Logout';
import PrivateRoute from './components/PrivateRoute';
import Chatbot from './components/Chatbot';
import './styles/App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Clothing Shop</h1>
      </header>
      <nav className="app-nav">
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/cart">Cart</a>
        <a href="/login">Login</a>
        <a href="/logout">Logout</a>
      </nav>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<PrivateRoute component={Cart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </main>
      {/**<Chatbot />**/}
    </div>
  );
}

export default App;
