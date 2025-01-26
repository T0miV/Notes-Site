import React from 'react';
import { Paper, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NoteIcon from '@mui/icons-material/Note';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'All Notes', icon: <NoteIcon />, path: '/all-notes' },
    { text: 'Calendar', icon: <CalendarTodayIcon />, path: '/calendar' },
    { text: 'Trash', icon: <DeleteIcon />, path: '/trash' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose(); // Close the sidebar after navigating
  };

  if (!isOpen) return null; // If sidebar is not open, return null

  return (
    <Paper
      elevation={3}
      sx={{
        width: 240,
        height: 700,
        outline: '3px solid black',
        position: 'absolute',
        left: '10px',
        top: '10px',
        backgroundColor: 'background.paper',
        zIndex: 1200, // Ensures that the sidebar is on top of other elements
      }}
    >
      <IconButton
        onClick={onClose} // Close sidebar on click
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1300, // Higher z-index than the sidebar to ensure it is clickable
          color: 'red',
        }}
      >
        <CloseIcon />
      </IconButton>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            sx={{
              marginTop: '60px',
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
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
