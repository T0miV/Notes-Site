import { Button, Stack } from "@mui/material";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navigate.css"; // Import the new CSS file

const Navigate: FC = () => {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      className="navigate-container"
      alignItems="center"
    >
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
  );
};

export default Navigate;
