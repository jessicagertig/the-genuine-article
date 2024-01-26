import React from "react";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";

import MenuOptionsItem from "src/components/AdminEditMenusPage/MenuOptionsItem";
import { Menu } from "src/utils/formHelpers";
import { MenuState } from "src/components/AdminEditMenusPage/EditMenusPage";

interface MenuOptionsListProps {
  menuState: MenuState
}

const MenuOptionsList: React.FC<MenuOptionsListProps> = props => {
  const { menuState: { name, menu} } = props;

  const handleClickEdit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("Edit");
  };

  const handleClickDelete = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("Edit");
  };

  return (
    <Styled.Container>
      {menu.map(item => (
        <MenuOptionsItem
          handleClickDelete={handleClickDelete}
          handleClickEdit={handleClickEdit}
          item={item}
          name={name}
        />
      ))}
    </Styled.Container>
  );
};

export default MenuOptionsList;

// Styled MenuOptionsLists
// =======================================================
let Styled: any;
Styled = {};

Styled.Container = styled.div((theme: Theme) => {
  const t = theme;
  return css`
    label: MenuOptionsList_Container;
    ${t.m(2)}
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
  `;
});
