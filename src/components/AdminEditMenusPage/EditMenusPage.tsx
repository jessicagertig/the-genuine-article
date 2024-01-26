import React from "react";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";
import { useLocation } from "react-router-dom";

import TextField from "@mui/material/TextField";

import { StyledAutocomplete } from "src/components/AdminPage/StyledFields";
import SecondaryNav from "src/components/shared/SecondaryNav";
import AddOptionModal from "src/components/AdminEditMenusPage/AddOptionModal";
import EmptyState from "src/components/shared/EmptyState";
import OutlinedButton from "src/components/shared/OutlinedButton";

import { useModalContext } from "src/context/ModalContext";
import { useToastContext } from "src/context/ToastContext";
import { useWindowSizeContext } from "src/context/WindowSizeContext";

import {
  useMenus,
  useAddGarmentTitleOption,
  useAddColorOption,
  useAddMaterialOption,
} from "src/queryHooks/useMenus";

import { Menus } from "src/utils/formHelpers";

interface AdminEditMenusPageProps {}

type MenusKey = keyof Menus;

export interface MenuState {
  name: string;
  menu: Menus[MenusKey] | never[];
}

const AdminEditMenusPage: React.FC<AdminEditMenusPageProps> = () => {
  const {
    dimensions: { height, width },
  } = useWindowSizeContext();
  const location = useLocation();

  const pageNo = location?.state?.pageNo;
  const rowsNo = location?.state?.rowsNo;

  const { modalOpen, openModal, removeModal } = useModalContext();
  const addToast = useToastContext();
  const [menuState, setMenuState] = React.useState<MenuState>({
    name: "",
    menu: [],
  });
  const [newOption, setNewOption] = React.useState<string>("");
  const [errorText, setErrorText] = React.useState<string>("");

  const { data: menus, isLoading } = useMenus();

  const handleChangeOptionInput = (
    event: React.BaseSyntheticEvent,
    value: string
  ) => {
    setNewOption(value);
    setErrorText("");
  };

  const handleClickAddOption = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const modal = (
      <AddOptionModal
        onCancel={() => removeModal()}
        menuName={menuState.name}
        handleChangeOptionInput={handleChangeOptionInput}
      />
    );

    openModal(modal);
  };

  const handleChangeMenu = (event: React.BaseSyntheticEvent) => {
    const value: string = event.target.value;
    interface Keys {
      [key: string]: MenusKey;
    }

    const menusKeysLookup: Keys = {
      Colors: "colorsMenu",
      Materials: "materialsMenu",
      "Garment Titles": "garmentTitlesMenu",
    };
    const menusKey: MenusKey = menusKeysLookup[value];
    const menuContent = menus ? menus[menusKey] : [];
    setMenuState({ name: value, menu: menuContent });
  };

  const menuOptions: Array<string> = ["Colors", "Materials", "Garment Titles"];

  const submitButton = (
    <OutlinedButton
      onClick={handleClickAddOption}
      hasEndIcon={true}
      iconType="add"
      styles={{ height: "40px", width: "156px"}}
    >
      Add option
    </OutlinedButton>
  );

  return (
    <Styled.EditMenusPageContainer height={height}>
      <SecondaryNav
        backPath="/admin"
        pageTitle={"Edit menus"}
        pageNumber={pageNo}
        rowsNumber={rowsNo}
      />
      <Styled.PageContent>
        <Styled.Form>
          <StyledAutocomplete
            key="menuType"
            disablePortal={true}
            id="menuType"
            // defaultValue={defaultGarmentTitleOption}
            options={menuOptions}
            loading={isLoading}
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
            onChange={event => handleChangeMenu(event)}
            // onInputChange={(event, value) =>
            //   handleSelectInputChange(event, name, value)
            // }
            // sx={{ maxWidth: "300px", width: "100%" }}
          />
        </Styled.Form>
        <EmptyState
          title="No Menu Selected"
          description="Select a menu type to get started"
        />
        <Styled.BottomBar>{submitButton}</Styled.BottomBar>
      </Styled.PageContent>
    </Styled.EditMenusPageContainer>
  );
};

export default AdminEditMenusPage;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.EditMenusPageContainer = styled.div(
  ({ theme, height }: { theme: Theme; height: number | undefined }) => {
    const t = theme;
    return css`
      label: AdminEditMenusPage_Container;
      width: 100%;
      height: 100%;
      min-height: ${height ? `${height - 50}px` : "100%"};
      display: flex;
      flex-direction: column;
      align-items: center;

      ${t.mq.md} {
        min-height: ${height ? `${height - 90}px` : "100%"};
      }
    `;
  }
);

Styled.PageContent = styled.div(() => {
  return css`
    label: AdminEditMenusPage_PageContent;
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
});

Styled.Form = styled.form(props => {
  const t = props.theme;
  return css`
    label: GarmentForm;
    margin: 50px 2% 0% 2%;
    width: 96%;
    display: flex;
    flex-direction: column;
    align-items: center;

    ${t.mq.md} {
      margin: 50px 10% 0% 10%;
      width: 50%;
      align-items: flex-start;
    }
  `;
});

Styled.BottomBar = styled.div(
  ({ theme, height }: { theme: Theme; height: number | undefined }) => {
    const t = theme;
    return css`
      label: AdminEditMenusPage_BottomBar;
      width: 100%;
      padding-right: 25%;
      padding-left: 25%;
      display: flex;
      position: absolute;
      bottom: 0px;
      height: 90px;
      background: white;
      z-index: 2;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 50px;
    `;
  }
);
