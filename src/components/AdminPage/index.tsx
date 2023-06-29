import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import SecondaryNav from "src/components/shared/SecondaryNav";

import GarmentsTable from "./GarmentsTable";

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = props => {
  return (
    <Styled.AdminPageContainer>
      <SecondaryNav toPath="/admin/garment" toText="Add" pageTitle="Garments" />
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
  `;
});

Styled.AdminPageHeader = styled.div(props => {
  const t = props.theme;
  return css`
    ${t.pt(6)}
    label: AdminPageHeader;
    width: 100%;
    height: 48px;
    margin-bottom: 24px;
    display: flex;
    justify-content: center;

    h2 {
      font-family: "bellota text";
      font-size: 24px;
      font-weight: 700;
      color: ${t.color.blue[700]};
    }
  `;
});

Styled.ButtonContainer = styled.div(() => {
  return css`
    label: GarmentPageButtonContainer;
    padding-top: 24px;
    padding-right: 24px;
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

    ${t.mq.lg} {
      width: 88%;
    }
  `;
});
