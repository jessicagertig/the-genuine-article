import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <Styled.PageContainer>
      {children}
    </Styled.PageContainer>
  );
};

export default PublicLayout;

// Styled Components
// =======================================================

let Styled: any;
Styled = {};

Styled.PageContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: PublicPageContainer;
    width: 100%;
    height: 100%;
    display: block;
    overflow: hidden;
  `;
});
