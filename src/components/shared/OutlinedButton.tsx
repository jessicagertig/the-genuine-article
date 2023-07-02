import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/system";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface CustomOutlinedButtonProps extends ButtonProps {
  onClick: (event: React.SyntheticEvent) => void;
  hasEndIcon?: boolean;
  hasStartIcon?: boolean;
  styles?: Object;
  iconType?: string;
  buttonSize?: "small" | "medium" | "large";
}

const OutlinedButton: React.FC<CustomOutlinedButtonProps> = props => {
  const { hasEndIcon, hasStartIcon, styles, iconType, buttonSize } = props;

  const defaultStyles = {
    width: "100%",
    fontWeight: "bold",
    border: "2px solid",
    margin: "4px",
  };

  const finalStyles = styles
    ? Object.assign(defaultStyles, styles)
    : defaultStyles;

  const CustomOutlinedButton = styled(Button)(() => finalStyles);

  const icon =
    iconType === "image" ? (
      <ImageOutlinedIcon />
    ) : iconType === "upload" ? (
      <FileUploadOutlinedIcon />
    ) : iconType === "add" ? (
      <AddIcon />
    ) : iconType === "back" ? (
      <ArrowBackIcon />
    ) : null;

  return (
    <CustomOutlinedButton
      variant="outlined"
      color="primary"
      onClick={props.onClick}
      size={buttonSize ? buttonSize : "medium"}
      endIcon={hasEndIcon ? icon : null}
      startIcon={hasStartIcon ? icon : null}
    >
      {props.children}
    </CustomOutlinedButton>
  );
};

export default OutlinedButton;
