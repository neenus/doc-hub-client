import FileManager from '../components/FileManager/FileManager.component';
import { Typography, Box } from '@mui/material';
import AlertDialog from '../components/AlertDialog/AlertDialog.component';

const MyFiles = () => {
  const title = "File Manager feature is in beta mode"
  const message = "This feature is still in beta mode and may not work as expected. Please use with caution."

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
      <FileManager />
    </>
  )
}

export default MyFiles