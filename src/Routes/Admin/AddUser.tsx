import { Typography, Box } from "@mui/material";
import UserForm from "../../components/UserForm/UserForm";
import { useNavigate } from "react-router-dom";
import { register } from "../../features/auth/authSlice";
import useToast from "../../hooks/useToast";
import { useDispatch } from "react-redux";

const RegisterUser: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = useToast();
  const initialValues = { name: "", email: "", role: "" };
  const handleSubmit = async (values: { name: string, email: string, role: string }) => {

    const response = await dispatch(register(values) as any)

    if (response.type === "auth/register/fulfilled") {
      values.name = ""
      values.email = ""
      values.role = ""
      notify({
        message: "User added successfully",
        type: "success"
      })
      navigate("/admin", { replace: true })
    } else {
      console.log("Error: ", response)
      notify({
        message: "Error adding user",
        type: "error"
      })
    }
  };

  const handleCancel = () => navigate("/admin");

  return (
    <div>
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
          Register User
        </Typography>
      </Box>
      <UserForm initialValues={initialValues} onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default RegisterUser;