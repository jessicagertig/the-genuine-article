import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from "@mui/material/TextField";

import { StyledTextField, StyledAutocomplete } from "src/components/AdminPage/StyledFields";
import DialogModal from "src/components/shared/DialogModal";
import OutlinedButton from "src/components/shared/OutlinedButton";

import { useModalContext } from "src/context/ModalContext";

import { useCreateScrapedItem } from "src/queryHooks/useGarments";

interface AddByUrlModalProps {
  onCancel: () => void;
  onConfirm?: () => void;
}

const AddByUrlModal: React.FC<AddByUrlModalProps> = (props) => {
  console.log("Image Upload Modal Props", props);
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down('md'))

  const {
    mutate: createScrapedItem,
    error,
    isLoading,
  } = useCreateScrapedItem();

  const { modalOpen } = useModalContext();

  const [state, setState] = React.useState({
    url: "",
    src: "",
  });

  const { url, src } = state;

  const handleChangeInput = (event: React.BaseSyntheticEvent, name: string) => {
    const input = event.target?.value;
    setState({ ...state, [name]: input });
  };

  const handleSingleSelectInputChange = (
    event: React.SyntheticEvent,
    name: string,
    value: any
  ) => {
    console.log("change value", value);
    setState({ ...state, [name]: value })
  };

  const handleConfirm = async () => {
    createScrapedItem(
      { ...state },
      {
        onSuccess: (data: any) => {
          console.log("DATA", data);
        },
        onError: (error: any) => {
          console.log("ERROR", error);
        },
      }
    );
    props.onCancel(); //removes modal
  };

  const confirmButton = (
    <OutlinedButton onClick={handleConfirm}>Submit</OutlinedButton>
  );

  const title = "ADD GARMENT";

  const options = ["MET", "VA", "CAM", "PHILA"]

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
          <StyledAutocomplete
            key="src"
            disablePortal={true}
            id="src"
            options={options}
            // getOptionLabel={(option: unknown) => (option.label}
            renderInput={params => (
              <TextField
                {...params}
                label="Source Museum"
                name="src"
                required={true}
                variant="filled"
                error={error}
              />
            )}
            onInputChange={(event, value) =>
              handleSingleSelectInputChange(event, "src", value)
            }
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
