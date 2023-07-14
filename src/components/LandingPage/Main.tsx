import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const imageUrl = `${process.env.REACT_APP_S3_BASE_URL}Gallery_Images/blueRoseDress1800.jpeg`;

  return (
    <Styled.HomeContainer>
      <Styled.BackgroundContainer>
        <Styled.Image src={imageUrl}>
        </Styled.Image>
      </Styled.BackgroundContainer>
      <Styled.ContentContainer>
        <Styled.HeaderText>
          <h3>A Digital Collection</h3>
        </Styled.HeaderText>
        <Styled.TextContainer>
          <span>of</span>
          <p>
          Genuine articles of clothing from the 19th century.
          </p>
        </Styled.TextContainer>
      </Styled.ContentContainer>
      <Styled.ButtonContainer>
      </Styled.ButtonContainer>
    </Styled.HomeContainer>
  );
};

export default Main;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.HomeContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: HomeContainer;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    z-index: 1;

    ${t.mq.md} {
      height: calc(100vh - 90px);
    }

    ${t.mq.xl} {
      height: calc(100vh - 125px);
    }
  `;
});

Styled.BackgroundContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: BackgroundContainer;
    height: 100%;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;

    ${t.mq.md} {
    }

    ${t.mq.xl} {
    }
  `;
});

Styled.Image = styled.span((props: any) => {
  return css`
    background-image: url(${props.src});
    background-attachment: fixed;
    background-position: center top;
    background-size: cover;
    display: block;
    height: 100%;
    width: 100%;
  `;
});

Styled.ContentContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: HomeHeaderTextContainer;
    z-index: 2;
    position: relative;
    width: 100%;
    display: block;

    &:first-child {
      marging-top: 76px;
    }

    ${t.mq.md} {
    }
  `;
});

Styled.HeaderText = styled.div(props => {
  const t = props.theme;
  return css`
  h3 {
    font-family: "bellota text";
    color: #172a4f;
    font-size: 1.75rem;
  }
  `
})

Styled.TextContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: TextContainer;

    ${t.mq.md} {
    }

    p {
      font-family: "bellota text";
      font-size: 1rem;
      color: white;
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
