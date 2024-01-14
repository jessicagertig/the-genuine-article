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

import { validateUrl } from "src/utils/validationWithYup";

interface EditMenusModalProps {
  onCancel: () => void;
  onConfirm?: () => void;
}

const EditMenusModal: React.FC<EditMenusModalProps> = props => {
  console.log("Image Upload Modal Props", props);
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));

  // const { mutate: createScrapedItem, isLoading: isLoadingCreateScrapedItem } =
  //   useCreateScrapedItem();
  const { modalOpen } = useModalContext();
  const addToast = useToastContext();
  const [menuType, setMenuType] = React.useState<string>("")
  const [state, setState] = React.useState({
    url: "",
    errorText: "",
  });

  const { url } = state;

  const handleChangeInput = (event: React.BaseSyntheticEvent, name: string) => {
    const input = event.target?.value;
    setState({ ...state, [name]: input, errorText: "" });
  };

  const menuOptions: Array<string> = ["Colors", "Materials", "Garment Titles"]

  const handleSave = async () => {
    // createScrapedItem(
    //   { url: state.url },
    //   {
    //     onSuccess: (data: any) => {
    //       console.log("DATA", data);
    //       addToast({
    //         kind: "success",
    //         title: "Your record was successfully created",
    //         delay: 5000,
    //       });
    //       props.onCancel(); //removes modal
    //     },
    //     onError: (error: any) => {
    //       console.log("ERROR", error);
    //       const message =
    //         error.data && error.data.message
    //           ? error.data.message
    //           : `The server returned an error of status ${error.status}`;
    //       setState({ ...state, errorText: message });
    //     },
    //   }
    // );
  };

  const handleClickSave = async () => {
    const validationError = await validateUrl(state.url);
    setState({ ...state, errorText: validationError });
    if (!validationError) {
      handleSave();
    }
  };

  const confirmButton = (
    <OutlinedButton onClick={handleClickSave}>
      {/* {isLoadingCreateScrapedItem ? <ButtonLoading /> : "Save"} */}
    </OutlinedButton>
  );

  const title = "EDIT A MENU";

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
            key="url"
            label="Source Url"
            name="url"
            id="url"
            value={url}
            onChange={event => handleChangeInput(event, "url")}
            variant="filled"
            required={true}
            error={Boolean(state.errorText)}
            helperText={state.errorText}
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
