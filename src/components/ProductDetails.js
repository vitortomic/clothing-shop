import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Container, Typography, Button, CardMedia, Box, IconButton, Snackbar, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const { dispatch } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
    if (!user) {
      navigate('/login', { state: { from: location } });
    } else {
      dispatch({ type: 'ADD_TO_CART', payload: product });
      setSnackbarOpen(true); // Show snackbar
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSnackbarClick = () => {
    setSnackbarOpen(false);
    navigate('/cart');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <IconButton
        aria-label="back"
        onClick={() => navigate(-1)}
        sx={{ position: 'fixed', top: 80, left: 16 }} // Adjusted top value
      >
        <ArrowBackIcon />
      </IconButton>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {product.name}
        </Typography>
        <CardMedia
          component="img"
          height="500"
          image={product.image}
          alt={product.name}
          sx={{ objectFit: 'contain', mb: 2 }}
        />
        <Typography variant="body1" paragraph>
          {product.description}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Price: ${product.price.toFixed(2)}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={addToCart}
            sx={{ width: '200px' }}
          >
            Add to Cart
          </Button>
        </Box>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          severity="success"
          sx={{ width: '100%', cursor: 'pointer' }}
          onClick={handleSnackbarClick}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={(event) => {
                event.stopPropagation();
                handleSnackbarClose();
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          Product added to cart!
        </Alert>
      </Snackbar>
    </>
  );
}

export default ProductDetails;
