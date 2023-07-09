import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface HomeHeaderProps {}

const HomeHeader: React.FC<HomeHeaderProps> = () => {
  const imageUrls = [
    `${process.env.REACT_APP_S3_BASE_URL}Gallery_Images/greenMetSquare.jpg`,
    `${process.env.REACT_APP_S3_BASE_URL}Gallery_Images/BlueWorth1870sSquare.jpg`,
    `${process.env.REACT_APP_S3_BASE_URL}Gallery_Images/pinkSqaure.jpg`,
    `${process.env.REACT_APP_S3_BASE_URL}Gallery_Images/silkDamask1840sSquare.jpg`,
    `${process.env.REACT_APP_S3_BASE_URL}Gallery_Images/peach1820sSquare.jpg`,
    `${process.env.REACT_APP_S3_BASE_URL}Gallery_Images/purpleandjet.jpg`,
  ]

  return (
    <Styled.HomeHeaderContainer>
      <Styled.HeaderTextContainer>
      </Styled.HeaderTextContainer>
      <Styled.ImageGridContainer>
      {imageUrls.map((image) => (
        <Styled.ImageItem key={image} src={image} />
      ))}
      </Styled.ImageGridContainer>
    </Styled.HomeHeaderContainer>
  );
};

export default HomeHeader;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.HomeHeaderContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: HomeHeaderContainer;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 300px;
    background-color: ${t.color.blue_gray[100]};

    ${t.mq.lg} {
      height: 496px;
    }
  `;
});

Styled.HeaderTextContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: HomeHeaderTextContainer;
    display: flex;
    flex-direction: column;
    width: 100%;

    ${t.mq.lg} {
      width: 40%;
    }
  
    ${t.mq.xl} {
      max-width: calc(248px * 3);
    }
  `;
});

Styled.ImageGridContainer = styled.div(props => {
  const t = props.theme;
  return css`
  display: none;
  width: 0%;
  max-width: 0;

  ${t.mq.lg} {
    display: flex;
    flex-wrap: wrap;
    width: 60%;
    max-width: calc(248px * 2);
    max-height: calc(248px * 2);
  }

  ${t.mq.xl} {
    max-width: calc(248px * 3);
  }
  `;
});

Styled.ImageItem = styled.img(props => {
  const t = props.theme;
  return css`
    max-width: 248px;
    max-height: 248px;
    flex: 1 0 auto;

    ${t.mq.md} {
      &:nth-child(3), &:nth-child(6) {
        display: none;
      }
    }
    
    ${t.mq.xl} {
      max-width: 248px;
      max-height: 248px;
      &:nth-child(3), &:nth-child(6) {
        display: block;
      }
    }
  `;
});
