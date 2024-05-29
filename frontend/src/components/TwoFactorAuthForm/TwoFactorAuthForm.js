import React, { useState } from 'react';
import axios from 'axios';
import QrCode from 'qrcode.react';
import { Inputs } from '../Inputs/Inputs';
import { Buttons } from '../Buttons/Buttons';
import { Forms } from '../Forms/Forms';
import { Title } from '../Title/Title';

export const TwoFactorAuthForm = ({ secret, qrCodeUrl, onVerify2FA }) => {

  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');

  const handleVerify2FA = async (verificationCode, secret) => {

    if (!verificationCode) {

      setError('Please enter the verification code.');
      return;

    }

    try {

      const response = await axios.post('http://localhost:5000/auth/verify-2fa', { verificationCode, secret });
      localStorage.setItem('token', response.data.token);
      console.log('2FA verification successful!');
      setError('');
      onVerify2FA();

    } catch (error) {

      console.error('2FA verification failed:', error);
      setError('2FA verification failed. Please try again.');

    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    handleVerify2FA(verificationCode, secret);

  };

  return (
    <div>
      <Title text={"Verify 2FA"}/>
      {qrCodeUrl && (
        <div className='qrcode-container'>
          <QrCode value={qrCodeUrl} className='qrcode'/>
          <p>Download and connect to Google Authenticator app</p>
          <p>Scan this QRCode with the applicaiton and the verification code is on the home page</p>
        </div>
      )}
      <Forms onSubmit={handleSubmit}>
        <Inputs type={"text"} placeholder={"Enter 2FA code"} value={verificationCode} onChange={e => setVerificationCode(e.target.value)} />
        <Buttons type={"submit"}>Verify 2FA</Buttons>
      </Forms>
      {error && <p className='error'>{error}</p>}
    </div>
  );
}
