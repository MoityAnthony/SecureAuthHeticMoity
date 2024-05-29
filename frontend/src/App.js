import React, { useEffect, useState } from 'react';
import { RegisterForm } from './components/RegisterForm/RegisterForm';
import { LoginForm } from './components/LoginForm/LoginForm';
import { TwoFactorAuthForm } from './components/TwoFactorAuthForm/TwoFactorAuthForm';
import { Title } from './components/Title/Title';
import { LogoutButton } from './components/Logout/Logout';
import { Container } from './components/Container/Container';

function App() {

  const [step, setStep] = useState('login');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [error, setError] = useState('');
  const [secret, setSecret] = useState('');

  useEffect(() => {

    const storedToken = localStorage.getItem('token');

    if (storedToken) {

      setToken(storedToken);
      setStep('logged-in');

    }
  }, []);

  const handleRegisterSuccess = () => {

    setStep('login');

  };

  const handleLoginSuccess = (token, secret, qrCodeUrl) => {

    setToken(token);
    setSecret(secret);
    setQrCodeUrl(qrCodeUrl);
    setStep('verify-2fa');

  };

  const handleVerify2FA = () => {

    setStep('logged-in');

  }

  const goToLogin = () => {

    setStep('login');
    setError('');

  }

  const goToRegister = () => {

    setStep('register');
    setError('');

  };

  return (
    <Container step={step}>
      {step === 'register' && (
        <div>
          <RegisterForm onRegister={handleRegisterSuccess} goToLogin={goToLogin} />
        </div>
      )}
      {step === 'login' && (
        <div>
          <LoginForm onLogin={handleLoginSuccess} goToRegister={goToRegister} />
        </div>
      )}
      {step === 'verify-2fa' && (
        <div>
          <TwoFactorAuthForm qrCodeUrl={qrCodeUrl} secret={secret} onVerify2FA={handleVerify2FA} />
        </div>
      )}
      {step === 'logged-in' && (
        <div>
          <Title text={"Logged in successfully!"} />
          <LogoutButton goToLogin={goToLogin} setToken={setToken} />
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Container>
  );
}

export default App;
