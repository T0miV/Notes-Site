import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../components/CreateAccountComponents/AccountForm';
import '../styles/CreateAccountPage.css';
import axios from 'axios';

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

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, {
        username,
        password,
      });

      if (response.status === 200) {
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
