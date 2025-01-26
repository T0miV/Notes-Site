import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateAccountForm from '../components/CreateAccountComponents/AccountForm';
import '../styles/CreateAccountPage.css';

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');

  const createAccount = async () => {
    try {
      // Validointi
      if (!username || !password || !repassword) {
        alert('Username, password, and re-entered password cannot be empty');
        return;
      }
      if (password !== repassword) {
        alert('Passwords do not match');
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
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      alert(error.message || 'An error occurred');
    }
  };

  return (
    <Container className="create-account-container">
      <Typography variant="h4" className="create-account-title" gutterBottom>
        Create Account
      </Typography>
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
