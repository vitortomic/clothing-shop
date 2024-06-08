import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Container, Typography, Button, CardMedia, Box, IconButton, Snackbar, Alert, Modal, TextField, Rating } from '@mui/material';
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
  const [reviews, setReviews] = useState([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [seeReviewsModalOpen, setSeeReviewsModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState('');
  const [averageRating, setAverageRating] = useState(0);
  const [ratingError, setRatingError] = useState('');
  const [reviewError, setReviewError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/products`)
      .then(response => {
        const filteredProducts = response.data.filter(product => product.id == Number(id));
        if (filteredProducts.length > 0) {
          setProduct(filteredProducts[0]);
          const storedReviews = JSON.parse(localStorage.getItem(`reviews-${id}`)) || [];
          setReviews(storedReviews);
          updateAverageRating(storedReviews);
        } else {
          setProduct(null);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the product details!', error);
      });
  }, [id]);

  const updateAverageRating = (reviews) => {
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      setAverageRating(totalRating / reviews.length);
    } else {
      setAverageRating(0);
    }
  };

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

  const handleReviewSubmit = () => {
    let hasError = false;

    if (!newRating) {
      setRatingError('Rating is required');
      hasError = true;
    } else {
      setRatingError('');
    }

    if (!newReview) {
      setReviewError('Review text is required');
      hasError = true;
    } else {
      setReviewError('');
    }

    if (!hasError) {
      const review = {
        username: user.username,
        rating: newRating,
        review: newReview
      };
      const updatedReviews = [...reviews, review];
      setReviews(updatedReviews);
      localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));
      setNewRating(0);
      setNewReview('');
      setReviewModalOpen(false);
      updateAverageRating(updatedReviews);
    }
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Price: ${product.price.toFixed(2)}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Average Rating:
            </Typography>
            <Rating value={averageRating} readOnly precision={0.5} sx={{ ml: 1 }} />
          </Box>
        </Box>
        <Typography variant="body1" paragraph>
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, pb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={addToCart}
            sx={{ width: '200px', mr: 2 }}
          >
            Add to Cart
          </Button>
          {user && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setReviewModalOpen(true)}
              sx={{ width: '200px', mr: 2 }}
            >
              Review this product
            </Button>
          )}
          <Button
            variant="contained"
            sx={{ width: '200px', backgroundColor: 'black', color: 'white' }}
            onClick={() => setSeeReviewsModalOpen(true)}
          >
            See Reviews
          </Button>
        </Box>
      </Container>
      <Modal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '600px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}
        >
          <IconButton
            aria-label="close"
            onClick={() => setReviewModalOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="h2" gutterBottom>
            Add Your Review
          </Typography>
          <Rating
            name="new-rating"
            value={newRating}
            onChange={(event, newValue) => setNewRating(newValue)}
          />
          {ratingError && <Typography color="error">{ratingError}</Typography>}
          <TextField
            label="Review"
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={4}
            value={newReview}
            onChange={(event) => setNewReview(event.target.value)}
            error={Boolean(reviewError)}
            helperText={reviewError}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handleReviewSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={seeReviewsModalOpen}
        onClose={() => setSeeReviewsModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '600px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}
        >
          <IconButton
            aria-label="close"
            onClick={() => setSeeReviewsModalOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="h2" gutterBottom>
            User Reviews
          </Typography>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1">{review.username}</Typography>
                <Rating value={review.rating} readOnly />
                <Typography variant="body2">{review.review}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2">No reviews yet.</Typography>
          )}
        </Box>
      </Modal>
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
