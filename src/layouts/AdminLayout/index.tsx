import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useLocation } from 'react-router-dom';

import AdminFooter from "src/components/shared/AdminFooter";
import NavBar from "src/components/shared/NavBar";

interface PublicLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const pageContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollToTop = (scrollBehavior: ScrollBehavior) => {
    if (pageContainerRef && pageContainerRef.current) {
      pageContainerRef.current.scrollTo({ top: 0, behavior: scrollBehavior });
    }
  };

  const { pathname } = useLocation();

  React.useEffect(() => {
      console.log('pathname', pathname)
      scrollToTop("auto")
  }, [pathname]);

  return (
    <Styled.PageContainer ref={pageContainerRef}>
      <NavBar backgroundColor="rgba(211, 217, 229, 0.5)" shadow={false} />
      {children}
      <AdminFooter scrollToTop={scrollToTop} />
    </Styled.PageContainer>
  );
};

export default AdminLayout;

// Styled Components
// =======================================================

let Styled: any;
Styled = {};

Styled.PageContainer = styled.div(() => {
  return css`
    label: AdminContainer;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    overflow-y: scroll;
    flex-direction: column;

    & > :last-child {
      margin-top: auto;
    }
  `;
});
