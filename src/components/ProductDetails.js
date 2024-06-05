import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Container, Typography, Button, CardMedia } from '@mui/material';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/products`)
      .then(response => {
        const filteredProducts = response.data.filter(product => product.id == Number(id));
        if (filteredProducts.length > 0) {
            setProduct(filteredProducts[0]);
        } else {
            setProduct(null);
        }
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
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {product.name}
      </Typography>
      <CardMedia
        component="img"
        height="300"
        image={product.image}
        alt={product.name}
      />
      <Typography variant="h6" gutterBottom>
        Price: ${product.price}
      </Typography>
      <Button variant="contained" color="primary" onClick={addToCart}>
        Add to Cart
      </Button>
    </Container>
  );
}

export default ProductDetails;