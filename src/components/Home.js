import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import ProductList from './ProductList';
import axios from 'axios';
import '../styles/Home.css';

function Home() {
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleSearch = async () => {
    let searchUrl = `http://localhost:5000/products?name_like=${query}`;

    if (selectedCategories.length > 0) {
      searchUrl += selectedCategories.map(cat => `&category=${cat}`).join('');
    }

    try {
      const response = await axios.get(searchUrl);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('There was an error fetching the search results!', error);
    }
  };

  const handleCategoryChange = (event) => {
    const category = event.target.name;
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <div className="search-form">
          <Typography variant="h6">Search Products</Typography>
          <TextField
            label="Search by name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormGroup>
            <Typography variant="subtitle1">Categories</Typography>
            {categories.map((cat) => (
              <FormControlLabel
                key={cat}
                control={
                  <Checkbox
                    name={cat}
                    checked={selectedCategories.includes(cat)}
                    onChange={handleCategoryChange}
                  />
                }
                label={cat}
              />
            ))}
          </FormGroup>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </Grid>
      <Grid item xs={12} md={9}>
        <ProductList products={filteredProducts} />
      </Grid>
    </Grid>
  );
}

export default Home;
