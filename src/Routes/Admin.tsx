import React, { useState, useEffect } from "react";
import { selectAuth } from "../features/auth/authSlice";
import { Box, Typography, IconButton, Fab } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../features/users/userSlice";
import useToast from "../hooks/useToast";
import ConfirmationModal from "../components/ConfirmationModal/ConfirmationModal";
import { User } from "../types";

const Admin: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);


  const auth = useSelector(selectAuth);
  const dispatch = useDispatch<any>();
  const users = useSelector((state: any) => state.users.users);
  const navigate = useNavigate();
  const notify = useToast();

  const handleDeleteUser = async (user: User) => {
    setUserToDelete(user);
    setIsModalOpen(true);
  }

  const handleDeleteConfirm = async () => {

    if (!userToDelete) return notify({ message: "Error deleting user", type: "error" }); // Check if userToDelete is null

    const response = await dispatch(deleteUser(userToDelete._id));

    if (response.meta.requestStatus === "fulfilled") {
      setIsModalOpen(false);
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

  const handleCloseModal = () => {
    // Close modal without deletion
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "dir", headerName: "User Directory", flex: 1 },
    {
      field: "actions", headerName: "Actions", renderCell: (params: any) => (
        <>
          <IconButton color="primary" onClick={() => navigate(`/admin/edit-user/${params.row._id}`, {
            state: params.row
          })}>
            <EditIcon />
          </IconButton>
          <IconButton color="warning" onClick={() => handleDeleteUser(params.row)}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];

  const handleAddUser = () => navigate("/admin/add-user");

  useEffect(() => {
    if (auth.user?.role !== "admin") navigate("/", { replace: true });
    dispatch(getUsers());
  }, [auth]);

  return (
    <>
      <Box>
        <Box py={5} sx={{ textAlign: "center" }}>
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
            height: "60vh",
            width: "100%",
            backgroundColor: "#fff",
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
          />
        </Box>
      </Box>
      <Fab color="primary" aria-label="add" sx={{ position: "fixed", bottom: "2rem", right: "2rem" }} onClick={handleAddUser}>
        <AddIcon />
      </Fab>
      <ConfirmationModal
        open={isModalOpen}
        user={userToDelete as User}
        handleClose={handleCloseModal}
        handleConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default Admin;
