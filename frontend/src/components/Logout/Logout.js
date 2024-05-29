import React from 'react';
import axios from 'axios';
import { Buttons } from '../Buttons/Buttons';

export const LogoutButton = ({ goToLogin, setToken }) => {
  
  const handleLogout = async () => {

    try {

      await axios.post('http://localhost:5000/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      localStorage.removeItem('token');

      goToLogin('');
      setToken('');

    } catch (error) {

      console.error('Logout failed:', error);

    }
  };

  return (
    <Buttons onClick={handleLogout}>Logout</Buttons>
  );
};
