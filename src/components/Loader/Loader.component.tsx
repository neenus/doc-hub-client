import { CircularProgress, Backdrop, Box } from "@mui/material";

const Loader = ({ loading }: { loading: boolean }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <CircularProgress size={50} />
      </Box>
    </Backdrop>
  );
};

export default Loader;
