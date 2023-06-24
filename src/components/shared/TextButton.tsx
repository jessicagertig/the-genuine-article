import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/system";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

const CustomTextButton = styled(Button)(() => ({
  width: "100%",
  fontWeight: "bold",
}));

interface CustomTextButtonProps extends ButtonProps {
  onClick: (event: React.MouseEvent | React.FormEvent) => void;
  hasEndIcon?: boolean;
}

const TextButton: React.FC<CustomTextButtonProps> = props => {
  const { hasEndIcon } = props
  return (
    <CustomTextButton variant="text" color="primary" onClick={props.onClick} endIcon={hasEndIcon ? <ImageOutlinedIcon/> : null}>
      {props.children}
    </CustomTextButton>
  );
};

export default TextButton;