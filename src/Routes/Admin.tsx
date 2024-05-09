import { useEffect } from "react";
import { selectAuth } from "../features/auth/authSlice";
import { Box, Typography, IconButton, Fab } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/users/userSlice";

const Admin = () => {

  const auth = useSelector(selectAuth);
  const dispatch = useDispatch<any>();
  const users = useSelector((state: any) => state.users.users);
  const navigate = useNavigate();

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
          <IconButton color="warning" onClick={() => console.log("Delete User: ", params.row)}>
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
    </>
  );
};

export default Admin;
