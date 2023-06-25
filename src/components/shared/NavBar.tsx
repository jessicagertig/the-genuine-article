import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { NavLink } from "react-router-dom";
import Menu from '@mui/material/Menu';
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';

import logo from "src/assets/HeaderLogo.png";
import bonnetLogo from "src/assets/BonnetLogo.png";
import NavMenuItem from "src/components/shared/NavMenuItem";

type Props = {
  backgroundColor?: string;
};

const NavBar = ({ backgroundColor }: Props) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  type Link = {
    name: string;
    path: string;
  }

  const links: Link[] = [
    { name: "Home", path: "/"},
    { name: "Garments", path: "/search"},
    { name: "Admin", path: "/admin"},
  ]

  const menu = (
      <Styled.MenuContainer>
        <IconButton component="button"       
          id="icon-menu-button"
          aria-controls={open ? 'nav-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ "& .MuiIconButton-root": {color: "#172a4f"}}}
        >
          <MenuIcon sx={{color: "#172a4f", fill: "#172a4f"}}/>
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
        {links.map(link =>
          <NavMenuItem onClose={handleClose} name={link.name} to={link.path} key={link.name}/>
        )}
        </Menu>
      </Styled.MenuContainer>
    );

  return (
    <Styled.NavBarContainer style={{ background: backgroundColor }}>
      <Styled.Container>
        <Styled.LogoContainer>
          <Styled.LargeLogo src={logo} alt="bonnet logo" />
          <Styled.SmallLogo src={bonnetLogo} alt="bonnet logo" />
        </Styled.LogoContainer>
      </Styled.Container>
      <Styled.Container>
        <Styled.LinksContainer>
          <Styled.NavLink to="/">Home</Styled.NavLink>
          <Styled.NavLink to="/search">Search</Styled.NavLink>
          <Styled.NavLink to="/admin">Admin</Styled.NavLink>
        </Styled.LinksContainer>
        {menu}
      </Styled.Container>
    </Styled.NavBarContainer>
  );
};

export default NavBar;

/* Styled Components
======================================================= */
let Styled: any;
Styled = {};

Styled.NavBarContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: NavBar;
    ${t.py(6)}
    position: sticky;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 8%;
    padding-left: 8%;

    ${t.mq.lg} {
      height: 90px;
    }

    ${t.mq.xl} {
      height: 125px;
    }
  `;
});

Styled.Container = styled.div(props => {
  const t = props.theme;
  return css`
    label: NavBarItems;
    width: 50%;

    ${t.mq.md} {
      width: 40%;
    }
    ${t.mq.xl} {
      width: 33%;
    }
    ${t.mq.xxl} {
      width: 25%;
    }
  `;
});

Styled.LargeLogo = styled.img(props => {
  const t = props.theme;
  return css`
  label: NavBarLargeLogo;
  display: none;

  ${t.mq.lg} {
    display: block;
  }
  `;
});

Styled.SmallLogo = styled.img(props => {
  const t = props.theme;
  return css`
  label: NavBarSmallLogo;
  display: block;

  ${t.mq.lg} {
    display: none;
  }
  `;
});

Styled.LogoContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: NavBarLogo;
    width: auto;
    height: 50px;

    ${t.mq.lg} {
      height: 90px;
    }

    ${t.mq.xl} {
      height: 110px;
    }
  `;
});

Styled.LinksContainer = styled.div(props => {
  const t = props.theme;
  return css`
  label: NavBarLinks
  display: none;
  width: 100%;

  a {
    color: ${t.color.red[400]};
  }

  a.active {
    color: ${t.color.red[500]};
  }

  ${t.mq.lg} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  `;
});

Styled.NavLink = styled(NavLink)(props => {
  const t: any = props.theme;
  return css`
    ${t.text.h2};
    ${[t.py(1), t.px(2), t.pb(12), t.rounded.sm]}
    label: NavBarLink;
    display: none;
    font-size: 1.25rem;
    font-weight: 900;
    transition: font-size 0.2s ease;
    font-family: "Bellota Text", cursive;

    &:hover {
      cursor: pointer;
      color: ${t.color.red[500]};
      font-size: 1.4rem;
    }

    ${t.mq.lg} {
      display: block;
    }
  `;
});

Styled.MenuContainer = styled.div(props => {
  const t: any = props.theme;
  return css`
  label: NavMenuContainer;
  display: block;

  ${t.mq.lg} {
    display: none;
  }
  `;
});

