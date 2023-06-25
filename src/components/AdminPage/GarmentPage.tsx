import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import GarmentForm from "./GarmentForm";
import OutlinedButton from "src/components/shared/OutlinedButton";

const GarmentPage = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/admin");
  };

  return (
    <Styled.GarmentPageContainer>
      <Styled.GarmentPageHeader>
        <Styled.ButtonContainer>
          <OutlinedButton
            onClick={handleOnClick}
            size="small"
            styles={{ maxWidth: "100px" }}
          >
            Back
          </OutlinedButton>
        </Styled.ButtonContainer>
      </Styled.GarmentPageHeader>
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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
});

Styled.GarmentPageHeader = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentPageHeader;
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: flex-start;

    h2 {
      font-family: "bellota text";
      font-size: 24px;
      font-weight: 700;
      color: ${t.color.blue[700]};
    }
  `;
});

Styled.ButtonContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentPageButtonContainer;
    padding-left: 5%;
  `
})
