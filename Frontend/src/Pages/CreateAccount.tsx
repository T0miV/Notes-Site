import React, { useState } from 'react';
import { Container, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateAccountForm from '../components/CreateAccountComponents/AccountForm';
import '../styles/CreateAccountPage.css';

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const createAccount = async () => {
    try {
      // Validointi
      if (!username || !password || !repassword) {
        setErrorMessage('Username, password, and re-entered password cannot be empty');
        return;
      }
      if (password !== repassword) {
        setErrorMessage('Passwords do not match');
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert('Account created successfully');
        navigate('/login');
      } else {
        const errorMessage = (await response.json())?.message || 'Failed to create account';
        setErrorMessage(errorMessage);
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred');
    }
  };

  return (
    <Container className="create-account-container">
      <Typography variant="h4" className="create-account-title" gutterBottom>
        Create Account
      </Typography>

      {/* Error-ilmoitus */}
      {errorMessage && <Alert severity="error" className="error-alert">{errorMessage}</Alert>}

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
      </div>
    </Container>
  );
};

export default CreateAccountPage;
