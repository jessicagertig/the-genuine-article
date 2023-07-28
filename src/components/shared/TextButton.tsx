import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/system";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";

interface CustomTextButtonProps extends ButtonProps {
  onClick?: (event: React.MouseEvent | React.FormEvent) => void;
  hasEndIcon?: boolean;
  styles?: Object;
  iconType?: string;
}

const TextButton: React.FC<CustomTextButtonProps> = props => {
  const { hasEndIcon, iconType, styles } = props;

  const defaultStyles = { width: "100%", fontWeight: "bold" };

  const finalStyles = styles
    ? Object.assign(defaultStyles, styles)
    : defaultStyles;

  const CustomTextButton = styled(Button)(() => finalStyles);

  const icon =
    iconType === "image" ? (
      <ImageOutlinedIcon />
    ) : iconType === "upload" ? (
      <FileUploadOutlinedIcon />
    ) : iconType === "externalLink" ? (
      <OpenInNewOutlinedIcon />
    ) : null;

  return (
    <CustomTextButton
      variant="text"
      color="primary"
      onClick={props.onClick}
      endIcon={hasEndIcon ? icon : null}
    >
      {props.children}
    </CustomTextButton>
  );
};

export default TextButton;
