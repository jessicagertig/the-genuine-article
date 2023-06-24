import React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface CustomFormDialogProps extends DialogProps {
  dialogTitle: string;
  dialogMessage?: string;
  confirmButton?: React.ReactNode;
  onCancel: () => void;
  open: boolean;
}

const DialogModal = (props: CustomFormDialogProps): JSX.Element => {
  console.log("DialogModalProps", props)
  
  const { dialogMessage, dialogTitle, confirmButton, onCancel, children } = props;

  const handleClose = () => {
    onCancel();
  };


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
          {confirmButton ? confirmButton : null}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogModal;