import { NavLink, NavLinkProps } from "react-router-dom";
import ListItem, { ListItemProps } from "@mui/material/ListItem";

type CombinedProps = ListItemProps &
  NavLinkProps & { name: string; to: string; onClose: () => void };

const styles = {
  transition: "font-size 0.2s ease",
  fontFamily: "Bellota Text",

  "&:hover": {
    cursor: "pointer",
    backgroundColor: "rgba(211, 217, 229, 0.25)",
  },
  "&:visited": {
    color: "#172a4f",
  },
  "&:link": {
    color: "#172a4f",
  },
};

const NavMenuItem = ({ name, to, onClose }: CombinedProps) => {
  return (
    <ListItem onClick={onClose} component={NavLink} to={to} sx={styles}>
      {name}
    </ListItem>
  );
};

export default NavMenuItem;
