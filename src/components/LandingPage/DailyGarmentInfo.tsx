import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Link } from "react-router-dom";
import { SpringValue, animated } from "@react-spring/web";
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
  maxHeight: number;
};

const DailyGarmentInfo: React.FC<DailyGarmentInfoProps> = (props) => {

  const { garment, trail, maxHeight } = props;

  return (
    <>
      {trail.map((props, index) => (
        <animated.div key={index} style={{ ...props, width: "100%" }}>
          {index === 0 && (
            <Divider color="#020b1c"/>
          )}
          {index === 1 && (
            <Styled.InfoTitleContainer>
              <Styled.InfoTitle height={maxHeight}>{garment?.garmentTitle}</Styled.InfoTitle>
            </Styled.InfoTitleContainer>
          )}
          {index === 2 && (
            <Styled.InfoDetails height={maxHeight}>
              <p>c. {garment?.beginYear}</p>
              <p>
                <span>{garment?.cultureCountry}</span>
              </p>
            </Styled.InfoDetails>
          )}
          {index === 3 && (
            <Link to={`/garments/${garment?.id}`} target="_blank">
              <Styled.Button role="button" height={maxHeight}>
                <span>Learn more</span>
                <div className="line"></div>
                <ArrowForwardIcon/>
              </Styled.Button>
            </Link>
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
  const shortScreen = props.height <= 800;
  return css`
    label: DailyGarmentInfo_InfoTitle;
    ${[t.pt(4), t.pl(2)]}
    font-family: "Sorts Mill Goudy";
    color: inherit;
    font-size: 1.75rem;
    line-height: 2.5rem;
    letter-spacing: 0.01rem;
    display: inline-flex;
    margin-bottom: -1rem;

    ${t.mq.md} {
      font-size: ${shortScreen ? "1.75rem" : "2.25rem"};
      line-height: ${shortScreen ? "2.5rem" : "3rem"};
      padding-top: ${shortScreen ? "16px" : "24px"};
      ${[t.pl(2)]}
    }

    ${t.mq.xl} {
      font-size: 2.25rem;
      line-height: 3rem;
      ${[t.pt(6)]};
    }
  `;
});

Styled.Button = styled.div((props: any) => {
  const t = props.theme;
  const shortScreen = props.height <= 800;
  return css`
    label: DailyGarmentInfo_LearnMoreButton;
    display: flex;
    justify-content: center;
    align-items: center;
    ${[t.pb(4), t.pl(2)]};

    .line {
      width: 10px;
      height: 2px;
      background-color: #020b1c;
      ${t.ml(2)};
      transition: all 0.3s ease-in-out;
    }

    &:hover .line {
      width: 22px;
      transition: all 0.3s ease-in-out;
    }

    &:hover {
      cursor: pointer;
    }

    svg {
      margin-left: -4px;
    }

    ${t.mq.md} {
      padding-bottom: ${shortScreen ? "16px" : "24px"};
      ${[t.pl(2)]};
    }

    ${t.mq.xl} {
      ${[t.pb(6)]};
    }

    span {
      font-family: "Sorts Mill Goudy";
      color: inherit;
      font-size: 1.375rem;
      line-height: 2rem;
      letter-spacing: 0.01rem;

      ${t.mq.md} {
        font-size: ${shortScreen ? "1.375rem" : "1.5rem"};
        line-height: ${shortScreen ? "1.5rem" : "2rem"};
      }

      ${t.mq.xl} {
        font-size: 1.5rem;
        line-height: 2rem;
      }
    }
  `
})

Styled.InfoDetails = styled.div((props: any) => {
  const t = props.theme;
  const shortScreen = props.height <= 800;
  return css`
    label: DailyGarmentInfo_InfoDetails;
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 1rem;
    line-height: 1.25rem;
    font-family: "bellota text";
    ${[t.pl(2), t.pt(2), t.pb(4)]};

    ${t.mq.md} {
      font-size: 1rem;
      padding-bottom: ${shortScreen ? "16px" : "24px"};
      padding-top: ${shortScreen ? "8px" : "16px"};
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