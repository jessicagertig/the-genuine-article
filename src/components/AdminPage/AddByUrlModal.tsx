import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { StyledTextField } from "src/components/AdminPage/StyledFields";
import DialogModal from "src/components/shared/DialogModal";
import OutlinedButton from "src/components/shared/OutlinedButton";
import ButtonLoading from "src/components/shared/ButtonLoading";

import { useModalContext } from "src/context/ModalContext";
import { useToastContext } from "src/context/ToastContext";

import { useCreateScrapedItem } from "src/queryHooks/useGarments";

interface AddByUrlModalProps {
  onCancel: () => void;
  onConfirm?: () => void;
}

const AddByUrlModal: React.FC<AddByUrlModalProps> = props => {
  console.log("Image Upload Modal Props", props);
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));

  const {
    mutate: createScrapedItem,
    error,
    isLoading: isLoadingCreateScrapedItem,
  } = useCreateScrapedItem();

  const { modalOpen } = useModalContext();
  const addToast = useToastContext();

  const [state, setState] = React.useState({
    url: "",
  });

  const { url } = state;

  const handleChangeInput = (event: React.BaseSyntheticEvent, name: string) => {
    const input = event.target?.value;
    setState({ ...state, [name]: input });
  };

  const handleConfirm = async () => {
    createScrapedItem(
      { ...state },
      {
        onSuccess: (data: any) => {
          console.log("DATA", data);
          addToast({
            kind: "success",
            title: "Your record was successfully created",
            delay: 5000,
          });
          props.onCancel(); //removes modal
        },
        onError: (error: any) => {
          console.log("ERROR", error);
          addToast({
            kind: "error",
            title: "The item could not be added.",
            delay: 5000,
          });
          props.onCancel(); //removes modal
        },
      }
    );
  };

  const confirmButton = (
    <OutlinedButton onClick={handleConfirm}>
      {isLoadingCreateScrapedItem ? <ButtonLoading /> : "Save"}
    </OutlinedButton>
  );

  const title = "ADD GARMENT";

  return (
    <>
      <DialogModal
        open={modalOpen}
        dialogTitle={title}
        onCancel={props.onCancel}
        confirmButton={confirmButton}
        maxWidth="sm"
        full={true}
        responsiveFullscreen={fullscreen}
      >
        <Styled.ModalContent>
          <StyledTextField
            key="url"
            label="Source Url"
            name="url"
            id="url"
            value={url}
            onChange={event => handleChangeInput(event, "url")}
            variant="filled"
            required={true}
            error={error}
          />
        </Styled.ModalContent>
      </DialogModal>
    </>
  );
};

export default AddByUrlModal;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.ModalContent = styled.div(props => {
  const t = props.theme;
  return css`
    label: ModalContent;
    ${[t.mx(6), t.my(6)]}
    width: 100%;
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `;
});
