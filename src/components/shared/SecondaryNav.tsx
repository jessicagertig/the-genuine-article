import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import OutlinedButton from "src/components/shared/OutlinedButton";

type Props = {
  backPath?: string;
  toPath?: string;
  toText?: string;
  closePath?: string;
  actions?: React.ReactNode;
  pageTitle: string;
  pageNumber?: number;
  rowsNumber?: number;
};

const SecondaryNav = (props: Props) => {
  const {
    backPath,
    toPath,
    toText,
    closePath,
    actions,
    pageTitle,
    pageNumber,
    rowsNumber,
  } = props;
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickBack = () => {
    if (backPath !== undefined) {
      if (rowsNumber !== undefined) {
        navigate(backPath, {
          state: {
            pageNo: pageNumber,
            rowsNo: rowsNumber,
          },
        });
      } else if (pageNumber !== undefined) {
        navigate(backPath, {
          state: {
            pageNo: pageNumber,
          },
        });
      } else {
        navigate(backPath);
      }
    }
  };

  const handleClickTo = () => {
    if (toPath !== undefined) {
      navigate(toPath);
    }
  };

  const colorStyle = {
    color: "#172a4f",
    "&:hover": {
      backgroundColor: "rgba(211, 217, 229, 0.5)",
    },
  };

  const backIconButton = (
    <IconButton
      onClick={handleClickBack}
      sx={colorStyle}
    >
      <ArrowBackIcon/>
    </IconButton>
  )

  const backFullButton = (
    <OutlinedButton
    hasStartIcon={true}
    iconType="back"
    onClick={handleClickBack}
    styles={{
      maxWidth: "100px",
      paddingRight: "8px",
      paddingLeft: "8px",
    }}
  >
    Back
  </OutlinedButton>
  )

  const backButton = isSmallScreen ? backIconButton : backFullButton;

  return (
    <Styled.SecondaryNavContainer>
      <Styled.LeftButtonContainer>
        {backPath ? backButton : null}
      </Styled.LeftButtonContainer>
      <Styled.SecondaryNavHeader>
        <h2>{pageTitle}</h2>
      </Styled.SecondaryNavHeader>
      <Styled.RightButtonContainer>
        {toText && toPath ? (
          <OutlinedButton
            hasStartIcon={true}
            iconType="add"
            onClick={handleClickTo}
            styles={{
              maxWidth: "100px",
              paddingRight: "8px",
              paddingLeft: "8px",
            }}
          >
            {toText}
          </OutlinedButton>
        ) : null}
      </Styled.RightButtonContainer>
    </Styled.SecondaryNavContainer>
  );
};

export default SecondaryNav;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.SecondaryNavContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: SecondaryNavContainer;
    ${[t.mb(6), t.mt(12)]}
    margin-right: 2%;
    margin-left: 2%;
    width: 96%;
    display: flex;
    height: 48px;

    ${t.mq.xl} {
      margin-right: 6%;
      margin-left: 6%;
      width: 88%;
    }
  `;
});

Styled.SecondaryNavHeader = styled.div(props => {
  const t = props.theme;
  return css`
    label: SecondaryNavHeader;
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;

    ${t.mq.xs} {
      width: 50%;
    }

    ${t.mq.sm} {
      width: 60%;
    }

    h2 {
      font-family: "bellota text";
      font-size: 24px;
      font-weight: 700;
      color: ${t.color.blue[700]};
      text-transform: uppercase;
      text-align: center;
    }
  `;
});

Styled.LeftButtonContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentPageButtonContainer;
    display: flex;
    justify-content: flex-start;
    width: 30%;

    ${t.mq.xs} {
      width: 25%;
    }

    ${t.mq.sm} {
      width: 20%;
    }
  `;
});

Styled.RightButtonContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentPageButtonContainer;
    display: flex;
    justify-content: flex-end;
    width: 30%;

    ${t.mq.xs} {
      width: 25%;
    }

    ${t.mq.sm} {
      width: 20%;
    }
  `;
});
