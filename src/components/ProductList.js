import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <Grid container spacing={3}>
      {products.map(product => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card
            sx={{
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${product.price.toFixed(2)}
              </Typography>
              <Button
                component={Link}
                to={`/products/${product.id}`}
                variant="contained"
                color="primary"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
