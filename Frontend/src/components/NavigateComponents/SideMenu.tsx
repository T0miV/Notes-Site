import React from 'react';
import { Paper, List, ListItemButton, ListItemIcon, ListItemText, IconButton, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NoteIcon from '@mui/icons-material/Note';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Alle 600px

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'All Notes', icon: <NoteIcon />, path: '/all-notes' },
    { text: 'Calendar', icon: <CalendarTodayIcon />, path: '/calendar' },
    { text: 'Trash', icon: <DeleteIcon />, path: '/trash' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose(); // Sulkee sivupalkin navigoinnin jälkeen
  };

  if (!isOpen) return null; // Piilottaa sivupalkin, jos se ei ole auki

  return (
    <Paper
      elevation={3}
      sx={{
        width: isMobile ? '100%' : 240, // Mobiilissa koko näytön leveys
        height: isMobile ? '100%' : 540, // Mobiilissa koko näytön korkeus
        outline: '3px solid black',
        position: isMobile ? 'fixed' : 'absolute',
        left: isMobile ? 0 : '10px',
        top: isMobile ? 0 : '10px',
        backgroundColor: 'background.paper',
        zIndex: 1300,
        transition: 'transform 0.3s ease-in-out',
        paddingTop: isMobile ? '50px' : '20px', // Lisää tilaa ylös työpöydällä
      }}
    >
      {/* Sulkupainike */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1400,
          color: 'red',
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Lista navigointikohteista */}
      <List>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            sx={{
              marginTop: "24px",
              padding: '20px 23px',
              '&:hover': { backgroundColor: 'action.hover' },
              marginBottom: isMobile ? '8px' : '20px', // Enemmän väliä työpöydälle
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};

export default Sidebar;
