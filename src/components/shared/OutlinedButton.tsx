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
  color?: "secondary" | "warning" | "error";
}

const OutlinedButton: React.FC<CustomOutlinedButtonProps> = props => {
  const { hasEndIcon, hasStartIcon, styles, iconType, buttonSize, color, disabled } = props;

  const defaultStyles = {
    width: "100%",
    fontWeight: "bold",
    margin: "4px",
    "&.MuiButton-outlined": {
      border: `2px solid`,
    },
    "&:hover.MuiButton-outlined": {
      border: `2px solid`,
    },
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
      color={color ? color : "primary"}
      onClick={props.onClick}
      size={buttonSize ? buttonSize : "medium"}
      endIcon={hasEndIcon ? icon : null}
      startIcon={hasStartIcon ? icon : null}
      disabled={disabled}
    >
      {props.children}
    </CustomOutlinedButton>
  );
};

export default OutlinedButton;
