import FileManager from '../components/FileManager/FileManager.component';
import { Typography, Box } from '@mui/material';
import AlertDialog from '../components/AlertDialog/AlertDialog.component';
import { useLocation } from "react-router-dom";

const MyFiles = () => {
  const title = "File Manager feature is in beta mode"
  const message = "This feature is still in beta mode and may not work as expected. Please use with caution."

  // access data provided with the useNavigate hook
  const { state } = useLocation();

  return (
    <>
      <AlertDialog title={title} message={message} />
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
          NR Accounting & Business Advisors
        </Typography>
      </Box>
      <FileManager userInfo={state} />
    </>
  )
}

export default MyFiles