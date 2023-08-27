import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Loading from "src/components/shared/Loading";

interface LoadingStateProps {};

const LoadingState: React.FC<LoadingStateProps> = (props) => {

  return (
    <Styled.Container>
      <Styled.LoadingContainer>
        <h2>Loading...</h2>
        <Loading />
      </Styled.LoadingContainer>
    </Styled.Container>
  );
};

export default LoadingState;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.Container = styled.div(props => {
  const t = props.theme;
  return css`
    label: LoadingState_Container;
    ${t.m(2)}
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: white;
  `;
});

Styled.LoadingContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: LoadingContainer;
    ${t.mb(10)}
    width: 50%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;

    h2 {
      font-family: "bellota text";
      font-size: 1.25rem;
      color: #172a4f;
      ${t.m(4)}
    }
  `;
});
