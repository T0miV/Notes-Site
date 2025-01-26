import { Stack, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Stack
      sx={{
        backgroundColor: "lightblue",
        border: "4px solid black",
        fontFamily: "Roboto",
      }}
      alignItems="center"
      padding={2}
    >
      <Typography variant="subtitle1" fontSize={"35px"}>
        ©Tomi V
      </Typography>
    </Stack>
  );
};

export default Footer;
