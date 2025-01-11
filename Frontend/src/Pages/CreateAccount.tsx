import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../components/CreateAccountComponents/AccountForm';
import '../styles/CreateAccountPage.css';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repassword, setRePassword] = useState<string>('');

  const createProfile = async () => {
    try {
      if (!username || !password || !repassword) {
        throw new Error('Username, password, and re-entered password cannot be empty');
      } else if (password !== repassword) {
        throw new Error('Passwords do not match');
      }
  
      const response = await fetch('http://localhost:5000/users/register', { // Updated route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        alert('User registered successfully');
        navigate('/profile');
      } else {
        throw new Error('Failed to register');
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Container className="profile-container">
      <Typography variant="h4" className="profile-title" gutterBottom>
        Create Profile
      </Typography>
      <ProfileForm
        username={username}
        password={password}
        repassword={repassword}
        setUsername={setUsername}
        setPassword={setPassword}
        setRePassword={setRePassword}
        onSubmit={createProfile}
      />
    </Container>
  );
};

export default Profile;
