import React, { FC } from "react";
import { AppBar, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DateDisplay from '../components/HeaderComponents/DateDisplay'; 
import UserInfo from '../components/HeaderComponents/UserInfo';        
import '../styles/Header.css';          

interface HeaderProps {
  currentUser: { username: string; role: number } | null; // Current logged-in user
  handleLogout: () => void; // Function to handle logout
}

const Header: FC<HeaderProps> = ({ currentUser, handleLogout }) => {
  const navigate = useNavigate(); // Hook to navigate to different routes

  return (
    <AppBar position="static" className="header-container">
      
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/* Main title of the app */}
        <Typography
          variant="h2"
          className="header-title"
          onClick={() => navigate("/")} // Navigate to the homepage when clicked
        >
          NOTES - SITE
        </Typography>

        {/* Display the current date using DateDisplay component */}
        <DateDisplay />

        {/* Display user info using UserInfo component */}
        <UserInfo currentUser={currentUser} handleLogout={handleLogout} />
      </Stack>
    </AppBar>
  );
};

export default Header;
