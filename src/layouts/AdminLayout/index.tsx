import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Footer from "src/components/shared/Footer";
import NavBar from "src/components/shared/NavBar";

interface PublicLayoutProps {
  children: React.ReactNode;
}

// TODO: make this an authed layout
const AdminLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <Styled.PageContainer>
      <NavBar backgroundColor="rgba(211, 217, 229, 0.5)" shadow={false} />
      {children}
    </Styled.PageContainer>
  );
};

export default AdminLayout;

// Styled Components
// =======================================================

let Styled: any;
Styled = {};

Styled.PageContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminContainer;
    width: 100%;
    height: 100%;
    display: block;
    overflow-y: scroll;
  `;
});
