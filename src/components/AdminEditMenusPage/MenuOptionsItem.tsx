import React from "react";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";

import IconButton from "@mui/material/IconButton";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { MenuItem } from "src/utils/formHelpers";

interface MenuOptionsItemProps {
  handleClickEdit: (event: React.SyntheticEvent) => void;
  handleClickDelete: (event: React.SyntheticEvent) => void;
  item: MenuItem;
  name: string;
}

const MenuOptionsItem: React.FC<MenuOptionsItemProps> = props => {
  const { item, name } = props;

  const getItemName = () => {
    if ("color" in item) {
      return item.color;
    } else if ("material" in item) {
      return item.material;
    } else if ("garmentTitle" in item) {
      return item.garmentTitle;
    }
  };

  const itemName = getItemName();

  return (
    <Styled.Container>
      <Styled.Option>
        <p>{itemName}</p>
      </Styled.Option>
      <Styled.Actions>
        <IconButton
          sx={{ color: "#020b1c" }}
          onClick={event => props.handleClickEdit(event)}
        >
          <BorderColorOutlinedIcon />
        </IconButton>
        <IconButton
          sx={{ color: "#020b1c" }}
          onClick={event => props.handleClickDelete(event)}
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

Styled.Container = styled.div((theme: Theme) => {
  const t = theme;
  return css`
    label: MenuOptionsItem_Container;
    ${t.m(2)}
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #020b1c;
    border-left: 1px solid #020b1c;
    border-right: 1px solid #020b1c;

    p {
      color: #020b1c;
    }
  `;
});

Styled.Option = styled.div((theme: Theme) => {
  const t = theme;
  return css`
    label: MenuOptionsItem_Option;
    ${t.ml(2)}
    height: 100%;
    display: flex;
    justify-content: flex-start;
  `;
});

Styled.Actions = styled.div((theme: Theme) => {
  const t = theme;
  return css`
    label: MenuOptionsItem_Actions;
    ${t.mr(2)}
    height: 100%;
    display: flex;
    justify-content: flex-end;
  `;
});
