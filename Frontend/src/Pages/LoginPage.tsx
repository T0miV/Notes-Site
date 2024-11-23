import React, { FC, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginPageComponents/LoginForm"; // Import the LoginForm component
import CreateAccountLink from "../components/LoginPageComponents/CreateAccountLink"; // Import CreateAccountLink component
import "../styles/Loginpage.css"; // Import the new CSS file

interface LoginScreenProps {
  setUser: (username: string, role: number) => void;
}

const LoginPage: FC<LoginScreenProps> = ({ setUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        throw new Error('Username and password cannot be empty');
      }
  
      const response = await fetch('http://localhost:5000/users/login', { // Updated route
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setUser(data.username, data.role);
        navigate('/profile');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const navigateToCreateAccount = () => {
    navigate("/createprofile");
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
    </Container>
  );
};

export default LoginPage;
