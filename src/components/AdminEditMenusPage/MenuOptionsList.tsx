import React from "react";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";

import MenuOptionsItem from "src/components/AdminEditMenusPage/MenuOptionsItem";
import { MenuState } from "src/components/AdminEditMenusPage/EditMenusPage";

interface MenuOptionsListProps {
  menuState: MenuState
}

const MenuOptionsList: React.FC<MenuOptionsListProps> = props => {
  const { menuState: { menuName, menu} } = props;

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
      {menu && menu.map(item => (
        <MenuOptionsItem
          handleClickDelete={handleClickDelete}
          handleClickEdit={handleClickEdit}
          item={item}
          name={menuName}
          key={item.id}
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

Styled.Container = styled.div(({ theme }: { theme: Theme }) => {
  const t = theme;
  return css`
    label: MenuOptionsList_Container;
    ${[t.m(2)]}
    height: 100%;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;

    ${t.mq.md} {
      width: 50%;
    }
  `;
});
