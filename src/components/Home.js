import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Clothing Shop</h1>
      <Link to="/products" className="button">View Products</Link>
    </div>
  );
}

export default Home;
