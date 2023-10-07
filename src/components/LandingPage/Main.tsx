import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Bounce from "src/components/shared/Bounce";

interface MainProps {
  windowHeight: number;
}

const Main: React.ForwardRefRenderFunction<HTMLDivElement, MainProps> = (
  { windowHeight },
  scrollRef
) => {
  const imageUrl = `${process.env.REACT_APP_S3_BASE_URL}Gallery_Images/blueRoseDress1800.jpeg`;

  const handleClickScrollTeaser = () => {
    if (scrollRef !== null && typeof scrollRef === "object") {
      scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Styled.HomeContainer height={windowHeight}>
      <Styled.BackgroundContainer>
        <Styled.Image src={imageUrl}>
          <img
            src={imageUrl}
            alt="background of floral brocaded fabric with red and pink roses on a blue base"
          />
        </Styled.Image>
      </Styled.BackgroundContainer>
      <Styled.ContentContainer>
        <Styled.HeaderText>
          <h3>A Digital Collection</h3>
        </Styled.HeaderText>
        <Styled.TextContainer>
          <span>of</span>
          <p>Genuine articles of clothing from the 19th century</p>
        </Styled.TextContainer>
      </Styled.ContentContainer>
      <Styled.ButtonContainer data-testid="scroll-down-teaser-button" onClick={handleClickScrollTeaser}>
        <Bounce />
      </Styled.ButtonContainer>
    </Styled.HomeContainer>
  );
};

export default forwardRef(Main);

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.HomeContainer = styled.div((props: any) => {
  const t = props.theme;
  const heightInVh = props.height / (props.height * 0.01);
  return css`
    label: HomeContainer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(${heightInVh}vh - 50px);
    width: 100%;
    position: relative;
    z-index: 1;

    ${t.mq.md} {
      height: max(calc(${heightInVh}vh - 90px), 630px);
      min-height: 630px;
    }
  `;
});

Styled.BackgroundContainer = styled.div(() => {
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

Styled.Image = styled.div((props: any) => {
  return css`
    background-image: url(${props.src});
    background-attachment: fixed;
    background-position: center top;
    background-size: cover;
    display: block;
    height: 100%;
    width: 100%;

    img {
      display: none;
    }
  `;
});

Styled.ContentContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: HomeHeaderTextContainer;
    ${[t.pt(8), t.pb(10), t.mb(28)]}
    display: block;
    z-index: 2;
    position: relative;
    width: 100%;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);

    ${t.mq.xs} {
      ${t.mb(20)}
    }
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
  `;
});

Styled.TextContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: TextContainer;
    color: white;

    ${t.mq.md} {
    }

    span {
      font-family: serif;
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
    bottom: 64px;
    position: absolute;
    z-index: 2;
    width: 75px;
    height: 75px;

    &:hover {
      cursor: pointer;
    }

    ${t.mq.xs} {
      bottom: 40px;
    }
  `;
});
