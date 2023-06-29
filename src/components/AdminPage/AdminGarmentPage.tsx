import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import GarmentForm from "./GarmentForm";
import SecondaryNav from "src/components/shared/SecondaryNav";

interface AdminGarmentPageProps {}

const AdminGarmentPage: React.FC<AdminGarmentPageProps> = () => {
  return (
    <Styled.GarmentPageContainer>
      <SecondaryNav backPath="/admin" pageTitle="Add Garment" />
      <GarmentForm />
    </Styled.GarmentPageContainer>
  );
};

export default AdminGarmentPage;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.AdminGarmentPage_Container = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentPageContainer;
    ${t.pt(6)}
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
});
