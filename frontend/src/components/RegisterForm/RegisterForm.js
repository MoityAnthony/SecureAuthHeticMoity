import React, { useState } from 'react';
import axios from 'axios';
import { Inputs } from '../Inputs/Inputs';
import { Forms } from '../Forms/Forms';
import { Title } from '../Title/Title';
import { Buttons } from '../Buttons/Buttons';

export const RegisterForm = ({ onRegister, goToLogin }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (username, password) => {

    if (!username || !password) {

      setError('Please fill in all fields.');
      return;

    }

    try {

      const response = await axios.post('http://localhost:5000/auth/register', { username, password });

      console.log('Registered successfully!');
      onRegister();
      setError('');

    } catch (error) {

      if (error.response && error.response.status === 400) {
        console.log(error.response.data.errors);
        setError(error.response.data.message && error.response.data.errors);

      } else if (error.response && error.response.status === 409) {

        setError('User already exists. Please proceed to login.');

      } else {

        console.error('Registration failed:', error);
        setError('Registration failed. Please try again.');

      }
    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    handleRegister(username, password);

  };

  const SplitFunctionError = (customItems) => {

    for (let i = 0; i < customItems.length; i++) {
      customItems[i] = customItems[i];
    }

    customItems = customItems.join(",");

    return{
      __html: customItems
    };
  }

  return (
    <div className="register-form">
      <Title text={"Register"}/>
      <Forms onSubmit={handleSubmit}>
        <Inputs 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <Inputs 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Buttons type="submit">Register</Buttons>
        <Buttons onClick={goToLogin}>You have an account ? Login</Buttons>
        {error &&
          <>
            <p className='error-password-title'>Password must contain :</p>
            <p id='error' className='error' dangerouslySetInnerHTML={SplitFunctionError(error)}></p>
          </>
        }
      </Forms>
    </div>
  );
};
