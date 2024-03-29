import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import FileUploadIcon from "@mui/icons-material/FileUploadOutlined";

interface FileUploadProps {
  handleChangeInput: (event: React.BaseSyntheticEvent) => void;
  fileName: string | undefined;
  variantType?: "text" | "outlined" | "contained";
}

const FileUpload = (props: FileUploadProps) => {
  console.log("FileUploadProps", props);
  const { variantType } = props;
  const buttonVariant = variantType ? variantType : "text";

  const { handleChangeInput } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <Styled.ButtonContainer>
      <Button variant={buttonVariant} onClick={handleClick}  sx={{fontSize: "1.125rem", fontWeight: "bold" }} endIcon={<FileUploadIcon />}>
        Select File
      </Button>
      <Input
        sx={{ display: "none" }}
        type="file"
        hidden
        inputRef={inputRef}
        onChange={event => handleChangeInput(event)}
        name="mainImageUpload"
      />
    </Styled.ButtonContainer>
  );
};

export default FileUpload;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.ButtonContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: ButtonContainer;
    ${t.p(6)}
    display: flex;
    flex-direction: column;
  `;
});