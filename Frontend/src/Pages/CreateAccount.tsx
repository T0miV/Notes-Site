import React, { useState } from 'react';
import { Container, Typography, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateAccountForm from '../components/CreateAccountComponents/AccountForm';
import '../styles/CreateAccountPage.css';

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Uusi tila onnistumisviestille
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    if (!username || !password || !repassword) {
      setErrorMessage('Username, password, and re-entered password cannot be empty');
      return false;
    }
    if (password !== repassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }
    return true;
  };

  const createAccount = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null); // Nollataan mahdollinen aiempi onnistumisviesti

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setSuccessMessage('Account created successfully'); // Asetetaan onnistumisviesti
        setTimeout(() => {
          navigate('/login'); // Ohjataan käyttäjä kirjautumissivulle lyhyen viiveen jälkeen
        }, 2000); // 2 sekunnin viive
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Failed to create account');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="create-account-container">
      <Typography variant="h4" className="create-account-title" gutterBottom>
        Create Account
      </Typography>

      {/* Error-ilmoitus */}
      {errorMessage && (
        <Alert severity="error" className="error-alert">
          {errorMessage}
        </Alert>
      )}

      {/* Onnistumisilmoitus */}
      {successMessage && (
        <Alert severity="success" className="success-alert">
          {successMessage}
        </Alert>
      )}

      <div className="create-account-form">
        <CreateAccountForm
          username={username}
          password={password}
          repassword={repassword}
          setUsername={setUsername}
          setPassword={setPassword}
          setRePassword={setRePassword}
          onSubmit={createAccount}
        />

        {/* Loading spinner */}
        {isLoading && <CircularProgress className="loading-spinner" />}
      </div>
    </Container>
  );
};

export default CreateAccountPage;