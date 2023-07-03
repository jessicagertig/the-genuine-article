import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import SecondaryNav from "src/components/shared/SecondaryNav";
import GarmentsTable from "src/components/AdminPage/GarmentsTable";
import AddGarmentModal from "src/components/AdminPage/AddGarmentModal";
import OutlinedButton from 'src/components/shared/OutlinedButton';

import { useModalContext } from 'src/context/ModalContext';

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = props => {

  const { openModal, removeModal } = useModalContext();

  const handleClickAdd = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const modal = (
      <AddGarmentModal onCancel={() => removeModal()} />
    );

    openModal(modal);
  };

  return (
    <Styled.AdminPageContainer>
      <SecondaryNav pageTitle="Garments" />
      <Styled.ButtonContainer>
        <OutlinedButton
              hasStartIcon={true}
              iconType="add"
              onClick={handleClickAdd}
              styles={{
                maxWidth: "100px",
                paddingRight: "8px",
                paddingLeft: "8px",
              }}
            >
            Add
        </OutlinedButton>
      </Styled.ButtonContainer>
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

    ${t.mq.lg} {
      width: 88%;
    }
  `;
});
