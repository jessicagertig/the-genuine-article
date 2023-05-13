import React from 'react';
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import NavBar from 'src/components/shared/PublicNavBar';
import Footer from 'src/components/shared/Footer';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <Styled.PageContainer>
      <NavBar />
      {children}
      <Footer />
    </Styled.PageContainer>
  );
}

// Styled Components
// =======================================================

let Styled: any;
Styled = {};

Styled.PageContainer = styled.div((props) => {
  const t = props.theme;
  return css`
    label: LandingPageContainer;
    ${t.pt(6)}
    width: 100%;
    height: 100%;
    display: block;
    overflow-y: scroll;
  `;
});