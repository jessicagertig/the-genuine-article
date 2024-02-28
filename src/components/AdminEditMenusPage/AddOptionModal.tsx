import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

import {
  StyledTextField,
  StyledAutocomplete,
} from "src/components/AdminPage/StyledFields";
import DialogModal from "src/components/shared/DialogModal";
import OutlinedButton from "src/components/shared/OutlinedButton";
import ButtonLoading from "src/components/shared/ButtonLoading";

import { useModalContext } from "src/context/ModalContext";
import { useToastContext } from "src/context/ToastContext";
import {
  useAddColorOption,
  useAddMaterialOption,
  useAddGarmentTitleOption
} from "src/queryHooks/useMenus";

interface EditMenusModalProps {
  onCancel: () => void;
  onConfirm?: () => void;
  menuTitle: string;
  handleChangeOptionInput: (event: React.BaseSyntheticEvent, value: string) => void;
}

const EditMenusModal: React.FC<EditMenusModalProps> = props => {
  const { onCancel, menuTitle } = props;
  const theme = useTheme();
  const isFullscreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { mutate: addColorOption, isLoading: isLoadingAddColor } =
    useAddColorOption();
  
  const { mutate: addMaterialOption, isLoading: isLoadingAddMaterial } =
    useAddMaterialOption();
  
  const { mutate: addGarmentTitleOption, isLoading: isLoadingAddGarmentTitle } = useAddGarmentTitleOption();
  
  const { modalOpen } = useModalContext();
  const addToast = useToastContext();

  const [newOption, setNewOption] = React.useState<string>("");
  const [errorText, setErrorText] = React.useState<string>("");

  const isLoading = isLoadingAddColor || isLoadingAddMaterial
  const handleChangeInput = (event: React.BaseSyntheticEvent) => {
    const input = event.target?.value;
    setNewOption(input);
    setErrorText("");
  };

  const handleAddColor = async () => {
    addColorOption(
      {
        colorOption: newOption
      },
      {
        onSuccess: (data: any) => {
          console.log("Success adding color. Data:", data);
          addToast({
            kind: "success",
            title: "Your color option was successfully added",
            delay: 5000,
          });
          onCancel();
        },
        onError: (error: any, data: any) => {
          const message =
            error && error.data
              ? error.data.message
              : "You record could not be added.";
          setErrorText(message);
          console.log("Request Error:", { message, data });
        },
      }
    );
  }

  const handleAddMaterial = async () => {
    console.log("HANDLE ADD MATERIAL")
    addMaterialOption(
      {
        materialOption: newOption
      },
      {
        onSuccess: (data: any) => {
          console.log("Success adding material. Data:", data);
          addToast({
            kind: "success",
            title: "Your material option was successfully added",
            delay: 5000,
          });
          onCancel();
        },
        onError: (error: any, data: any) => {
          const message =
            error && error.data
              ? error.data.message
              : "You record could not be added.";
          setErrorText(message);
          console.log("Request Error:", { message, data });
        },
      }
    );
  }

    const handleAddGarmentTitle = async () => {
      console.log("HANDLE ADD GARMENT TITLE");
      addGarmentTitleOption(
        {
          garmentTitleOption: newOption,
        },
        {
          onSuccess: (data: any) => {
            console.log("Success adding material. Data:", data);
            addToast({
              kind: "success",
              title: "Your garment title option was successfully added",
              delay: 5000,
            });
            onCancel();
          },
          onError: (error: any, data: any) => {
            const message =
              error && error.data
                ? error.data.message
                : "You record could not be added.";
            setErrorText(message);
            console.log("Request Error:", { message, data });
          },
        }
      );
    };

  const handleClickSave = async () => {
    console.log("Handle click save:", { menuTitle })
    switch (menuTitle) {
      case "Colors":
        await handleAddColor()
        break;
      case "Materials":
        await handleAddMaterial();
        break;
      case "Garment Titles":
        await handleAddGarmentTitle();
        break;
      default:
        break;
    }
  };

  const confirmButton = (
    <>
      <OutlinedButton onClick={handleClickSave}>
        Add option
        {/* {isLoading ? <ButtonLoading /> : "Add option"} */}
      </OutlinedButton>
    </>
  );
  
 
  const title = `Add ${menuTitle} Option`;

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
            label="New Menu Option"
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

export default EditMenusModal;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.ModalContent = styled.div(props => {
  const t = props.theme;
  return css`
    label: ModalContent;
    ${[t.mx(6), t.my(6)]}
    width: 306px;
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `;
});
