import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useParams, useLocation } from "react-router-dom";

import TextField from "@mui/material/TextField";

import {
  StyledAutocomplete,
} from "src/components/AdminPage/StyledFields";
import SecondaryNav from "src/components/shared/SecondaryNav";

import { useModalContext } from "src/context/ModalContext";
import { useToastContext } from "src/context/ToastContext";

import {
  useMenus,
  useAddGarmentTitleOption,
  useAddColorOption,
  useAddMaterialOption,
} from "src/queryHooks/useMenus";

import { Menus } from "src/utils/formHelpers";

interface AdminEditMenusPageProps {}

type MenusKeys = keyof Menus;

interface MenuState {
  name: string;
  menu: Menus[MenusKeys] | never[];
}

const AdminEditMenusPage: React.FC<AdminEditMenusPageProps> = () => {
  const { garmentId } = useParams();
  const location = useLocation();

  const pageNo = location?.state?.pageNo;
  const rowsNo = location?.state?.rowsNo;

  const { modalOpen } = useModalContext();
  const addToast = useToastContext();
  const [menuState, setMenuState] = React.useState<MenuState>({
    name: "",
    menu: [],
  });
  const [newOption, setNewOption] = React.useState<string>("");
  const [errorText, setErrorText] = React.useState<string>("");

  const handleChangeOptionInput = (event: React.BaseSyntheticEvent, value: string) => {
    setNewOption(value);
    setErrorText("");
  };

  const menuOptions: Array<string> = ["Colors", "Materials", "Garment Titles"]; 

  return (
    <Styled.EditMenusPageContainer>
      <SecondaryNav
        backPath="/admin"
        pageTitle={"Edit menus"}
        pageNumber={pageNo}
        rowsNumber={rowsNo}
      />
      <Styled.PageContent>
        <form>
          <StyledAutocomplete
            key="menuType"
            disablePortal={true}
            id="menuType"
            // defaultValue={defaultGarmentTitleOption}
            options={menuOptions}
            // getOptionLabel={(option: unknown) => (option as Option).label}
            renderInput={params => (
              <TextField
                {...params}
                label="Menu type"
                name="menuType"
                required={true}
                variant="filled"
                // error={hasError}
                // helperText={errorText}
              />
            )}
            // onInputChange={(event, value) =>
            //   handleSelectInputChange(event, name, value)
            // }
          />
        </form>
      </Styled.PageContent>
    </Styled.EditMenusPageContainer>
  );
};

export default AdminEditMenusPage;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.EditMenusPageContainer = styled.div(() => {
  return css`
    label: AdminEditMenusPage_Container;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
  `;
});
