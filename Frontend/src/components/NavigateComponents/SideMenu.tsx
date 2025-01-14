import React from 'react';
import { Paper, List, ListItemButton, ListItemIcon, ListItemText, ClickAwayListener } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NoteIcon from '@mui/icons-material/Note';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteIcon from '@mui/icons-material/Delete';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'All Notes', icon: <NoteIcon />, path: '/all-notes' },
    { text: 'Calendar', icon: <CalendarTodayIcon />, path: '/calendar' },
    { text: 'Trash', icon: <DeleteIcon />, path: '/trash' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Paper
        elevation={3}
        sx={{
          width: 240,
          height: 689,
          outline: "3px solid black",
          position: 'absolute',
          left: '-242px',
          top: '0px',
          backgroundColor: 'background.paper',
          zIndex: 1200,
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => handleNavigation(item.path)}
              sx={{
                padding: '8px 16px',
                '&:hover': {
                  backgroundColor: 'action.hover',
                }
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </ClickAwayListener>
  );
};

export default Sidebar;
