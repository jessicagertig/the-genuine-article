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

import { Menus } from "src/utils/formHelpers";

import { validateUrl } from "src/utils/validationWithYup";

interface EditMenusModalProps {
  onCancel: () => void;
  onConfirm?: () => void;
  menuName: string;
  handleChangeOptionInput: (event: React.BaseSyntheticEvent, value: string) => void;
}

const EditMenusModal: React.FC<EditMenusModalProps> = props => {
  const theme = useTheme();
  const isFullscreen = useMediaQuery(theme.breakpoints.down("md"));

  // const { mutate: createScrapedItem, isLoading: isLoadingCreateScrapedItem } =
  //   useCreateScrapedItem();
  const { modalOpen } = useModalContext();
  const addToast = useToastContext();

  const [newOption, setNewOption] = React.useState<string>("");
  const [errorText, setErrorText] = React.useState<string>("");

  const handleChangeInput = (event: React.BaseSyntheticEvent) => {
    const input = event.target?.value;
    setNewOption(input);
    setErrorText("");
  };

  const menuOptions: Array<string> = ["Colors", "Materials", "Garment Titles"];

  const handleClickSave = async () => {
    const validationError = await validateUrl(newOption);
    setErrorText(validationError);
    if (!validationError) {
      // props.handleSave();
    }
  };

  const confirmButton = (
    <>
      <OutlinedButton onClick={handleClickSave}>
        {/* {isLoadingCreateScrapedItem ? <ButtonLoading /> : "Add item"} */}
      </OutlinedButton>
    </>
  );

  const title = "EDIT A MENU";

  return (
    <>
      <DialogModal
        open={modalOpen}
        dialogTitle={title}
        onCancel={props.onCancel}
        confirmButton={confirmButton}
        full={true}
        responsiveFullscreen={true}
      >
        <Styled.ModalContent>
          <StyledAutocomplete
            key="menuType"
            disablePortal={true}
            id="menuType"
            // defaultValue={defaultGarmentTitleOption}
            options={menuOptions}
            // getOptionLabel={(option: unknown) => (option as Option).label}
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
