import React, { FC } from 'react';
import { Box, Button } from '@mui/material';
import TextInput from '../CreateAccountComponents/CreateAccountForm';

interface ProfileFormProps {
  username: string;
  password: string;
  repassword: string;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setRePassword: (value: string) => void;
  onSubmit: () => void;
}

const ProfileForm: FC<ProfileFormProps> = ({
  username,
  password,
  repassword,
  setUsername,
  setPassword,
  setRePassword,
  onSubmit,
}) => {
  return (
    <Box className="profile-box">
      <form className="profile-form">
        <TextInput
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <TextInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <TextInput
          label="Re-enter Password"
          value={repassword}
          onChange={(e) => setRePassword(e.target.value)}
          type="password"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          fullWidth
          className="profile-button"
        >
          Create Profile
        </Button>
      </form>
    </Box>
  );
};

export default ProfileForm;
