import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import OutlinedButton from "src/components/shared/OutlinedButton";

import GarmentsTable from "./GarmentsTable";

type Props = {};

const AdminPage = (props: Props) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/admin/garment");
  };

  return (
    <Styled.AdminPageContainer>
      <Styled.ButtonContainer>
        <OutlinedButton
          onClick={handleOnClick}
          styles={{
            maxWidth: "130px",
            paddingRight: "8px",
            paddingLeft: "8px",
          }}
        >
          Add garment
        </OutlinedButton>
      </Styled.ButtonContainer>
      <Styled.AdminPageHeader>
        <h2>GARMENTS</h2>
      </Styled.AdminPageHeader>
      <GarmentsTable />
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
    width: 100%;
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
