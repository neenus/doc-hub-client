import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, Divider } from "@mui/material";
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from "react-draggable";
import { User } from "../../types";

interface ConfirmationModalProps {
  open: boolean;
  user: User;
  handleClose: () => void;
  handleConfirm: () => void;
  loading?: boolean;
}

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}


const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, user, handleClose, handleConfirm, loading }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Confirm Password Reset
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>
          Are you sure you want to reset the password for <strong>{user?.name}</strong>?
        </DialogContentText>
        <DialogContentText mt={5}>
          By confirming the user will receive an email with the new password.
        </DialogContentText>
        <DialogContentText mt={5}>
          Please confirm to proceed.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} color="primary" disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          color="warning"
          autoFocus
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
