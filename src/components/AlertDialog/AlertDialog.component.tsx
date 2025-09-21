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
import { useAppSelector } from "../../store/hooks.ts";

const AlertDialog = ({ title, message }: { title: string, message: string }) => {
  const { user } = useAppSelector((state: any) => state.auth);
  const [open, setOpen] = useState<boolean>(user?.role === "admin" ? false : true);
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