import React, { useState } from 'react';
import axios from 'axios';
import { Inputs } from '../Inputs/Inputs';
import { Buttons } from '../Buttons/Buttons';
import { Forms } from '../Forms/Forms';
import { Title } from '../Title/Title';

import '../../styles/styles.scss';

export const LoginForm = ({ onLogin, goToRegister}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (username, password) => {

    if (!username || !password) {

      setError('Please fill in all fields.');
      return;

    }

    try {

      const response = await axios.post('http://localhost:5000/auth/login', { username, password });

      setError('');
      onLogin(response.data.token, response.data.secret, response.data.qrCodeUrl);

    } catch (error) {

      console.error('Login failed:', error);
      setError('Login failed. Please try again.');

    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    handleLogin(username, password);

  };

  return (
    <div>
      <Title text={"Login"}/>
      <Forms onSubmit={handleSubmit}>
        <Inputs type={"text"} placeholder={"Username"} value={username} onChange={e => setUsername(e.target.value)} />
        <Inputs type={"password"} placeholder={"Password"} value={password} onChange={e => setPassword(e.target.value)} />
        <Buttons type={"submit"}>Login</Buttons>
        <Buttons onClick={goToRegister}>You don't have an account ? Register</Buttons>
      </Forms>
      <p className='error'>{error && error}</p>
    </div>
  );
}
