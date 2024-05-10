import { useState, Fragment } from 'react';
import {
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";

const AlertDialog = ({ title, message }: { title: string, message: string }) => {
  const auth = useSelector(selectAuth);
  const [open, setOpen] = useState<boolean>(auth.user?.role === "admin" ? false : true);
  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default AlertDialog;