import { Stack, Typography } from "@mui/material";
import "../styles/Footer.css"; // 🔹 Tuodaan CSS-tiedosto

const Footer = () => {
  return (
    <Stack className="footer-container">
      <Typography  className="footer-text">
        ©Tomi V
      </Typography>
    </Stack>
  );
};

export default Footer;
