import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import IconButton from "@mui/material/IconButton";
import SouthWestOutlinedIcon from "@mui/icons-material/SouthWestOutlined";

interface CloseDownInfoIconButtonProps {
  verySmallScreen: boolean;
  handleClickInfo: () => void;
};

const CloseDownInfoIconButton: React.FC<CloseDownInfoIconButtonProps> = (props) => {
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
        height: "40px",
        width: "40px",
        marginBottom: "0.25rem",
        marginLeft: "-0.6rem",
        opacity: 0.6,
        "&:hover": {
          opacity: 1,
          transform: "scale(1.05)",
          transition: "all 0.5s",
        },
      }}
      onClick={handleClickInfo}
    >
      <SouthWestOutlinedIcon/>
    </IconButton>
  </Styled.SolidIconButtonContainer>
  );
};

export default CloseDownInfoIconButton;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.SolidIconButtonContainer = styled.div(() => {
  return css`
    label: Garment_CloseDownInfoIconButton;
    display: flex;
    height: 48px;
    width: 48px;
    position: absolute;
    bottom: 0;
    top: 0.25rem;
    left: 0;

    &:hover {
      cursor: pointer;
    }
  `;
});