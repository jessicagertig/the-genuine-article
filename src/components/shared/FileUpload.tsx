import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FileUploadIcon from "@mui/icons-material/FileUploadOutlined";
import { styled } from "@mui/system";

interface FileUploadProps {
  handleChangeInput: (event: React.BaseSyntheticEvent) => void;
  fileName: string | undefined;
}

const FileUpload = (props: FileUploadProps) => {
  console.log("FileUploadProps", props)
  
  const { handleChangeInput } = props;

  return (
    <>
      <p>Attach Image</p>
      <IconButton component="label">
        <FileUploadIcon />
        <Input
          sx={{ display: "none" }}
          type="file"
          hidden
          onChange={(event) => handleChangeInput(event)}
          name="mainImageUpload"
        />
      </IconButton>
    </>
  );
};

export default FileUpload;
