import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

function NavBar() {

  return (
  <Styled.Container>
    NavBar
  </Styled.Container>
  )
}

export default NavBar;

/* Styled Components
======================================================= */
let Styled: any
Styled = {}

Styled.Container = styled.div((props) => {
  console.log("PROPS")
  console.log(props)
  const t = props.theme;
  return css`
    label: NavBar;
    ${[t.h(20), t.px(4)]}
    position: sticky;
    width: 100%
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    background: ${t.color.blue_gray[100]}
  `
})