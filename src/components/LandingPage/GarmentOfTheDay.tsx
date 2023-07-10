import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface HomeContentProps {}

const HomeContent: React.FC<HomeContentProps> = () => {

  return (
    <Styled.HomeContentContainer>
      <Styled.ContentTitleContainer>
        <h2>Garment of the Day</h2>
      </Styled.ContentTitleContainer>
    </Styled.HomeContentContainer>
  );
};

export default HomeContent;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.HomeContentContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: HomeContentContainer;
    display: flex;
    width: 100%;
    min-height: 1000px;
  `;
});

// Styled.HeaderTextContainer = styled.div(props => {
//   const t = props.theme;
//   return css`
//     label: HomeContentTextContainer;
//     display: flex;
//     flex-direction: column;
//     width: 100%;

//     ${t.mq.lg} {
//       width: 40%;
//     }
  
//     ${t.mq.xl} {
//       max-width: calc(248px * 3);
//       width: 34%;
//     }
//   `;
// });

Styled.ContentTitleContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: HomeContentContainer;
    display: flex;
    width: 100%;
    justify-content: center;

    h2 {
      ${[t.pt(24)]}
      font-family: "bellota text";
      font-size: 36px;
      color: #172a4f;
    }
  `;
});