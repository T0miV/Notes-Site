import React, { FC } from 'react';
import { TextField } from '@mui/material';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

const TextInput: FC<TextInputProps> = ({ label, value, onChange, type }) => {
  return (
    <TextField
      label={label}
      fullWidth
      variant="outlined"
      value={value}
      onChange={onChange}
      type={type}
      margin="normal"
    />
  );
};

export default TextInput;
