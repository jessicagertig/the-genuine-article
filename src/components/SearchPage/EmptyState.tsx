import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface EmptyStateProps {};

const EmptyState: React.FC<EmptyStateProps> = (props) => {

  return (
    <Styled.Container>
    </Styled.Container>
  );
};

export default EmptyState;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.Container = styled.div(props => {
  const t = props.theme;
  return css`
    label: EmptyState_Container;
    ${t.m(2)}
    height: calc(100vh - 136px)
    width: 100%;
    display: flex;
    justify-content: center;

    ${t.mq.md} {
      height: calc(100vh - 178px)
    }

    ${t.mq.gmd} {
      height: calc(100vh - 248px)
    }

    ${t.mq.glg} {
      height: calc(100vh - 313px)
    }
  `;
});

Styled.EmptyState = styled.div(props => {
  const t = props.theme;
  return css`
    label: EmptyState;
    height: 80%;
    max-height: 500px;
    max-width: 500px;
    width: 80%;
    margin-right: 10%;
    margin-left: 10%;
    display: flex;
    justify-content: center;
    border: 1px solid rgb(211, 217, 229);
    border-radius: 0.5rem;
  `;
});

Styled.Text = styled.div`
  font-family: "bellota text, sans-serif";
  font-size: 24px;
  font-weight: 700;
  color: #223F7C;
  text-align: center;
`
// search bar
// 223 above glg
// 158 abpve gmd
// 88 - base
// nav bar
// 90 - above md
// 48 -  base