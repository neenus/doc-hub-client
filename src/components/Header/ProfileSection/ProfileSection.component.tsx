import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Divider, ListItemIcon, ListItemText } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import FolderIcon from '@mui/icons-material/Folder';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import useToast from "../../../hooks/useToast";

interface ProfileButtonProps {
  user: any;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const notify = useToast();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  const handleMenuNavigation = (path: string) => {
    navigate(path);
    handleClose();
  }

  const handleLogout = () => {
    try {
      dispatch(logout());
    } catch (error) {
      console.log({ error });
      notify({
        message: "Something went wrong",
        type: "error"
      });
    } finally {
      navigate("/login");
      notify({
        message: "Logged out successfully",
        type: "success"
      });
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick} color="primary">
        <AccountCircleIcon fontSize="large" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        anchorPosition={{
          top: 0,
          left: 5
        }}
        sx={{ minWidth: "400px" }}
      >
        <MenuItem onClick={() => handleMenuNavigation("/")}>
          <ListItemIcon>
            <HomeIcon color="secondary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </MenuItem>
        <Divider />
        {user.role === "admin" && (
          <MenuItem onClick={() => handleMenuNavigation("/admin")}>
            <ListItemIcon>
              <AdminPanelSettingsIcon color="secondary" fontSize="small" />
            </ListItemIcon>
            <ListItemText>Admin Panel</ListItemText>
          </MenuItem>
        )}
        <MenuItem onClick={() => handleMenuNavigation("/myfiles")}>
          <ListItemIcon>
            <FolderIcon color="secondary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Files (Beta)</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon color="secondary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileButton;
