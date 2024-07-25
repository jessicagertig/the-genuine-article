import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import {
  StyledTextField,
} from "src/components/AdminPage/StyledFields";
import DialogModal from "src/components/shared/DialogModal";
import OutlinedButton from "src/components/shared/OutlinedButton";
import ButtonLoading from "src/components/shared/ButtonLoading";

import { useModalContext } from "src/context/ModalContext";
import { useToastContext } from "src/context/ToastContext";
import {
  useEditColorOption,
  useEditMaterialOption,
  useEditGarmentTitleOption,
} from "src/queryHooks/useMenus";

interface EditOptionModalProps {
  onCancel: () => void;
  menuTitle: string;
  currentOption: string;
  optionId: number;
}

const EditOptionModal: React.FC<EditOptionModalProps> = props => {
  const { onCancel, menuTitle, currentOption, optionId } = props;
  const theme = useTheme();
  const isFullscreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { mutate: editColorOption, isLoading: isLoadingEditColor } =
    useEditColorOption();
  const { mutate: editMaterialOption, isLoading: isLoadingEditMaterial } =
    useEditMaterialOption();
  const { mutate: editGarmentTitleOption, isLoading: isLoadingEditGarmentTitle } =
    useEditGarmentTitleOption();

  const { modalOpen } = useModalContext();
  const addToast = useToastContext();

  const [newOption, setNewOption] = React.useState<string>(currentOption || "");
  const [errorText, setErrorText] = React.useState<string>("");

  const isLoading = isLoadingEditColor || isLoadingEditMaterial || isLoadingEditGarmentTitle;
  const handleChangeInput = (event: React.BaseSyntheticEvent) => {
    const input = event.target?.value;
    setNewOption(input);
    setErrorText("");
  };

  const handleEditColor = async () => {
    editColorOption(
      {
        colorOptionId: optionId,
        colorOption: newOption,
      },
      {
        onSuccess: (data: any) => {
          console.log("Success editing color. Data:", data);
          addToast({
            kind: "success",
            title: "Your color option was successfully edited",
            delay: 5000,
          });
          onCancel();
        },
        onError: (error: any, data: any) => {
          const message =
            error && error.data
              ? error.data.message
              : "Your record could not be edited.";
          setErrorText(message);
          console.log("Request Error:", { message, data });
        },
      }
    );
  };

  const handleEditMaterial = async () => {
    console.log("HANDLE EDIT MATERIAL");
    editMaterialOption(
      {
        materialOptionId: optionId,
        materialOption: newOption,
      },
      {
        onSuccess: (data: any) => {
          console.log("Success editing material. Data:", data);
          addToast({
            kind: "success",
            title: "Your material option was successfully edited",
            delay: 5000,
          });
          onCancel();
        },
        onError: (error: any, data: any) => {
          const message =
            error && error.data
              ? error.data.message
              : "You record could not be edited.";
          setErrorText(message);
          console.log("Request Error:", { message, data });
        },
      }
    );
  };

  const handleEditGarmentTitle = async () => {
    console.log("HANDLE EDIT GARMENT TITLE");
    editGarmentTitleOption(
      {
        garmentTileOptionId: optionId,
        garmentTitleOption: newOption,
      },
      {
        onSuccess: (data: any) => {
          console.log("Success editing material. Data:", data);
          addToast({
            kind: "success",
            title: "Your garment title option was successfully edited",
            delay: 5000,
          });
          onCancel();
        },
        onError: (error: any, data: any) => {
          const message =
            error && error.data
              ? error.data.message
              : "You record could not be edited.";
          setErrorText(message);
          console.log("Request Error:", { message, data });
        },
      }
    );
  };

  const handleClickSave = async () => {
    console.log("Handle click save:", { menuTitle });
    switch (menuTitle) {
      case "Colors":
        await handleEditColor();
        break;
      case "Materials":
        await handleEditMaterial();
        break;
      case "Garment Titles":
        await handleEditGarmentTitle();
        break;
      default:
        console.log("Unhandled menu type", { menuTitle });
        break;
    }
  };

  const confirmButton = (
    <>
      <OutlinedButton onClick={handleClickSave}>
        {isLoading ? <ButtonLoading /> : "Edit option"}
      </OutlinedButton>
    </>
  );

  const title = `Edit ${menuTitle} Option`;

  return (
    <>
      <DialogModal
        open={modalOpen}
        dialogTitle={title}
        onCancel={onCancel}
        confirmButton={confirmButton}
        responsiveFullscreen={isFullscreen}
        full={false}
      >
        <Styled.ModalContent>
          <StyledTextField
            key="newOption"
            label="Edited Menu Option"
            name="newOption"
            id="newOption"
            value={newOption}
            onChange={event => handleChangeInput(event)}
            variant="filled"
            required={true}
            error={Boolean(errorText)}
            helperText={errorText}
          />
        </Styled.ModalContent>
      </DialogModal>
    </>
  );
};

export default EditOptionModal;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.ModalContent = styled.div(props => {
  const t = props.theme;
  return css`
    label: EditOptionModal_ModalContent;
    ${[t.mx(6), t.my(6)]}
    width: 306px;
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `;
});
