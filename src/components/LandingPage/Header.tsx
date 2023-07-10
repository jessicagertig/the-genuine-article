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
    `${process.env.REACT_APP_S3_BASE_URL}Gallery_Images/purpleandgoldSquare.jpg`,
  ];

  return (
    <Styled.HomeHeaderContainer>
      <Styled.InfoSectionContainer>
        <Styled.HeaderTextContainer>
          <h3>Genuine articles of clothing from the 19th century.</h3>
        </Styled.HeaderTextContainer>
        <Styled.TextContainer>
          <p>
            Visually delightful, fascinating, and informative - each garment
            displayed here is linked to the collection which houses the item.
          </p>
        </Styled.TextContainer>
        <Styled.ButtonContainer>
        </Styled.ButtonContainer>
      </Styled.InfoSectionContainer>
      <Styled.ImageGridContainer>
        {imageUrls.map(image => (
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
    height: 372px;
    background-color: ${t.color.blue_gray[100]};

    ${t.mq.md} {
      height: calc(248px * 2);
    }

    ${t.mq.lg} {
      height: calc(296px * 2);
    }
  `;
});

Styled.InfoSectionContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: HomeHeaderTextContainer;
    display: flex;
    flex-direction: column;
    width: 94%;
    height: 94%;
    padding: 3%;

    ${t.mq.md} {
      width: 34%;
    }

    ${t.mq.xl} {
      width: 25%;
    }
  `;
});

Styled.HeaderTextContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: HomeHeaderTextContainer;
    height: 31%;
    padding-top: 3%;

    ${t.mq.md} {
      height: 34%;
      padding-top: 0;
    }

    h3 {
      font-family: "bellota text";
      color: #172a4f;
      font-size: 1.75rem;
    }
  `;
});

Styled.TextContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: TextContainer;
    display: flex;
    height: 30%;
    padding-top: 4%;

    ${t.mq.md} {
      display: flex;
      height: 34%;
      padding-top: 0;
    }

    p {
      font-family: "bellota text";
      font-size: 1rem;
      color: #172a4f;
    }
  `;
});

Styled.ButtonContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: ButtonContainer;
    display: flex;
    height: 24%;
    padding-top: 2%;

    ${t.mq.md} {
      height: 26%;
      padding-top: 0;
    }
  `;
});

Styled.ImageGridContainer = styled.div(props => {
  const t = props.theme;
  return css`
    display: none;
    width: 0%;
    max-width: 0;

    ${t.mq.md} {
      display: flex;
      flex-wrap: wrap;
      width: 66%;
      max-width: calc(248px * 2);
      max-height: calc(248px * 2);
    }

    ${t.mq.lg} {
      max-width: calc(296px * 2);
      max-height: calc(296px * 2);
    }

    ${t.mq.xl} {
      width: 75%;
      max-width: calc(296px * 3);
    }
  `;
});

Styled.ImageItem = styled.img(props => {
  const t = props.theme;
  return css`
    max-width: 248px;
    max-height: 248px;

    ${t.mq.md} {
      &:nth-child(3),
      &:nth-child(6) {
        display: none;
      }
    }

    ${t.mq.lg} {
      max-height: 296px;
      max-width: 296px;
    }

    ${t.mq.xl} {
      &:nth-child(3),
      &:nth-child(6) {
        display: block;
      }
    }
  `;
});
