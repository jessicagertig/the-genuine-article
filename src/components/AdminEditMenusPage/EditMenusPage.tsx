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
import MenuOptionsList from "src/components/AdminEditMenusPage/MenuOptionsList";

import { useModalContext } from "src/context/ModalContext";
import { useToastContext } from "src/context/ToastContext";
import { useWindowSizeContext } from "src/context/WindowSizeContext";

import { getLabelFromValue } from 'src/utils/formHelpers';

import {
  useMenus,
} from "src/queryHooks/useMenus";

import { Menus, Option } from "src/utils/formHelpers";

interface AdminEditMenusPageProps {}

type MenusKey = keyof Menus;

export interface MenuState {
  menuName: string;
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
    menuName: "",
    menu: [],
  });
  const { menuName, menu } = menuState
  const [newOption, setNewOption] = React.useState<string>("");
  const [errorText, setErrorText] = React.useState<string>("");

  const { data: menus, isLoading } = useMenus();

  console.log("Edit Menus Page MENUS:", { menus });
  console.log("Edit Menus Page MENUSTATE:", { menuState });

  React.useEffect(() => {
    if (menus && menuName !== "") {
      setMenuState({ ...menuState, menu: menus[menuName as MenusKey] });
    }
  }, [menus])

  const handleChangeOptionInput = (
    event: React.BaseSyntheticEvent,
    value: string
  ) => {
    setNewOption(value);
    setErrorText("");
  };

  type MenuOption = { label: string; value: keyof Menus };
  const menuOptions: Array<MenuOption> = [
    { label: "Colors", value: "colorsMenu" },
    { label: "Materials", value: "materialsMenu" },
    { label: "Garment Titles", value: "garmentTitlesMenu" },
  ];


  const handleClickAddOption = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    
    const menuTitle =  getLabelFromValue(menuOptions, menuName)
    const modal = (
      <AddOptionModal
        onCancel={() => removeModal()}
        menuTitle={menuTitle}
        handleChangeOptionInput={handleChangeOptionInput}
      />
    );

    openModal(modal);
  };


  const handleChangeMenu = (event: React.BaseSyntheticEvent, value: any) => {
    console.log("Edit Menus Page MENUSTATE:", { value });
    const menuKey: MenusKey = value?.value as MenusKey;
    console.log("Edit Menus Page MENUSTATE:", { menuKey });
    const menuContent = menus && menuKey ? menus[menuKey] : [];
    setMenuState({ menuName: menuKey, menu: menuContent });
  };

  const submitButton = (
    <OutlinedButton
      onClick={handleClickAddOption}
      hasEndIcon={true}
      iconType="add"
      disabled={!menuName}
      styles={{ height: "40px", width: "156px" }}
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
            key="menuName"
            disablePortal={true}
            id="menuName"
            // defaultValue={defaultGarmentTitleOption}
            options={menuOptions as MenuOption[]}
            loading={isLoading}
            getOptionLabel={(option: unknown) => (option as MenuOption).label}
            renderInput={params => (
              <TextField
                {...params}
                label="Menu type"
                name="menuName"
                required={true}
                variant="filled"
                // error={hasError}
                // helperText={errorText}
              />
            )}
            onChange={(event, value) => handleChangeMenu(event, value)}
          />
        </Styled.Form>
        {menuName === ""|| !menuName ? (
          <EmptyState
            title="No Menu Selected"
            description="Select a menu type to get started"
          />
        ) : (
          <MenuOptionsList menuState={menuState} />
        )}
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
      height: ${height ? `${height - 50}px` : "auto"};
      min-height: ${height ? `${height - 50}px` : "auto"};
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      flex-grow: 1;

      ${t.mq.md} {
        height: ${height ? `${height - 90}px` : "auto"};
        min-height: ${height ? `${height - 90}px` : "auto"};
      }
    `;
  }
);

Styled.PageContent = styled.div(() => {
  return css`
    label: AdminEditMenusPage_PageContent;
    width: 100%;
    height: calc(100% - 72px);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 110px;
  `;
});

Styled.Form = styled.form((props: { theme: Theme }) => {
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
      height: 110px;
      background: white;
      z-index: 2;
      justify-content: flex-end;
      align-items: center;
      padding-bottom: 36px;
      padding-top: 36px;
    `;
  }
);
