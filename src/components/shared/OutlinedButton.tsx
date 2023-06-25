import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/system";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

interface CustomOutlinedButtonProps extends ButtonProps {
  onClick: (event: React.MouseEvent | React.FormEvent) => void;
  hasEndIcon?: boolean;
  styles?: Object;
  iconType?: string;
  buttonSize?: "small" | "medium" | "large";
}

const OutlinedButton: React.FC<CustomOutlinedButtonProps> = props => {
  const { hasEndIcon, styles, iconType, buttonSize } = props;

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
    ) : null;

  return (
    <CustomOutlinedButton
      variant="outlined"
      color="primary"
      onClick={props.onClick}
      size={buttonSize ? buttonSize : "medium"}
      endIcon={hasEndIcon ? icon : null}
    >
      {props.children}
    </CustomOutlinedButton>
  );
};

export default OutlinedButton;
