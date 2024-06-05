import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();

    let searchUrl = `http://localhost:5000/products?name_like=${query}`;

    if (category) {
      searchUrl += `&category=${category}`;
    }

    if (minPrice) {
      searchUrl += `&price_gte=${minPrice}`;
    }

    if (maxPrice) {
      searchUrl += `&price_lte=${maxPrice}`;
    }

    try {
      const response = await axios.get(searchUrl);
      setResults(response.data);
    } catch (error) {
      console.error('There was an error fetching the search results!', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Products
      </Typography>
      <form onSubmit={handleSearch}>
        <TextField
          label="Search by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Min Price"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Max Price"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {results.length > 0 ? (
          results.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
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
                    {product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No results found</Typography>
        )}
      </Grid>
    </Container>
  );
}

export default Search;
