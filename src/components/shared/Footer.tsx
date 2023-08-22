import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { NavLink, useNavigate } from "react-router-dom";

// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";
import SvgIcon from "@mui/material/SvgIcon";

import logo from "src/assets/WhiteLogo.png";

interface AdminFooterProps {
  scrollToTop: () => void;
}

const AdminFooter: React.FC<AdminFooterProps> = props => {
  // const theme = useTheme();
  // const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();

  type Link = {
    name: string;
    path: string;
  };

  const links: Link[] = [
    { name: "Home", path: "/" },
    { name: "Garments", path: "/garments" },
    { name: "Admin", path: "/admin" },
  ];

  const handleClick = () => {
    navigate("/logout");
  };

  const logoutButton = (
    <Styled.Button onClick={handleClick}>Log out</Styled.Button>
  );

  const linksLeft = [
    {
      name: "MET",
      to: "https://www.metmuseum.org/art/collection/search",
    },
    {
      name: "VA",
      to: "https://www.vam.ac.uk/collections",
    },
    {
      name: "FIT",
      to: "https://fashionmuseum.fitnyc.edu/objects",
    },
    {
      name: "KCI",
      to: "https://www.kci.or.jp/en/archives/digital_archives/",
    },
    {
      name: "LACMA",
      to: "https://collections.lacma.org/",
    },
    {
      name: "ROM",
      to: "https://collections.rom.on.ca/objects",
    },
    {
      name: "MD Center",
      to: "https://www.mdhistory.org/digital-resource/",
    },
  ];

  const linksRight = [
    {
      name: "CAM",
      to: "https://www.cincinnatiartmuseum.org/art/explore-the-collection",
    },
    { name: "SI", to: "https://www.si.edu/collections" },
    { name: "RISD", to: "https://risdmuseum.org/art-design/collection" },
    {
      name: "UNT",
      to: "https://digital.library.unt.edu/explore/collections/",
    },
    { name: "Newfields", to: "https://discovernewfields.org/" },
    {
      name: "PhilaMuseum",
      to: "https://www.philamuseum.org/collection",
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
        color: "rgba(211, 217, 229)",
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
        <Styled.ImageContainer></Styled.ImageContainer>
        <Styled.AboutContainer>
          <img src={logo} />
          <p>
            The genuine article is a digital collection of images of Western
            clothing from the 1800s - each record includes historical details
            and a link to the source collection or museum.
          </p>
        </Styled.AboutContainer>
        <Styled.ContentContainer>
          <Styled.NavLinksContainer>
            <Styled.Title>
              <h2>Site</h2>
            </Styled.Title>
            {links.map(link => (
              <NavLink to={link.path} key={link.name} className="nav-link">
                {link.name}
              </NavLink>
            ))}
            {logoutButton}
          </Styled.NavLinksContainer>
          <Styled.ResourceLinksContainer>
            <Styled.Title>
              <h2>External Resources</h2>
            </Styled.Title>
            <Styled.ResourceLinksSection>
              <Styled.ResourceLinks>{resourceLinksLeft}</Styled.ResourceLinks>
              <Styled.ResourceLinks>{resourceLinksRight}</Styled.ResourceLinks>
            </Styled.ResourceLinksSection>
          </Styled.ResourceLinksContainer>
        </Styled.ContentContainer>
        <Styled.ImageContainer></Styled.ImageContainer>
      </Styled.MainContainer>
      <Styled.BottomBarContainer>
        <Styled.CircleButton
          onClick={props.scrollToTop}
          role="button"
          aria-label="scroll to top"
        >
          {svg}
          <Styled.ButtonText>TOP</Styled.ButtonText>
        </Styled.CircleButton>
      </Styled.BottomBarContainer>
    </Styled.Container>
  );
};

export default AdminFooter;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.Container = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_Container;
    height: 475px;
    width: 100%;
    padding-right: 2%;
    padding-left: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #172a4f;

    ${t.mq.md} {
      height: 475px;
    }
  `;
});

Styled.MainContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_Container;
    ${[t.pb(1), t.pl(1)]}
    height: 350px;
    margin-top: 50px;
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    ${t.mq.md} {
      flex-direction: row;
      margin-top: 32px;
    }
  `;
});

/* About Section
------------------------*/

Styled.AboutContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_AboutContainer;
    ${[t.py(1), t.pr(1), t.mt(12)]}
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    ${t.mq.md} {
      width: 40%;
      margin-left: 5%;
      align-items: flex-start;
    }

    ${t.mq.lg} {
      width: 33%;
    }

    img {
      ${[t.mt(1), t.ml(1), t.mb(2)]};
      height: 84px;
      width: 207px;
    }

    p {
      color: white;
      width: 80%;
      display: none;

      ${t.mq.md} {
        display: block;
      }
    }
  `;
});

/* Container for Site Nav & Resource Links
---------------------------------------------- */

Styled.ContentContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_ContentContainer;
    ${[t.py(1), t.pr(1), t.mt(12)]}
    width: 100%;
    height: 100%;
    display: flex;

    ${t.mq.sm} {
      width: 80%;
    }

    ${t.mq.md} {
      width: 55%;
    }

    ${t.mq.lg} {
      width: 47%;
    }
  `;
});

/* SITE NAV
-------------------------- */

Styled.NavLinksContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_NavLinksContainer;
    ${[t.pl(4), t.pb(0), t.pt(0)]}
    width: 90%;
    display: flex;
    color: white;
    justify-content: space-around;

    ${t.mq.md} {
      width: 37%;
      flex-direction: column;
      justify-content: flex-start;
    }

    .nav-link {
      font-size: 1.125rem;
      line-height: 1.5rem;
      font-family: bellota text;
      color: rgba(211, 217, 229);
      background-color: #172a4f;
      ${[t.pl(2), t.pb(1), t.pt(0)]}

      &:hover {
        cursor: pointer;
        color: rgba(211, 217, 229);
      }

      ${t.mq.md} {
        color: white;
      }
    }
  `;
});

Styled.Button = styled.div(props => {
  const t = props.theme;
  return css`
    ${[t.pl(2)]}
    font-size: 1.125rem;
    line-height: 1.5rem;
    font-family: bellota text;
    color: rgba(211, 217, 229);
    background-color: #172a4f;
    ${[t.pl(2), t.pb(1), t.pt(0)]}

    &:hover {
      cursor: pointer;
      color: rgba(211, 217, 229);
    }

    ${t.mq.md} {
      color: white;
    }
  `;
});

/* RESOURCE LINKS
-------------------------- */
Styled.ResourceLinksContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_ResourceLinksContainer;
    ${[t.pl(4), t.mt(0)]};
    width: 63%;
    display: none;
    flex-direction: column;
    align-items: center;

    ${t.mq.md} {
      display: flex;
    }
  `;
});

Styled.Title = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_ResourceTitle;
    ${[t.pt(4), t.pb(1), t.mb(2)]};
    width: 86%;
    margin-right: 14%;
    display: none;
    border-bottom: 1px solid #223f7c;

    h2 {
      ${t.pl(2)}
      font-size: 1.125rem;
      line-height: 1.5rem;
      font-family: bellota text;
      color: white;
    }

    ${t.mq.md} {
      display: flex;
    }
  `;
});

Styled.ResourceLinksSection = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_ResourceLinksSection;
    ${t.pt(0)};
    display: flex;
    flex-direction: column;
    width: 100%;

    ${t.mq.xs} {
      flex-direction: row;
      justify-content: center;
    }

    ${t.mq.lg} {
    }
  `;
});

Styled.ResourceLinks = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_LeftResourceLinksContainer;
    ${[t.pl(4)]}
    min-width: 100px;
    width: 100%;
    display: flex;
    flex-direction: column;

    ${t.mq.xs} {
      ${[t.pl(2)]}
      width: 50%;
    }
  `;
});

Styled.ResourceLink = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_ExternalLink;
    ${[t.py(0), t.pr(0), t.pl(0), t.pb(1)]}
    color: white;
    font-size: 1rem;
    line-height: 1.375rem;

    a {
      font-family: "Bellota Text";

      &:hover {
        color: white;
      }
    }

    ${t.mq.md} {
      font-size: 1.125rem;
      line-height: 1.5rem;
    }
  `;
});

Styled.ImageContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_ImageContainer;
    width: 10%;
    height: 400px;
    display: none;
    justify-content: center;
    align-items: center;
    margin-top: 25px;

    ${t.mq.lg} {
      display: flex;
    }

    img {
      ${[t.mr(4)]}
      height: 400px;
      width: auto;
      display: none;

      ${t.mq.lg} {
        display: block;
      }
    }
  `;
});

Styled.BottomBarContainer = styled.div(() => {
  return css`
    label: AdminFooter_TopBarContainer;
    height: 75px;
    margin-bottom: 25px;
    width: 100%;
    display: flex;
    justify-content: center;
  `;
});

Styled.CircleButton = styled.div(() => {
  return css`
    label: AdminFooter_CircleButton;
    border: 2px solid rgba(211, 217, 229);
    position: relative;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
      border-color: white;
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
    color: rgba(211, 217, 229);
  `;
});
