import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Link } from "react-router-dom";
import { SpringValue, animated } from "@react-spring/web";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Divider from "src/components/shared/Divider";
import { GarmentData } from "src/types";

type Trail = {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
    color: SpringValue<string>;
}[]

interface DailyGarmentInfoProps {
  garment: GarmentData;
  trail: Trail;
  isIntersecting?: boolean | undefined;
};

const DailyGarmentInfo: React.FC<DailyGarmentInfoProps> = (props) => {

  const { garment, trail, isIntersecting } = props;

  return (
    <>
      {trail.map((props, index) => (
        <animated.div key={index} style={{ ...props, width: "100%" }}>
          {index === 0 && (
            <Divider color="#020b1c"/>
          )}
          {index === 1 && (
            <Styled.InfoTitleContainer>
              <Styled.InfoTitle>{garment?.garmentTitle}</Styled.InfoTitle>
            </Styled.InfoTitleContainer>
          )}
          {index === 2 && (
            <Styled.InfoDetails>
              <p>c. {garment?.beginYear}</p>
              <p>
                <span>{garment?.cultureCountry}</span>
              </p>
            </Styled.InfoDetails>
          )}
          {index === 3 && (
            <Styled.Button aria-role="button">
              <span>Learn more</span>
              <ArrowForwardIcon/>
            </Styled.Button>
          )}
          {index === 4 && (
            <>
              <Divider color="#020b1c"/>
            </>
          )}
        </animated.div>
      ))}
    </>
  );
};

export default DailyGarmentInfo;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.InfoTitleContainer = styled.div(() => {
  return css`
    label: DailyGarmentInfo_InfoTitleContainer;
    display: flex;
    justify-content: flex-start;
    width: 100%;
  `;
});

Styled.InfoTitle = styled.h2((props: any) => {
  const t = props.theme;
  return css`
    label: DailyGarmentInfo_InfoTitle;
    ${[t.pt(8), t.pl(2)]}
    font-family: "Sorts Mill Goudy";
    color: inherit;
    font-size: 2rem;
    line-height: 3.25rem;
    letter-spacing: 0.01rem;
    display: inline-flex;
    margin-bottom: -1rem;

    ${t.mq.xxs} {
      font-size: 2.25rem;
    }

    ${t.mq.sm} {
      font-size: 2.625rem;
    }
  `;
});

Styled.Button = styled.div((props) => {
  const t = props.theme;
  return css`
    label: DailyGarmentInfo_LearnMoreButton;
    display: flex;
    justify-content: center;
    align-items: center;
    ${[t.pb(6), t.pl(2)]};

    span {
      font-family: "Sorts Mill Goudy";
      color: inherit;
      font-size: 1.375rem;
      line-height: 2.25rem;
      letter-spacing: 0.01rem;

      ${t.mq.xxs} {
        font-size: 1.5rem;
      }
  
      ${t.mq.sm} {
        font-size: 1.75rem;
      }
    }
  `
})

Styled.InfoDetails = styled.div((props: any) => {
  const t = props.theme;
  return css`
    label: DailyGarmentInfo_InfoDetails;
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-family: "bellota text";
    ${[t.pl(2), t.pt(4), t.pb(6)]};

    ${t.mq.sm} {
      font-size: 1rem;
      line-height: 1.375rem;
    }

    &:nth-child(2) {
      margin-top: -4px;
    }

    p {
      color: inherit;
      
      span {
        font-style: italic;
      }
    }
  `;
});