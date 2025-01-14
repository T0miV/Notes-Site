import React from "react";
import { Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

// UserInfo component to display user login status and handle login/logout functionality
interface UserInfoProps {
  currentUser: { username: string; role: number } | null; // User info passed as props
  handleLogout: () => void; // Function to handle logout
}

const UserInfo: React.FC<UserInfoProps> = ({ currentUser, handleLogout }) => {
  const navigate = useNavigate(); // Hook to navigate to different routes

  return (
    <Stack direction="row" alignItems="center" className="header-user-info">
      {currentUser ? (
        // If the user is logged in, display their username and logout button
        <>
          <Typography variant="h6" className="logged-in-text">
          <span className="username-highlight">Logged in as: </span>
          <span className="username">{currentUser.username}</span>
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            size="small"
            className="logout-button"
            onClick={() => {
              // Handle logout and redirect to login page
              handleLogout();
              navigate("/login");
            }}
          >
            Log Out
          </Button>
        </>
      ) : (
        // If the user is not logged in, display a login button
        <Button
          variant="outlined"
          color="inherit"
          className="login-button"
          onClick={() => navigate("/login")}
        >
          Log In
        </Button>
      )}
    </Stack>
  );
};

export default UserInfo;
