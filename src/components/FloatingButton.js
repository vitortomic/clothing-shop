import React from 'react';
import '../styles/FloatingButton.css';

function FloatingButton({ onClick }) {
  return (
    <button className="floating-button" onClick={onClick}>
      Chat
    </button>
  );
}

export default FloatingButton;
