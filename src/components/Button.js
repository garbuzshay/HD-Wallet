// src/components/Button.js
import React from 'react';

const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 shadow-neon-purple ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
