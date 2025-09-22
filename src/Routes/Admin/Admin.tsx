import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Fab, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser, resetPassword } from "../../features/users/userSlice";
import useToast from "../../hooks/useToast";
import DeleteConfirmationModal from "../../components/ConfirmationModal/DeleteConfirmationModal";
import PswResetConfirmation from "../../components/ConfirmationModal/PwsResetConfirmationModal";
import { User } from "../../types";

const Admin: React.FC = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userToReset, setUserToReset] = useState<User | null>(null);

  const dispatch = useDispatch<any>();
  const users = useSelector((state: any) => state.users.users);
  const isResetting = useSelector((state: any) => state.users.isLoading);
  const navigate = useNavigate();
  const notify = useToast();

  const handleDeleteUser = async (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  }

  const handleResetPassword = async (user: User) => {
    setUserToReset(user);
    setIsResetModalOpen(true);
  }

  const handleDeleteConfirm = async () => {

    if (!userToDelete) return notify({ message: "Error deleting user", type: "error" }); // Check if userToDelete is null

    const response = await dispatch(deleteUser(userToDelete._id));

    if (response.meta.requestStatus === "fulfilled") {
      setIsDeleteModalOpen(false);
      setUserToDelete(null);

      notify({
        message: "User deleted successfully",
        type: "success"
      });
    } else {
      notify({
        message: response.error?.message || "Error deleting user",
        type: "error"
      });
    }
  }

  const handlePwsResetConfirm = async () => {

    if (!userToReset) return notify({ message: "Error resetting password", type: "error" }); // Check if userToReset is null
    const response = await dispatch(resetPassword(userToReset._id));
    if (response.meta.requestStatus !== "fulfilled") {
      notify({
        message: response.error?.message || "Error resetting password",
        type: "error"
      });
    } else {
      notify({
        message: "Password reset successfully. New password sent to user's email.",
        type: "success"
      });
    }
    setIsResetModalOpen(false);
    setUserToReset(null);
  }

  const handleCloseDeleteModal = () => {
    // Close modal without deletion
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleCloseResetModal = () => {
    // Close modal without password reset
    setIsResetModalOpen(false);
    setUserToReset(null);
  }

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "dir", headerName: "User Directory", flex: 1, renderCell: (params: any) => (
        <Button
          color="secondary"
          onClick={() => handleNavigation("/myfiles", params.row)}
        >
          {params.value}
        </Button>
      )
    },
    {
      field: "actions", headerName: "Actions", flex: 1, renderCell: (params: any) => (
        <>
          <IconButton color="primary" onClick={() => navigate(`/admin/edit-user/${params.row._id}`, {
            state: params.row
          })}>
            <EditIcon />
          </IconButton>
          <IconButton color="warning" onClick={() => handleDeleteUser(params.row)}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="info" onClick={() => handleResetPassword(params.row)}>
            <LockResetIcon />
          </IconButton>
        </>
      )
    }
  ];

  const handleAddUser = () => navigate("/admin/add-user");

  const handleNavigation = (path: string, user: User) => navigate(path, { state: user });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <Box>
        <Box py={3} sx={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: "#0B096A",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              lineHeigh: "22px",
              fontWeight: 700
            }}
          >
            Doc-Hub Admin Panel
          </Typography>
        </Box>
        <Box sx={{
          "& .MuiDataGrid-root": {
            height: "65vh",
            width: "100%",
            backgroundColor: "#fff",
            marginBottom: "1rem",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#f4f4f4",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#f4f4f4",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#fefefe",
          },
        }}>
          <DataGrid
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 1 }
              },
            }}
            rows={users}
            columns={columns}
            getRowId={(row) => row._id}
            pageSizeOptions={[5, 10, 25, 50]}
            slots={{ toolbar: GridToolbar }}
          />
        </Box>
      </Box>
      <Fab color="primary" aria-label="add" sx={{ position: "fixed", bottom: "2rem", right: "2rem" }} onClick={handleAddUser}>
        <AddIcon />
      </Fab>
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        user={userToDelete as User}
        handleClose={handleCloseDeleteModal}
        handleConfirm={handleDeleteConfirm}
      />
      <PswResetConfirmation
        open={isResetModalOpen}
        user={userToReset as User}
        handleClose={handleCloseResetModal}
        handleConfirm={handlePwsResetConfirm}
        loading={isResetting}
      />
    </>
  );
};

export default Admin;
