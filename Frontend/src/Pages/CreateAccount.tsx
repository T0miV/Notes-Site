import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateAccountForm from '../components/CreateAccountComponents/AccountForm';
import '../styles/CreateAccountPage.css';

const CreateAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repassword, setRePassword] = useState<string>('');

  const createAccount = async () => {
    try {
      if (!username || !password || !repassword) {
        throw new Error('Username, password, and re-entered password cannot be empty');
      } else if (password !== repassword) {
        throw new Error('Passwords do not match');
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
        throw new Error('Failed to create account');
      }
    } catch (error: any) {
      alert(error.message);
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
