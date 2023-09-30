import React, { SyntheticEvent } from "react";
import PropTypes from "prop-types";
import { Snackbar, SnackbarCloseReason } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { AlertProps } from "@mui/material/Alert/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const SnackbarComponent = ({
  open,
  handleClose,
  message,
  severity
}: SnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

SnackbarComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired
};

type SnackbarProps = {
  open: boolean;
  handleClose: (
    _event: Event | SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => void;
  message: string;
  severity: "success" | "info" | "warning" | "error";
};

export default SnackbarComponent;
