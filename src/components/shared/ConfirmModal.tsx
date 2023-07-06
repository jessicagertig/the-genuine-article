import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import OutlinedButton from "src/components/shared/OutlinedButton";
import TextButton from "src/components/shared/TextButton";

import { useModalContext } from "src/context/ModalContext";

interface ConfirmModalProps extends Omit<DialogProps, 'open'> {
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  titleText: string;
  descriptionText: string;
  danger?: boolean;
  responsiveFullscreen?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = props => {
  const { modalOpen } = useModalContext();
  const { confirmText, titleText, descriptionText, danger, responsiveFullscreen } = props;


  const handleConfirm = async () => {
    props.onConfirm();
    props.onCancel(); //removes modal
  };

  const handleClose = () => {
    props.onCancel();
  };

  const confirmButtonColor = danger ? "error" : undefined;
  const confirmButton = (
    <OutlinedButton onClick={handleConfirm} color={confirmButtonColor}>
      {confirmText ? confirmText : "Confirm"}
    </OutlinedButton>
  );

  return (
    <>
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        fullScreen={responsiveFullscreen ? responsiveFullscreen : false}
        aria-labelledby="dialog-modal-title"
        aria-describedby="dialog-modal-description"
        maxWidth="xs"
      >
        <DialogTitle  id="dialog-modal-title" sx={{ color: "#223F7C", textTransform: "uppercase" }}>
          {titleText}
        </DialogTitle>
        <DialogContent sx={{ minHeight: "100px" }}>
          <DialogContentText id="dialog-modal-description" sx={{ color: "#223F7C", textWrap: "whitespace"}}>{descriptionText}</DialogContentText>
        </DialogContent>
        <Styled.ButtonsContainer>
          <DialogActions sx={{ width: "100%" }}>
            <Styled.Button>
              <TextButton onClick={handleClose}>Cancel</TextButton>
            </Styled.Button>
            <Styled.Button>{confirmButton}</Styled.Button>
          </DialogActions>
        </Styled.ButtonsContainer>
      </Dialog>
    </>
  );
};

export default ConfirmModal;

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
        width: 100%;
        margin: 0;
      }
    }
  `;
});

Styled.Button = styled.div((props: any) => {
  const t = props.theme;

  return css`
    label: DialogButton;
    width: 100%;

    ${t.mq.sm} {
      justify-content: flex-end;
    }
  `;
});