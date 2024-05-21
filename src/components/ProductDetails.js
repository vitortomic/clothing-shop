import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the product details!', error);
      });
  }, [id]);

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      <img src={product.image} alt={product.name} />
      <button onClick={addToCart} className="button">Add to Cart</button>
    </div>
  );
}

export default ProductDetails;
