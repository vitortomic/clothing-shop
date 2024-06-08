import React, { createContext, useReducer, useEffect } from 'react';

// Create the context
const CartContext = createContext();

// Initial cart state from localStorage
const initialState = JSON.parse(sessionStorage.getItem('cart')) || [];

// Cart reducer to handle cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingProductIndex = state.findIndex(item => item.id === action.payload.id);
      if (existingProductIndex >= 0) {
        const updatedCart = [...state];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    case 'REMOVE_FROM_CART':
      return state
        .map(item => 
          item.id === action.payload.id 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        )
        .filter(item => item.quantity > 0);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

// CartProvider component to provide the cart state to the component tree
const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
