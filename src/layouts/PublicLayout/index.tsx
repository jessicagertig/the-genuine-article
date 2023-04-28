import React from 'react';
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import NavBar from 'components/shared/PublicNavBar';
import Footer from 'components/shared/Footer';

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
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
});