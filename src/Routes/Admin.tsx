import { useEffect } from "react";
import { selectAuth } from "../features/auth/authSlice";
import { TableContainer, Table, TableHead, TableBody, TableCell, TableRow, Paper, IconButton, Fab } from "@mui/material";
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

  const handleAddUser = () => {
    console.log("Add user")
  }


  useEffect(() => {
    if (auth.user?.role !== "admin") {
      return navigate("/", { replace: true });
    }
    dispatch(getUsers());
  }, [auth]);

  return (
    <>
      <TableContainer component={Paper} sx={{marginTop: "1rem", marginBottom: "1rem"}}>
        <Table>
          <TableHead sx={{
            "& .MuiTableCell-root": {
              fontWeight: "bold",
              textAlign: "center"
            }
            }} 
            color="primary"
          >
            <TableRow>
              {/* <TableCell>
                <Checkbox />
              </TableCell> */}
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{
            "& .MuiTableCell-root": {
              textAlign: "center"
            }
          
          }}>
            {users.map((user: any) => (
              <TableRow key={user._id}>
                {/* <TableCell>
                  <Checkbox />
                </TableCell> */}
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton  sx={{
                    cursor: "not-allowed"
                  }}>
                    <EditIcon color="primary" />
                    </IconButton>
                  <IconButton>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>  
        </Table>
      </TableContainer>
      <Fab color="primary" aria-label="add" sx={{position: "fixed", bottom: "2rem", right: "2rem"}} onClick={handleAddUser}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default Admin;
