import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import GarmentForm from "./GarmentForm";
import SecondaryNav from "src/components/shared/SecondaryNav";

const GarmentPage = () => {
  return (
    <Styled.GarmentPageContainer>
      <SecondaryNav
        backPath="/admin"
        pageTitle="Add Garment"
      />
      <GarmentForm />
    </Styled.GarmentPageContainer>
  );
};

export default GarmentPage;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.GarmentPageContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentPageContainer;
    ${t.pt(6)}
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
});