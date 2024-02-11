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
} from "src/queryHooks/useMenus";

interface EditMenusModalProps {
  onCancel: () => void;
  onConfirm?: () => void;
  menuName: string;
  handleChangeOptionInput: (event: React.BaseSyntheticEvent, value: string) => void;
}

const EditMenusModal: React.FC<EditMenusModalProps> = props => {
  const { onCancel, menuName } = props;
  const theme = useTheme();
  const isFullscreen = useMediaQuery(theme.breakpoints.down("md"));

  const { mutate: addColorOption, isLoading: isLoadingAddColor } =
    useAddColorOption();
  
    const { mutate: addMaterialOption, isLoading: isLoadingAddMaterial } =
      useAddMaterialOption();
  
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

  const menuOptions: Array<string> = ["Colors", "Materials", "Garment Titles"];

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

  const handleClickSave = async () => {
    console.log("Handle click save:", { menuName })
    switch (menuName) {
      case "colorsMenu":
        await handleAddColor()
        break;
      case "materialsMenu":
        await handleAddMaterial();
        break;
      default:
        break;
    }
  };

  const confirmButton = (
    <>
      <OutlinedButton onClick={handleClickSave}>
        Add item
        {/* {isLoading ? <ButtonLoading /> : "Add option"} */}
      </OutlinedButton>
    </>
  );

  const title = "EDIT A MENU";

  return (
    <>
      <DialogModal
        open={modalOpen}
        dialogTitle={title}
        onCancel={onCancel}
        confirmButton={confirmButton}
        full={true}
        responsiveFullscreen={true}
      >
        <Styled.ModalContent>
          <StyledAutocomplete
            key="menuType"
            disablePortal={true}
            id="menuType"
            defaultValue={menuName}
            options={menuOptions}
            renderInput={params => (
              <TextField
                {...params}
                label="Menu type"
                name="menuType"
                required={true}
                variant="filled"
                // error={hasError}
                // helperText={errorText}
              />
            )}
            // onInputChange={(event, value) =>
            //   handleSelectInputChange(event, name, value)
            // }
          />
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
    width: 100%;
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `;
});
