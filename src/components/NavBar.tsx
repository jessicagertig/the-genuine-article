import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

type Props = {}

const NavBar = (props: Props) => {

  return (
  <Styled.Container>
    <Styled.TitleContainer>
      <Styled.Title>
      The Genuine
      </Styled.Title>
      <Styled.Title>
      Article
      </Styled.Title>
    </Styled.TitleContainer>
  </Styled.Container>
  )
}

export default NavBar;

/* Styled Components
======================================================= */
let Styled: any
Styled = {}

Styled.Container = styled.div((props) => {
  const t = props.theme;
  return css`
    label: NavBar;
    ${[t.h(205), t.px(4)]}
    position: sticky;
    width: 100%
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    height: 205px;
    background: ${t.color.blue_gray[100]}
  `
})

Styled.TitleContainer = styled.div((props) => {
  const t = props.theme;
  return css`
    label: NavBarContent;
  `
})

Styled.Title = styled.h1((props) => {
  const t = props.theme
  return css`
  label: NavBarTitle;
  ${[t.text.h1, t.text.bold]};
  line-height: 30px;
  `
})