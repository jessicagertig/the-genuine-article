import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface CustomFormDialogProps extends DialogProps {
  dialogTitle: string;
  dialogMessage?: string;
  confirmButtonText?: string;
  onCancel: () => void;
  onConfirm?: () => void;
  open: boolean;
}

const DialogModal = (props: CustomFormDialogProps): JSX.Element => {
  const { dialogMessage, dialogTitle, confirmButtonText, onCancel, onConfirm, children } = props;
  console.log("DialogModalProps", props)

  const handleClose = () => {
    onCancel();
    // setOpen(false);
  };

  const handleConfirm = () => {
    onConfirm?.();
    // setOpen(false);
  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogMessage}
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>{confirmButtonText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogModal;