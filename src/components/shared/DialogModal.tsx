import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import TextButton from "src/components/shared/TextButton";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface CustomFormDialogProps extends DialogProps {
  dialogTitle: string;
  dialogMessage?: string;
  confirmButton?: React.ReactNode;
  onCancel: () => void;
  open: boolean;
  full?: boolean;
  responsiveFullscreen?: boolean;
}

const DialogModal = (props: CustomFormDialogProps): JSX.Element => {
  // console.log("DialogModalProps", props);

  const {
    dialogMessage,
    dialogTitle,
    confirmButton,
    onCancel,
    children,
    full,
    responsiveFullscreen,
    maxWidth,
  } = props;

  const handleClose = () => {
    onCancel();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        maxWidth={maxWidth ? maxWidth : "xl"}
        fullWidth={full ? full : false}
        fullScreen={responsiveFullscreen ? responsiveFullscreen : false}
        aria-labelledby="dialog-modal-title"
        aria-describedby="dialog-modal-description"
      >
        <DialogTitle  id="dialog-modal-title" sx={{ textAlign: "center", color: "#223F7C" }}>
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-modal-description">{dialogMessage}</DialogContentText>
          {children}
        </DialogContent>
        <Styled.ButtonsContainer full={full}>
          <DialogActions sx={{ width: "100%" }}>
            <Styled.Button full={full}>
              <TextButton onClick={handleClose}>Cancel</TextButton>
            </Styled.Button>
            {confirmButton ? (
              <Styled.Button full={full}>{confirmButton}</Styled.Button>
            ) : null}
          </DialogActions>
        </Styled.ButtonsContainer>
      </Dialog>
    </div>
  );
};

export default DialogModal;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.ButtonsContainer = styled.div((props: any) => {
  const t = props.theme;
  return css`
    label: DialogButtonsContainer;
    width: 96%;
    display: flex;
    justify-content: center;
    margin: 2%;
    
    ${t.mq.sm} {
        justify-content: flex-end;
        width: ${props.full ? "88%" : "100%"};
        margin: ${props.full ? "0% 10% 2% 2%" : "0"};
      }
    }
  `;
});

Styled.Button = styled.div((props: any) => {
  const t = props.theme;

  return css`
    label: DialogButton;
    width: ${props.full ? "50%" : "100%"};

    ${t.mq.sm} {
      width: ${props.full ? "20%" : "100%"};
      justify-content: flex-end;
    }
  `;
});
