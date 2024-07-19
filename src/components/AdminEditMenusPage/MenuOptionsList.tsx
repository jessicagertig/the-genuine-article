import React from "react";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";

import MenuOptionsItem from "src/components/AdminEditMenusPage/MenuOptionsItem";
import {
  useDeleteGarmentTitleOption,
  useDeleteColorOption,
  useDeleteMaterialOption,
} from "src/queryHooks/useMenus";
import { MenuState } from "src/components/AdminEditMenusPage/EditMenusPage";

interface MenuOptionsListProps {
  menuState: MenuState;
}

const MenuOptionsList: React.FC<MenuOptionsListProps> = props => {
  const {
    menuState: { menuName, menu },
  } = props;
  const { mutate: deleteGarmentTitle } = useDeleteGarmentTitleOption();
  const { mutate: deleteColor } = useDeleteColorOption();
  const { mutate: deleteMaterial } = useDeleteMaterialOption();

  const handleClickEdit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("Edit");
  };

  const handleClickDelete = (itemId: number) => {
    console.log("MENU NAME", { menuName });
    switch (menuName) {
      case "garmentTitlesMenu":
        deleteGarmentTitle({ garmentTitleOptionId: itemId });
        console.log("Deleting garment title");
        break;
      case "colorsMenu":
        deleteColor({ colorOptionId: itemId });
        console.log("Deleting color option");
        break;
      case "materialsMenu":
        deleteMaterial({ materialOptionId: itemId });
        console.log("Deleting material option");
        break;
      default:
        console.log("Unhandled menu type");
        break;
    }
  };

  return (
    <Styled.Container>
      {menu &&
        menu.map(item => (
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
