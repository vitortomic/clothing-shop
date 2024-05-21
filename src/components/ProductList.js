import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  return (
    <div className="product-list-container">
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id} className="product-item">
            <Link to={`/products/${product.id}`}>{product.name}</Link>
            <p>{product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
