import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { CircularProgress, Typography, Button } from "@mui/material";

const CircularProgressWithLabel = ({
  progress,
  onCancel
}: CircularProgressWithLabelProp) => {
  const handleClick = () => onCancel();

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* style MUI circular color with linear gradient color */}
      <svg>
        <defs>
          <linearGradient id="my_gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(253, 187, 45, 1)" />
            <stop offset="100%" stopColor="rgba(34, 193, 195, 1)" />
          </linearGradient>
        </defs>
      </svg>
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          justifyContent: "center"
        }}
      >
        <CircularProgress
          size={60}
          variant="determinate"
          value={progress}
          sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="inherit"
          >{`${Math.round(progress)}%`}</Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ my: 2, mr: 2 }}
        onClick={handleClick}
      >
        Cancel
      </Button>
    </Box>
  );
};

CircularProgressWithLabel.propTypes = {
  progress: PropTypes.number.isRequired, // progress value in percent (0-100)
  onCancel: PropTypes.func.isRequired
};

type CircularProgressWithLabelProp = {
  progress: number;
  onCancel: () => void;
};

export default CircularProgressWithLabel;
