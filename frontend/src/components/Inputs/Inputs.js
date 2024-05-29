import React from 'react';
import './Inputs.scss';

export const Inputs = ({type, placeholder, value, onChange}) => {

  return (
    <input 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}>
    </input>
  )
}
