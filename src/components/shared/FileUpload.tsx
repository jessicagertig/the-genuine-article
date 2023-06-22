import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FileUploadIcon from "@mui/icons-material/FileUploadOutlined";
import { styled } from "@mui/system";

interface FileUploadProps {}

const FileUpload = (props: FileUploadProps) => {
  return (
    <TextField
      variant="standard"
      type="text"
      InputProps={{
        endAdornment: (
          <IconButton component="label">
            <FileUploadIcon />
            <Input
              sx={{ display: "none" }}
              type="file"
              hidden
              // onChange={handleUpload}
              name="[licenseFile]"
            />
          </IconButton>
        ),
      }}
    />
  );
};

export default FileUpload;
