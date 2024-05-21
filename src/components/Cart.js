import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/Cart.css';

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
      <h1>Cart</h1>
      <ul>
        {cart.map(product => (
          <li key={product.id} className="cart-item">
            <p>{product.name}</p>
            <p>{product.price}</p>
            <button onClick={() => removeFromCart(product)} className="button">Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={clearCart} className="button">Clear Cart</button>
    </div>
  );
}

export default Cart;
