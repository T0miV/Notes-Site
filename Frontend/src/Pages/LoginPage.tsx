import React, { FC, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginPageComponents/LoginForm";
import CreateAccountLink from "../components/LoginPageComponents/CreateAccountLink";
import "../styles/Loginpage.css";
import axios from "axios";

interface LoginScreenProps {
  setUser: (username: string, role: number, token: string) => void;
}

const LoginPage: FC<LoginScreenProps> = ({ setUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        throw new Error("Username and password cannot be empty");
      }

      const response = await axios.post("http://localhost:5000/users/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const { username, role, token } = response.data;
        setUser(username, role, token);
        navigate("/profile");
      }
    } catch (error: any) {
      alert(error.response?.data?.error || "Invalid credentials");
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
