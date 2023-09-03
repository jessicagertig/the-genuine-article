import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import AddGarmentModal from "src/components/AdminPage/AddGarmentModal";
import AddByUrlModal from "src/components/AdminPage/AddByUrlModal";
import { useModalContext } from "src/context/ModalContext";

type Props = {
  pageTitle: string;
};

const AdminHeader: React.FC<Props> = props => {
  const { pageTitle } = props;
  const { openModal, removeModal } = useModalContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  type Action = {
    name: string;
    handleOnClick: (event: React.SyntheticEvent) => void;
  };

  const handleClickManualAdd = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const modal = <AddGarmentModal onCancel={() => removeModal()} />;

    openModal(modal);
    handleClose();
  };

  const handleClickUrlAdd = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const modal = <AddByUrlModal onCancel={() => removeModal()} />;

    openModal(modal);
    handleClose();
  };

  const handleClickEditMenus = () => {
    console.log("Clicked Edit Menus");
  };

  const actions: Action[] = [
    { name: "Add manually", handleOnClick: handleClickManualAdd },
    { name: "Add by url", handleOnClick: handleClickUrlAdd },
    { name: "Edit menus", handleOnClick: handleClickEditMenus },
  ];

  const menu = (
    <Styled.MenuContainer>
      <IconButton
        component="button"
        id="icon-menu-button"
        aria-controls={open ? "nav-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          px: 1.5,
          "&:hover": {
            backgroundColor: "rgba(211, 217, 229, 0.5)",
          },
        }}
      >
        <MoreVertOutlinedIcon sx={{ color: "#020b1c", fill: "#020b1c" }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ "& .MuiList-root": { width: "130px" } }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {actions.map(action => (
          <MenuItem onClick={action.handleOnClick} key={action.name}>
            {action.name}
          </MenuItem>
        ))}
      </Menu>
    </Styled.MenuContainer>
  );

  return (
    <Styled.Container>
      <Styled.AdminHeaderContainer>
        <Styled.AdminHeaderText>
          <h2>{pageTitle}</h2>
        </Styled.AdminHeaderText>
        <Styled.RightButtonContainer>{menu}</Styled.RightButtonContainer>
      </Styled.AdminHeaderContainer>
    </Styled.Container>
  );
};

export default AdminHeader;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.Container = styled.div(props => {
  const t = props.theme;
  return css`
    label: Container;
    ${t.mb(12)}
    display: flex;
    justify-content: center;
    width: 100%;
    border-bottom: 1px solid rgb(211, 217, 229);
  `;
});

Styled.AdminHeaderContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminHeader_Container;
    ${[t.mb(3), t.mt(4)]}
    margin-right: 2%;
    margin-left: 2%;
    width: 96%;
    display: flex;
    height: 48px;
    max-width: 1000px;

    ${t.mq.xl} {
      margin-right: 6%;
      margin-left: 6%;
      width: 88%;
    }
  `;
});

Styled.AdminHeaderText = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminHeader_HeaderText;
    width: 40%
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 30%;

    ${t.mq.xs} {
      width: 50%;
      margin-left: 25%;
    }

    ${t.mq.sm} {
      width: 60%;
      margin-left: 20%;
    }

    h2 {
      font-family: "bellota text";
      font-size: 24px;
      font-weight: 700;
      color: ${t.color.blue[700]};
      text-transform: uppercase;
      text-align: center;
    }
  `;
});

Styled.RightButtonContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminPageHeader_ButtonContainer;
    display: flex;
    justify-content: flex-end;
    width: 30%;

    ${t.mq.xs} {
      width: 25%;
    }

    ${t.mq.sm} {
      width: 20%;
    }
  `;
});

Styled.MenuContainer = styled.div(props => {
  const t: any = props.theme;
  return css`
    label: AdminPageHeader_MenuContainer;
    display: flex;
    ${t.mr(0)}

    ${t.mq.xs} {
      ${t.mr(4)}
    }

    ${t.mq.lg} {
      ${t.mr(0)}
    }
  `;
});
