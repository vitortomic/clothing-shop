import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/Cart.css';
import { Container, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';


function Cart() {
  const { cart, dispatch } = useContext(CartContext);

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div className="cart-container">
      <Grid container spacing={3}>
        {cart.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4} className="cart-item">
            <Card className="product-card">
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeFromCart(product)}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        className="clear-cart-button"
        onClick={clearCart}
      >
        Clear Cart
      </Button>
    </div>
  );
};

export default Cart;