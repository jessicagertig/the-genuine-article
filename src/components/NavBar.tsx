import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import logo from "../assets/BonnetLogo.png"

type Props = {}

const NavBar = (props: Props) => {

  return (
  <Styled.Container>
    {/* <Styled.NavBarContainer> */}
      <Styled.LogoContainer>
        <img src={logo} alt="bonnet logo"/>
      </Styled.LogoContainer>
      <Styled.TitleContainer>
        <Styled.Title>
        The Genuine
        </Styled.Title>
        <Styled.Title>
        <span>Article</span>
        </Styled.Title>
      </Styled.TitleContainer>
    {/* </Styled.NavBarContainer> */}
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
    ${[t.px(28), t.pt(6)]}
    position: sticky;
    width: 100%;
    height: 204px;
    display: flex;
    align-items: center;
    background: ${t.color.blue_gray[100]}
  `
})

Styled.LogoContainer = styled.div((props) => {
  const t = props.theme;
  return css`
    label: NavBarLogo;
    width: 125px;
    
    img {
      height: 100%;
    }
  `
})


Styled.TitleContainer = styled.div((props) => {
  const t = props.theme;
  return css`
    label: NavBarTitle;
    width: 170px;
    display: block;
    ${[t.pb(8), t.pt(1)]}

    span {
      ${[t.pl(3)]}
    }
  `
})

Styled.Title = styled.h1((props) => {
  const t = props.theme
  return css`
  label: NavBarTitle;
  ${t.text.h1};
  line-height: 38px;
  letter-spacing: 0.05rem;
  `
})