import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import IconButton from "@mui/material/IconButton";
import NorthWestOutlinedIcon from '@mui/icons-material/NorthWestOutlined';

interface CloseUpInfoIconButtonProps {
  verySmallScreen: boolean;
  handleClickInfo: () => void;
};

const CloseUpInfoIconButton: React.FC<CloseUpInfoIconButtonProps> = (props) => {
  const { verySmallScreen, handleClickInfo } = props;
  return (
    <Styled.SolidIconButtonContainer
    style={{
      alignItems: "flex-end",
      top: verySmallScreen ? "-4px" : "4px",
    }}
  >
    <IconButton
      sx={{
        color: "inherit",
        height: "28px",
        width: "28px",
        marginLeft: "-0.4rem",
        marginBottom: "-0.5rem",
        opacity: 0.5,
        "&:hover": {
          opacity: 1,
          transform: "scale(1.05)",
          transition: "all 0.2s",
          backgroundColor: "white",
        },
      }}
      onClick={handleClickInfo}
    >
      <NorthWestOutlinedIcon/>
    </IconButton>
  </Styled.SolidIconButtonContainer>
  );
};

export default CloseUpInfoIconButton;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.SolidIconButtonContainer = styled.div(() => {
  return css`
    label: Garment_InfoIconButton;
    display: flex;
    height: 24px;
    width: 24px;
    align-items: flex-end;

    &:hover {
      cursor: pointer;
    }
  `;
});