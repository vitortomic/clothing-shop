import React, { useContext, useMemo } from 'react';
import { CartContext } from '../context/CartContext';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Typography, Box, Card, CardContent, CardHeader, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/Cart.css';

const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id: productId } });
  };

  const columns = [
    { field: 'name', headerName: 'Product Name', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1 },
    { field: 'quantity', headerName: 'Quantity', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <IconButton
          color="secondary"
          onClick={() => removeFromCart(params.row.id)}
        >
          <DeleteIcon style={{ color: 'red' }} />
        </IconButton>
      ),
    },
  ];

  const rows = cart.map((product, index) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
  }));

  const totalCost = useMemo(
    () => cart.reduce((sum, product) => sum + (product.price * product.quantity), 0),
    [cart]
  );

  return (
    <div className="cart-container">
      <Card>
        <CardHeader title="Shopping Cart" />
        <CardContent>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              components={{
                NoRowsOverlay: () => (
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Cart is empty
                  </Typography>
                ),
              }}
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f5f5f5',
                },
                '& .MuiDataGrid-cell': {
                  padding: '10px',
                },
              }}
            />
          </Box>
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Typography variant="h6">
              Total Cost: ${totalCost.toFixed(2)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cart;
