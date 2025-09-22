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


const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, user, handleClose, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Confirm Deletion
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete <strong>{user?.name}</strong>?
        </DialogContentText>
        <DialogContentText mt={5}>
          By confirming all data associated with this user will be deleted. <strong>This action cannot be undone.</strong>
        </DialogContentText>
        <DialogContentText mt={5}>
          Please confirm to proceed.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleConfirm} color="warning" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
