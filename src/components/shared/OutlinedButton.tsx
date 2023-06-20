import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/system";

const CustomOutlinedButton = styled(Button)(() => ({
  width: "100%",
  fontWeight: "bold",
  border: "2px solid",
  margin: "4px",
}));

interface CustomOutlinedButtonProps extends ButtonProps {
  onClick: (event: React.MouseEvent | React.FormEvent) => void;
}

const OutlinedButton: React.FC<CustomOutlinedButtonProps> = props => {
  return (
    <CustomOutlinedButton variant="outlined" color="primary" onClick={props.onClick}>
      {props.children}
    </CustomOutlinedButton>
  );
};

export default OutlinedButton;
