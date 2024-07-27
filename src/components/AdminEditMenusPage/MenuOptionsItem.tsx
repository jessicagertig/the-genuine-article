import React from "react";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";

import IconButton from "@mui/material/IconButton";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { MenuItem } from "src/utils/formHelpers";

interface MenuOptionsItemProps {
  handleClickEdit: (optionValue: string, optionId: number) => void;
  handleClickDelete: (optionId: number) => void;
  item: MenuItem;
}

const MenuOptionsItem: React.FC<MenuOptionsItemProps> = props => {
  // console.log(
  //   "%cMenuOptionsItem RENDER",
  //   "background-color: blue; color: white;",
  //   { props }
  // );
  const { item } = props;

  const getItemName = () => {
    if ("color" in item) {
      return item.color;
    } else if ("material" in item) {
      return item.material;
    } else if ("garmentTitle" in item) {
      return item.garmentTitle;
    }
  };

  const itemName = getItemName() || "";

  return (
    <Styled.Container>
      <Styled.Option>
        <p>{itemName}</p>
      </Styled.Option>
      <Styled.Actions>
        <IconButton
          sx={{ color: "#020b1c" }}
          onClick={()=> props.handleClickEdit(itemName, item.id)}
        >
          <BorderColorOutlinedIcon />
        </IconButton>
        <IconButton
          sx={{ color: "#020b1c" }}
          onClick={() => props.handleClickDelete(item.id)}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Styled.Actions>
    </Styled.Container>
  );
};

export default MenuOptionsItem;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.Container = styled.div(({ theme }: { theme: Theme }) => {
  const t = theme;
  return css`
    label: MenuOptionsItem_Container;
    ${[t.mx(2), t.p(1)]}
    height: 100%;
    width: calc(100% - 16px);
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #020b1c;
    border-left: 1px solid #020b1c;
    border-right: 1px solid #020b1c;
  `;
});

Styled.Option = styled.div(({ theme }: { theme: Theme }) => {
  const t = theme;
  return css`
    label: MenuOptionsItem_Option;
    ${[t.ml(2), t.mt(2)]}
    height: 100%;
    display: flex;
    justify-content: flex-start;
    font-size: 1rem;
  `;
});

Styled.Actions = styled.div(({ theme }: { theme: Theme }) => {
  const t = theme;
  return css`
    label: MenuOptionsItem_Actions;
    ${t.mr(2)}
    height: 100%;
    display: flex;
    justify-content: flex-end;
  `;
});
