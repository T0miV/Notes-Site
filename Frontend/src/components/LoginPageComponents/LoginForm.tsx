import React, { FC } from "react";
import { TextField, Button } from "@mui/material";

interface LoginFormProps {
  username: string;
  password: string;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  handleLogin: () => void;
}

const LoginForm: FC<LoginFormProps> = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {
  return (
    <form>
      <TextField
        label="Username"
        fullWidth
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Password"
        fullWidth
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        fullWidth
        className="login-button"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
