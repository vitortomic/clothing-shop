import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, Modal, IconButton, TextField, Snackbar, Alert, FormControl, FormControlLabel, FormGroup, FormLabel, Switch, Select, MenuItem, InputLabel, Slider } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../styles/ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { dispatch } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [years, setYears] = useState([]);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [priceRange, setPriceRange] = useState([0, 150]);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => {
        setProducts(response.data);
        const uniqueCategories = [...new Set(response.data.map(product => product.category))];
        setCategories(uniqueCategories);
        const uniqueManufacturers = [...new Set(response.data.map(product => product.manufacturer))];
        setManufacturers(uniqueManufacturers);
        const uniqueYears = [...new Set(response.data.map(product => product.productionYear))];
        setYears(uniqueYears);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addToCart = (product) => {
    if (!user) {
      navigate('/login', { state: { from: location } });
    } else {
      dispatch({ type: 'ADD_TO_CART', payload: product });
      setSnackbarOpen(true);
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

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage('');
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterModalOpen = () => {
    setFilterModalOpen(true);
  };

  const handleFilterModalClose = () => {
    setFilterModalOpen(false);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.name;
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((cat) => cat !== category)
        : [...prevSelectedCategories, category]
    );
  };

  const handleManufacturerChange = (event) => {
    setSelectedManufacturer(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const applyFilter = () => {
    handleFilterModalClose();
  };

  const removeFilter = () => {
    setSelectedCategories([]);
    setSelectedManufacturer('');
    setSelectedYear('');
    setPriceRange([0, 150]);
    handleFilterModalClose();
  };

  const filteredProducts = products.filter(product => 
    (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.description.toLowerCase().includes(searchQuery.toLowerCase())) && 
    (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
    (selectedManufacturer === '' || product.manufacturer === selectedManufacturer) &&
    (selectedYear === '' || product.productionYear === selectedYear) &&
    (product.price >= priceRange[0] && product.price <= priceRange[1])
  );

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: '100%', maxWidth: '600px', mr: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilterModalOpen}
          startIcon={<FilterListIcon />}
          sx={{ width: '140px' }}
        >
          Filter
        </Button>
      </Box>
      <Grid container spacing={3}>
        <TransitionGroup component={null}>
          {filteredProducts.map(product => (
            <CSSTransition
              key={product.id}
              timeout={500}
              classNames="fade"
            >
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
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
                    onClick={() => handleOpen(product.image)}
                    sx={{ cursor: 'pointer' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Category: {product.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Manufacturer: {product.manufacturer}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Production Year: {product.productionYear}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {product.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                    <Button
                      component={Link}
                      to={`/products/${product.id}`}
                      variant="contained"
                      color="primary"
                      sx={{ flex: 1, mr: 1 }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => addToCart(product)}
                      sx={{ flex: 1 }}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Card>
              </Grid>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
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
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <img src={selectedImage} alt="Selected" style={{ width: '100%' }} />
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
      <Modal
        open={filterModalOpen}
        onClose={handleFilterModalClose}
        aria-labelledby="filter-modal-title"
        aria-describedby="filter-modal-description"
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
            onClick={handleFilterModalClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="filter-modal-title" variant="h6" component="h2">
            Filter by Category
          </Typography>
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Categories</FormLabel>
            <FormGroup>
              {categories.map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Switch
                      checked={selectedCategories.includes(category)}
                      onChange={handleCategoryChange}
                      name={category}
                    />
                  }
                  label={category}
                />
              ))}
            </FormGroup>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="manufacturer-select-label">Manufacturer</InputLabel>
              <Select
                labelId="manufacturer-select-label"
                value={selectedManufacturer}
                label="Manufacturer"
                onChange={handleManufacturerChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {manufacturers.map((manufacturer) => (
                  <MenuItem key={manufacturer} value={manufacturer}>
                    {manufacturer}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="year-select-label">Production Year</InputLabel>
              <Select
                labelId="year-select-label"
                value={selectedYear}
                label="Production Year"
                onChange={handleYearChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ mt: 4, mb: 2 }}>
              <Typography gutterBottom>Price Range</Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={150}
              />
            </Box>
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button variant="contained" color="primary" onClick={applyFilter}>
              Apply Filter
            </Button>
            <Button variant="outlined" sx={{ color: 'black', borderColor: 'black' }} onClick={removeFilter}>
              Remove Filter
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ProductList;
