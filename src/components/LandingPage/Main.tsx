import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Bounce from "src/components/shared/Bounce";

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
          Genuine articles of clothing from the 19th century
          </p>
        </Styled.TextContainer>
      </Styled.ContentContainer>
      <Styled.ButtonContainer>
        <Bounce />
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
    justify-content: center;
    align-items: center;
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    z-index: 1;

    ${t.mq.md} {
      height: calc(100vh - 90px);
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
    ${[t.pt(8), t.pb(10), t.mb(20)]}
    display: block;
    z-index: 2;
    position: relative;
    width: 100%;
    text-align: center;
    background-color: rgba(0,0,0,.5);
  `;
});

Styled.HeaderText = styled.div(props => {
  const t = props.theme;
  return css`

  ${[t.py(4)]}

  h3 {
    font-family: "bellota text";
    color: white;
    font-size: 1.75rem;
    width: 100%;
    text-align: center;
    text-transform: uppercase;

    ${t.mq.sm} {
      font-size: 2rem;
    }
  }
  `
})

Styled.TextContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: TextContainer;
    color: white;
    
    ${t.mq.md} {
    }
    
    span {
      font-family: "goudy";
      font-style: italic;
      font-size: 1.75rem;
      line-height: 2.25rem;
      padding-top: 8px;
      padding-bottom: 16px;
    }
    
    p {
      font-family: "bellota text";
      font-size: 1.25rem;
      padding-top: 8px;
      padding-bottom: 8px;
    }
  `;
});

Styled.ButtonContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: ButtonContainer;
    display: block;
    bottom: 39px;
    position: absolute;
    z-index: 2;
    width: 75px;
    height: 75px;
  `;
});