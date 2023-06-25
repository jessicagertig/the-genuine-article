import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { NavLink } from "react-router-dom";
import logo from "src/assets/BonnetLogo.png";

type Props = {
  backgroundColor?: string;
};

const NavBar = ({ backgroundColor }: Props) => {
  const title = (
    <Styled.TitleContainer>
      <Styled.Title>The Genuine</Styled.Title>
      <Styled.Title>
        <span>Article</span>
      </Styled.Title>
    </Styled.TitleContainer>
  );

  return (
    <Styled.NavBarContainer style={{ background: backgroundColor }}>
      <Styled.Container>
        <Styled.LogoContainer>
          <img src={logo} alt="bonnet logo" />
        </Styled.LogoContainer>
        {title}
      </Styled.Container>
      <Styled.Container>
        <Styled.LinksContainer>
          <Styled.NavLink to="/">Home</Styled.NavLink>
          <Styled.NavLink to="/search">Search</Styled.NavLink>
          <Styled.NavLink to="/admin">Admin</Styled.NavLink>
        </Styled.LinksContainer>
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

    ${t.mq.xl} {
      height: 90px;
    }

    ${t.mq.xxl} {
      height: 125px;
    }
  `;
});

Styled.Container = styled.div(props => {
  const t = props.theme;
  return css`
    label: NavBarItems;
    width: 50%;

    ${t.mq.lg} {
      width: 40%;
    }
    ${t.mq.xxl} {
      width: 34%;
    }
  `;
});

Styled.LogoContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: NavBarLogo;
    width: 90px;
    height: 90px;

    ${t.mq.xxl} {
      height: 120px;
      width: 120px;
    }
  `;
});

Styled.TitleContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: NavBarTitle;
    width: 170px;
    display: none;
    ${[t.pb(8), t.pt(3)]}

    span {
      ${[t.pl(3)]}
    }

    ${t.mq.xxl} {
      display: block;
    }
  `;
});

Styled.Title = styled.h1(props => {
  const t = props.theme;
  return css`
    label: NavBarTitleText;
    ${t.text.h1};

    font-size: 1.8rem;
    color: ${t.color.blue[400]};
    line-height: 35px;
    letter-spacing: 0.05rem;
  `;
});

Styled.LinksContainer = styled.div(props => {
  const t = props.theme;
  return css`
  label: NavBarLinks
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  a {
    color: ${t.color.red[400]};
  }

  a.active {
    color: ${t.color.red[500]};
  }
  `;
});

Styled.NavLink = styled(NavLink)(props => {
  const t: any = props.theme;
  return css`
    ${t.text.h2};
    ${[t.py(1), t.px(2), t.pb(12), t.rounded.sm]}
    label: NavBarLink;
    font-size: 1.45rem;
    font-weight: 900;
    transition: font-size 0.2s ease;
    font-family: "Bellota Text", cursive;

    &:hover {
      cursor: pointer;
      color: ${t.color.red[500]};
      font-size: 1.46rem;
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
