import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import NavBar from "src/components/shared/NavBar";
import Footer from "src/components/shared/Footer";

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <Styled.PageContainer>
      <NavBar backgroundColor="white" />
      {children}
      <Footer />
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
    label: LandingPageContainer;
    width: 100%;
    height: 100%;
    display: block;
    overflow-y: scroll;
  `;
});
