import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { NavLink } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SvgIcon from "@mui/material/SvgIcon";

import TextButton from "src/components/shared/TextButton";
import bookcaseImage from "src/assets/GirlsBookcaseImg.png";
import { useAuthContext } from "src/context/AuthContext";

interface FooterProps {
  scrollToTop: () => void;
}

const Footer: React.FC<FooterProps> = props => {
  const { logout } = useAuthContext();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));

  type Link = {
    name: string;
    path: string;
  };

  const links: Link[] = [
    { name: "Home", path: "/" },
    { name: "Garments", path: "/garments" },
    { name: "Admin", path: "/admin" },
  ];

  const logoutButton = (
    <TextButton onClick={() => logout()}>Log out</TextButton>
  )

  const styles = {
    transition: "font-size 0.2s ease",
    fontFamily: "Bellota Text",
    fontSize: "1.125rem",
    padding: "24px",
    color: "#831616",

    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgba(211, 217, 229, 0.25)",
      fontSize: "1.25rem",
      color: "#C42121",
    },
    "&:visited": {
      color: "#172a4f",
    },
    "&:link": {
      color: "#172a4f",
    },
  };

  const linksLeft = [
    {
      name: "The Metropolitan Museum of Art",
      to: "https://www.metmuseum.org/art/collection/search",
    },
    {
      name: "Victoria and Albert Museum",
      to: "https://www.vam.ac.uk/collections",
    },
    {
      name: "Philadeliphia Museum of Art",
      to: "https://www.philamuseum.org/collection",
    },
    {
      name: "The Kyoto Costume Institute",
      to: "https://www.kci.or.jp/en/archives/digital_archives/",
    },
    {
      name: "Los Angeles County Museum of Art",
      to: "https://collections.lacma.org/",
    },
    {
      name: "The Royal Ontario Museum",
      to: "https://collections.rom.on.ca/objects",
    },
    {
      name: "Maryland Center for History and Culture",
      to: "https://www.mdhistory.org/digital-resource/",
    },
  ];

  const linksRight = [
    {
      name: "The Museum at FIT",
      to: "https://fashionmuseum.fitnyc.edu/objects",
    },
    {
      name: "Cincinnati Art Museum",
      to: "https://www.cincinnatiartmuseum.org/art/explore-the-collection",
    },
    { name: "The Smithsonian", to: "https://www.si.edu/collections" },
    { name: "RISD Museum", to: "https://risdmuseum.org/art-design/collection" },
    { name: "Newfields", to: "https://discovernewfields.org/" },
    {
      name: "UNT Digital Library",
      to: "https://digital.library.unt.edu/explore/collections/",
    },
  ];

  const resourceLinksLeft = linksLeft.map(link => (
    <Styled.ResourceLink key={link.name}>
      <a href={link.to} target="_blank" rel="noreferer">
        {link.name}
      </a>
    </Styled.ResourceLink>
  ));

  const resourceLinksRight = linksRight.map(link => (
    <Styled.ResourceLink key={link.name}>
      <a href={link.to} target="_blank" rel="noreferer">
        {link.name}
      </a>
    </Styled.ResourceLink>
  ));

  const svg = (
    <SvgIcon
      sx={{
        color: "#172a4f",
        height: "55px",
        width: "55px",
        marginBottom: 1.5,
      }}
    >
      <path d="M 17 14 L 12 9 L 7 14 L 6 13 l 6 -6 l 6 6 Z" />
    </SvgIcon>
  );

  return (
    <Styled.Container>
      <Styled.MainContainer>
        <Styled.ContentContainer>
          <Styled.NavLinksContainer>
            {links.map(link => (
              <NavLink to={link.path} key={link.name} style={styles}>
                {link.name}
              </NavLink>
            ))}
          </Styled.NavLinksContainer>
          {logoutButton}
          <Styled.ResourceContainer>
            <Styled.Title>
              <h2>External Resources</h2>
            </Styled.Title>
            <Styled.LinksSection>
              <Styled.LeftResourceLinks>
                {resourceLinksLeft}
              </Styled.LeftResourceLinks>
              <Styled.RightResourceLinks>
                {resourceLinksRight}
              </Styled.RightResourceLinks>
            </Styled.LinksSection>
          </Styled.ResourceContainer>
        </Styled.ContentContainer>
        <Styled.ImageContainer>
          <img src={bookcaseImage} alt="girls standing by bookcase" />
        </Styled.ImageContainer>
      </Styled.MainContainer>
      <Styled.TopBarContainer>
        <Styled.CircleButton
          onClick={props.scrollToTop}
          role="button"
          aria-label="scroll to top"
        >
          {svg}
          <Styled.ButtonText>TOP</Styled.ButtonText>
        </Styled.CircleButton>
      </Styled.TopBarContainer>
      <Styled.BottomBarContainer></Styled.BottomBarContainer>
    </Styled.Container>
  );
};

export default Footer;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.Container = styled.div`
  label: Footer_Container;
  height: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(251, 233, 239, 0.75);
`;

Styled.TopBarContainer = styled.div(() => {
  return css`
    label: Footer_TopBarContainer;
    height: 64px;
    width: 100%;
    display: flex;
    justify-content: center;
  `;
});

Styled.CircleButton = styled.div(() => {
  return css`
    label: Footer_CircleButton;
    border: 2px solid #172a4f;
    position: relative;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
      background-color: rgba(240, 167, 189, 0.2);
    }
  `;
});

Styled.ButtonText = styled.div(() => {
  return css`
    position: absolute;
    left: 50%;
    top: 70%;
    transform: translate(-50%, -50%);
    z-index: 1;
    font-size: 1rem;
    line-height: 1.5rem;
    font-family: bellota text;
    font-weight: bold;
    color: #172a4f;
  `;
});

Styled.MainContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: Footer_Container;
    ${[t.pb(1), t.pl(1)]}
    height: 450px;
    margin-top: 50px;
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
  `;
});

Styled.BottomBarContainer = styled.div`
  label: Foot_BottomBarContainer;
  height: 75px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

Styled.ContentContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: Footer_ContentContainer;
    ${[t.py(1), t.pr(1)]}
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ${t.mq.lg} {
      width: 60%;
    }
  `;
});

Styled.NavLinksContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: Footer_NavLinksContainer;
    ${[t.pb(0), t.pt(0)]}
    width: 70%;
    margin-right: 15%;
    margin-left: 15%;
    display: flex;
    justify-content: center;
    color: #223f7c;

    ${t.mq.sm} {
    }

    ${t.mq.lg} {
    }
  `;
});

Styled.ResourceContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: Footer_ResourceContainer
    ${t.mt(0)}
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
  `;
});

Styled.Title = styled.div(props => {
  const t = props.theme;
  return css`
    label: Footer_TitleContainer;
    ${[t.pt(4), t.pb(1)]}
    width: 100%;
    display: flex;
    justify-content: center;

    h2 {
      ${t.pl(0)}
      width: 300px;
      font-size: 1.125rem;
      line-height: 1.5rem;
      font-family: bellota text;
      color: #172a4f;
      text-align: center;
    }
  `;
});

Styled.LinksSection = styled.div(props => {
  const t = props.theme;
  return css`
    label: Footer_ResourceLinksSection;
    ${t.pt(2)};
    display: flex;
    flex-direction: column;
    width: 90%;
    margin-right: 5%;
    margin-left: 5%;
    height: 330px;
    border-top: 1px solid red;

    ${t.mq.xs} {
      height: 250px;
      flex-direction: row;
      justify-content: center;
    }

    ${t.mq.sm} {
      width: 70%;
      margin-right: 15%;
      margin-left: 15%;
    }

    ${t.mq.lg} {
      width: 80%;
      margin-right: 10%;
      margin-left: 10%;
    }
  `;
});

Styled.LeftResourceLinks = styled.div(props => {
  const t = props.theme;
  return css`
    label: Footer_LeftResourceLinksContainer;
    ${[t.pl(4)]}
    min-width: 200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    ${t.mq.xs} {
      ${[t.pl(2)]}
      width: 60%;
    }
  `;
});

Styled.RightResourceLinks = styled.div(props => {
  const t = props.theme;
  return css`
    label: Footer_RightResourceLinksContainer;
    ${[t.pr(0), t.pl(4)]}
    min-width: 133px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    ${t.mq.xs} {
      ${[t.pl(2)]}
      width: 40%;
    }
  `;
});

Styled.ResourceLink = styled.div(props => {
  const t = props.theme;
  return css`
    label: Footer_ExternalLink;
    ${[t.py(0), t.pr(0), t.pl(0)]}
    color: #223F7C;
    font-size: 0.875rem;
    line-height: 1.375rem;

    a {
      font-family: "Bellota Text";

      &:hover {
        color: #172a4f;
      }
    }

    ${t.mq.lg} {
      font-size: 1rem;
      line-height: 1.375rem;
    }
  `;
});

Styled.ImageContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: Footer_ImageContainer;
    width: 40%;
    height: 500px;
    display: none;
    justify-content: flex-start;
    align-items: center;

    ${t.mq.lg} {
      display: flex;
    }

    img {
      ${[t.mr(4)]}
      height: 500px;
      width: auto;
      display: none;

      ${t.mq.lg} {
        display: block;
      }
    }
  `;
});
