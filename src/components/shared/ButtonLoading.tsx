import React from "react";
import styled from "@emotion/styled";
import { css, Keyframes, keyframes, Theme } from "@emotion/react";

const LoadingAnimation: React.FC = () => {
  const fadeInOut: Keyframes = keyframes`
    0% { opacity: 0; }
    10%, 90% { opacity: 1; }
    100% { opacity: 0; }
  `;

  return (
    <Styled.AnimationContainer fade={fadeInOut}>
      <div>.</div>
      <div>.</div>
      <div>.</div>
    </Styled.AnimationContainer>
  );
};

export default LoadingAnimation;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.AnimationContainer = styled.div(
  ({ theme, fade }: { theme: Theme; fade: Keyframes }) => {
    const t = theme;
    return css`
      label: Animation_Container;
      display: flex;
      justify-content: center;

      div {
        font-size: 1.33rem;
        line-height: 1.25rem;
        font-weight: bold;
        width: 0.66rem;
        height: 1rem;
        opacity: 0;
        ${[t.mb(2)]}
      }

      & > *:nth-child(1) {
        animation: ${fade} 1.5s linear infinite;
        animation-delay: 0s;
      }

      & > *:nth-child(2) {
        animation: ${fade} 1.5s linear infinite;
        animation-delay: 0.3s;
      }

      & > *:nth-child(3) {
        animation: ${fade} 1.5s linear infinite;
        animation-delay: 0.6s;
      }
    `;
  }
);
