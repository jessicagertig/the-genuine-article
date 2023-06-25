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
      <Styled.AdminPageHeader>
        <Styled.AdminPageTitle>
          <h2>Garments</h2>
        </Styled.AdminPageTitle>
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

Styled.AdminPageContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminPageContainer;
    ${t.pt(6)}
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
});

Styled.AdminPageHeader = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminPageHeader;
    width: 100%;
    height: 48px;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
  `;
});

Styled.AdminPageTitle = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminPageTitle;
    width: 60%;
    height: 48px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    h2 {
      font-family: "bellota text";
      font-size: 24px;
      font-weight: 700;
      color: ${t.color.blue[700]};
      text-transform: uppercase;
    }
  `;
});

Styled.ButtonContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentPageButtonContainer;
    padding-right: 24px;
    display: flex;
    justify-content: flex-end;
    width: 40%;
  `;
});
