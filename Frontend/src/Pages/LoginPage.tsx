import React, { useState } from "react";
import { Container, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginPageComponents/LoginForm";
import CreateAccountLink from "../components/LoginPageComponents/CreateAccountLink";
import "../styles/Loginpage.css";
import axios from "axios";

const LoginPage = ({ setUser }: { setUser: (username: string, role: number, token: string) => void }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Virheilmoitus
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        throw new Error("Username and password cannot be empty");
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        const { username, role, token } = response.data;
        setUser(username, role, token);
        navigate("/profile");
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || "Invalid credentials");
      setOpenSnackbar(true);
    }
  };

  const navigateToCreateAccount = () => {
    navigate("/createprofile");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container className="login-container">
      <Typography variant="h4" className="login-title" gutterBottom>
        Login
      </Typography>
      <Box className="login-form">
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
        <CreateAccountLink navigateToCreateAccount={navigateToCreateAccount} />
      </Box>

      {/* Error-ilmoitus */}
      {errorMessage && <Alert severity="error" className="error-alert">{errorMessage}</Alert>}
    </Container>
  );
};

export default LoginPage;
