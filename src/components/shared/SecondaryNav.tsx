import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import OutlinedButton from "src/components/shared/OutlinedButton";

type Props = {
  backPath?: string;
  pageTitle: string;
  pageNumber?: number;
  rowsNumber?: number;
  publicPage?: boolean;
};

const SecondaryNav = (props: Props) => {
  const { backPath, pageTitle, pageNumber, rowsNumber, publicPage } = props;
  const navigate = useNavigate();

  const theme = useTheme();
  const mediumScreen = useMediaQuery(theme.breakpoints.down("lg"));

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

  const colorStyle = {
    color: "#172a4f",
    width: "48px",
    height: "48px",
    backgroundColor: "rgba(211, 217, 229, 0.2)",
    "&:hover": {
      backgroundColor: "rgba(211, 217, 229, 0.5)",
    },
  };

  const backIconButton = (
    <IconButton onClick={handleClickBack} sx={colorStyle}>
      <ArrowBackIcon />
    </IconButton>
  );

  const backFullButton = (
    <OutlinedButton
      hasStartIcon={true}
      iconType="back"
      onClick={handleClickBack}
      styles={{
        maxWidth: "100px",
        paddingRight: "8px",
        paddingLeft: "8px",
        "&.MuiButton-outlined": {
          border: `2px solid rgba(34, 63, 124, .5)`,
        },
      }}
    >
      Back
    </OutlinedButton>
  );

  const backButton =
    mediumScreen || publicPage ? backIconButton : backFullButton;

  return (
    <Styled.SecondaryNavContainer>
      <Styled.LeftButtonContainer>
        {backPath ? backButton : null}
      </Styled.LeftButtonContainer>
      <Styled.SecondaryNavHeader public={publicPage}>
        <h2>{pageTitle}</h2>
      </Styled.SecondaryNavHeader>
      <Styled.RightContainer></Styled.RightContainer>
    </Styled.SecondaryNavContainer>
  );
};

export default SecondaryNav;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.SecondaryNavContainer = styled.div((props: any) => {
  const t = props.theme;
  return css`
    label: SecondaryNavContainer;
    ${[t.mb(2), t.mt(4)]}
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

Styled.SecondaryNavHeader = styled.div((props: any) => {
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

      ${t.mq.xl} {
        display: ${props.public ? "none" : "block"};
      }
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

Styled.RightContainer = styled.div(props => {
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
