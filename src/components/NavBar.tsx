import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import logo from "../assets/BonnetLogo.png"

type Props = {}

const NavBar = (props: Props) => {

  return (
    <Styled.NavBarContainer>
      <Styled.Container>
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
      </Styled.Container>
      <Styled.Container>
        <Styled.LinksContainer>
          <Styled.Link to='/'>
            Home
          </Styled.Link>
          <Styled.Link to='/'>
            Search
          </Styled.Link>
          <Styled.Link to='/'>
            About
          </Styled.Link>
        </Styled.LinksContainer>
      </Styled.Container>
    </Styled.NavBarContainer>
  )
}

export default NavBar;

/* Styled Components
======================================================= */
let Styled: any
Styled = {}

Styled.NavBarContainer = styled.div((props) => {
  const t = props.theme;
  return css`
    label: NavBar;
    ${t.pt(6)}
    position: sticky;
    width: 100%;
    height: 204px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${t.color.blue_gray[100]};
    padding-right: 8%;
    padding-left: 8%;
    // border: solid 1px red;
  `
})

Styled.Container = styled.div((props) => {
  // const t = props.theme;
  return css`
    label: NavBarItem;
    width: 34%;
    // border: solid 1px red;
    }
  `
})

Styled.LogoContainer = styled.div((props) => {
  return css`
    label: NavBarLogo;
    width: 125px;
    height: 125px;
    // border: solid 1px red;
    
    img {
      height: 125px;
    }
  `
})


Styled.TitleContainer = styled.div((props) => {
  const t = props.theme;
  return css`
    label: NavBarTitle;
    width: 170px;
    display: block;
    ${[t.pb(8), t.pt(3)]}

    span {
      ${[t.pl(3)]}
    }
  `
})

Styled.Title = styled.h1((props) => {
  const t = props.theme
  return css`
  label: NavBarTitleText;
  font-size: 1.8rem;
  font-weight: 900;
  color: ${t.color.blue[400]};
  line-height: 35px;
  letter-spacing: 0.05rem;
  `
})

Styled.LinksContainer = styled.div((props) => {
  // const t = props.theme
  return css`
  label: NavBarLinks
  display: flex;
  justify-content: space-between;
  align-items: center;
  // border: solid 1px red;
  width: 100%
  `
})

Styled.Link = styled.h2((props) => {
  const t: any = props.theme;
  return css`
    ${t.text.h2};
    ${[t.py(1), t.px(2), t.pb(12), t.rounded.sm]}
    label: NavBarLink;
    // display: flex;
    // flex-shrink: 0;
    // justify-content: center;
    // align-items: center;
    font-size: 1.45rem;
    font-weight: 900;
    transition: background-color 0.2s ease;
    font-family: 'Bellota Text', cursive;
    color: ${t.color.red[400]};

    &:visited,
    &:link {
      color: ${t.color.red[300]};
    }

    &:hover {
      color: ${t.color.red[500]};
      // background-color: ${t.color.blue_gray[200]};
    }
  `;
});

// Styled.Link = styled(Link)((props) => {
//   const t: any = props.theme;
//   return css`
//     ${[t.h(8), t.w(8), t.rounded.sm]}
//     label: NavBarLink;
//     display: flex;
//     flex-shrink: 0;
//     justify-content: center;
//     align-items: center;
//     transition: background-color 0.2s ease;
//     font-family: 'Bellota Text', cursive;

//     &:visited,
//     &:link {
//       ${t.text.h2};
//       color: ${t.color.red[400]};
//       letter-spacing: 0.05rem;
//     }

//     &:hover {
//       color: ${t.color.red[500]};
//       background-color: ${t.color.pink[200]};
//     }
//   `;
// });