import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <Styled.FooterContainer>
      <div>
        <p>Add image here</p>
      </div>
      <div>
        <p>Add links here</p>
      </div>
    </Styled.FooterContainer>
  );
};

export default Footer;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.FooterContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: FooterContainer;
    ${t.pt(6)}
    height: 550px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: rgba(251, 233, 239, 0.28);
  `;
});

// when image is added use media query to set its display to none when smaller screen
