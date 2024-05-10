import { Typography, Box } from "@mui/material";
import UserForm from "../../components/UserForm/UserForm";
import { User } from '../../types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { updateUser } from "../../features/users/userSlice";
import useToast from "../../hooks/useToast";

const EditUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = useToast();
  const { state } = useLocation() as { state: User };

  const initialValues = {
    name: state?.name || "",
    email: state?.email || "",
    role: state?.role || ""
  }

  const handleSubmit = async (values: { name: string, email: string }) => {
    const user = { ...state, ...values };
    const response = await dispatch(updateUser(user) as any);

    if (response.type === "users/updateUser/fulfilled") {
      notify({
        message: "User updated successfully",
        type: "success"
      });
      navigate("/admin", { replace: true });
    } else {
      console.log("Error: ", response);
      notify({
        message: "Error updating user",
        type: "error"
      });
    }

  };

  const handleCancel = () => navigate("/admin");

  return (
    <>
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
          Edit User
        </Typography>
      </Box>
      <UserForm initialValues={initialValues} onSubmit={handleSubmit} onCancel={handleCancel} />
    </>
  )
}

export default EditUser;