import React from 'react';
import './Buttons.scss';

export const Buttons = ({ type, children, onClick }) => {

  return (
    <button 
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
