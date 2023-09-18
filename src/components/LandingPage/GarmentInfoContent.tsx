import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Link } from "react-router-dom";
import { SpringValue, animated } from "@react-spring/web";
import IconButton from "@mui/material/IconButton";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";

import CloseUpInfoIconButton from "src/components/LandingPage/CloseUpInfoIconButton";
import CloseDownInfoIconButton from "src/components/LandingPage/CloseDownInfoIconButton";
import { GarmentData } from "src/types";

type Trail = {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
    color: SpringValue<string>;
}[]

interface GarmentInfoContentProps {
  spaceBelow: boolean;
  garment: GarmentData;
  verySmallScreen: boolean;
  trail: Trail;
  handleClickInfo: () => void;
};

const GarmentInfoContent: React.FC<GarmentInfoContentProps> = (props) => {

  const { spaceBelow, garment, verySmallScreen, trail, handleClickInfo } = props;

  return (
    <>
      {trail.map((props, index) => (
        <animated.div key={index} style={{ ...props, width: "100%" }}>
          {index === 0 && (
            <>
              {spaceBelow ? (
                <CloseUpInfoIconButton
                  handleClickInfo={handleClickInfo}
                  verySmallScreen={verySmallScreen}
                />
              ) : null}
            </>
          )}
          {index === 1 && (
            <Styled.HeaderContainer
              style={{ marginTop: `${spaceBelow ? "0rem" : "1rem"}` }}
            >
              <Styled.InfoTitleContainer>
                <Styled.InfoTitle>{garment?.garmentTitle}</Styled.InfoTitle>
              </Styled.InfoTitleContainer>
              <Styled.IconButtonContainer>
                <Link to={`/garments/${garment?.id}`} target="_blank">
                  <IconButton
                    sx={{
                      color: "inherit",
                      height: "36px",
                      width: "36px",
                      "&:hover": {
                        bgcolor: "rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <OpenInNewOutlinedIcon
                      fontSize={verySmallScreen ? "small" : "medium"}
                    />
                  </IconButton>
                </Link>
              </Styled.IconButtonContainer>
            </Styled.HeaderContainer>
          )}
          {index === 2 && (
            <Styled.InfoItem>
              <p>c. {garment?.beginYear}</p>
              <p>
                <span>{garment?.cultureCountry}</span>
              </p>
            </Styled.InfoItem>
          )}
          {index === 3 && (
            <>
              {!spaceBelow ? (
                <CloseDownInfoIconButton
                  handleClickInfo={handleClickInfo}
                  verySmallScreen={verySmallScreen}
                />
              ) : null}
            </>
          )}
        </animated.div>
      ))}
    </>
  );
};

export default GarmentInfoContent;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.HeaderContainer = styled.div`
  label: Garment_InfoHeaderContainer;
  width: 100%;
`;

Styled.InfoTitleContainer = styled.div(() => {
  return css`
    label: Garment_InfoHeader;
    display: flex;
    justify-content: flex-start;
    width: 80%;
  `;
});

Styled.InfoTitle = styled.h2((props: any) => {
  const t = props.theme;
  return css`
    label: Garment_InfoTitle;
    ${[t.pt(3), t.pb(1)]}
    font-family: "Sorts Mill Goudy";
    color: inherit;
    font-size: 1.275rem;
    line-height: 1.66rem;
    letter-spacing: 0.05rem;
    display: inline-flex;

    ${t.mq.xs} {
      font-size: 1.375rem;
      line-height: 1.75rem;
      letter-spacing: 0.05rem;
    }

    ${t.mq.sm} {
      font-size: 1.5rem;
      line-height: 2rem;
      letter-spacing: 0.05rem;
    }
  `;
});

Styled.IconButtonContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: Garment_InfoIconButton;
    display: flex;
    justify-content: flex-end;
    width: 20%;
    margin-top: 0.25rem;

    ${t.mq.md} {
      margin-top: 0.5rem;
    }

    &:hover {
      cursor: pointer;
    }
  `;
});

Styled.InfoItem = styled.div((props: any) => {
  const t = props.theme;
  return css`
    label: Garment_InfoItem;
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-family: "bellota text";

    ${t.mq.xs} {
      font-size: 0.9rem;
      line-height: 1.3rem;
    }

    ${t.mq.sm} {
      font-size: 1rem;
      line-height: 1.375rem;
    }

    p {
      ${[t.pr(2)]}
      margin-top: -4px;
      color: inherit;

      span {
        font-style: italic;
      }
    }
  `;
});