import { Button, Stack, Box } from "@mui/material";
import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/NavigateComponents/SideMenu";
import "../styles/Navigate.css";

const Navigate: FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Box sx={{ position: 'relative' }}>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        className="navigate-container"
        alignItems="center"
      >
        <Button
          className="hamburgermenu-button navigate-sidebar"
          variant="outlined"
          color="success"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle sidebar visibility
        >
          ☰
        </Button>

        <Button
          className="navigate-button navigate-frontpage"
          variant="outlined"
          color="success"
          onClick={() => navigate("/")}
        >
          Front Page
        </Button>
        <Button
          className="navigate-button navigate-information"
          variant="outlined"
          onClick={() => navigate("/information")}
        >
          Information
        </Button>
        <Button
          className="navigate-button navigate-profile"
          variant="outlined"
          color="error"
          onClick={() => navigate("/profile")}
        >
          Profile
        </Button>
      </Stack>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} // Close sidebar when X is clicked
      />
    </Box>
  );
};

export default Navigate;
