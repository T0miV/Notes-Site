import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../styles/WelcomeBox.css"; // Päivitetty polku

interface WelcomeBoxProps {
  username: string;
}

const WelcomeBox: React.FC<WelcomeBoxProps> = ({ username }) => {
  const navigate = useNavigate();

  return (
    <div className="welcome-box">
      <Typography variant="h4" className="welcome-message">
        Welcome back, {username}!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className="profile-button"
        onClick={() => navigate("/profile")} // Ohjaa profiilisivulle
      >
        Edit profile
      </Button>
    </div>
  );
};

export default WelcomeBox;