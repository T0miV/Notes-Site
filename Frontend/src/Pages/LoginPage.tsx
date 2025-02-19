import React, { useState } from "react";
import { Container, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginPageComponents/LoginForm";
import CreateAccountLink from "../components/LoginPageComponents/CreateAccountLink";
import "../styles/Loginpage.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth(); // Use setUser from AuthContext
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Function to handle login
  const handleLogin = async () => {
    try {
      if (!username || !password) {
        throw new Error("Username and password cannot be empty");
      }

      // Send login request to backend
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        const { username, role, token } = response.data;
        setUser(username, role, token); // Use setUser from AuthContext
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

      {/* Error message */}
      {errorMessage && (
        <Alert severity="error" className="error-alert">
          {errorMessage}
        </Alert>
      )}
    </Container>
  );
};

export default LoginPage;