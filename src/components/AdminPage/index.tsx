import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import GarmentsTable from "src/components/AdminPage/GarmentsTable";
import AdminPageHeader from "src/components/AdminPage/AdminPageHeader";

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = props => {

  return (
    <Styled.AdminPageContainer>
      <AdminPageHeader pageTitle="Garments" />
      <Styled.GarmentsTableContainer>
        <GarmentsTable />
      </Styled.GarmentsTableContainer>
    </Styled.AdminPageContainer>
  );
};

export default AdminPage;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.AdminPageContainer = styled.div(() => {
  return css`
    label: AdminPageContainer;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 100px;
  `;
});

Styled.ButtonContainer = styled.div(() => {
  return css`
    label: GarmentPageButtonContainer;
    padding-right: 24px;
    padding-bottom: 24px;
    display: flex;
    justify-content: flex-end;
    width: 100%;
  `;
});

Styled.GarmentsTableContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentPageTableContainer;
    width: 100%;
    display: flex;
    justify-content: center;

    ${t.mq.md} {
      width: 88%;
    }
  `;
});
