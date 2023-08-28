import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { NavLink, useNavigate } from "react-router-dom";

// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";
import SvgIcon from "@mui/material/SvgIcon";

import bookcaseImage from "src/assets/GirlsBookcaseImg.png";

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

  type ResourceLinks = {
    name: string;
    to: string;
  };

  const linksLeft: ResourceLinks[] = [
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
    {
      name: "Irma G Bowen",
      to: "https://scholars.unh.edu/bowen_collection/",
    },
  ];

  const linksRight: ResourceLinks[] = [
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
    {
      name: "Colonial W",
      to: "https://emuseum.history.org/groups/costumes",
    },
    {
      name: "John Bright",
      to: "https://www.thejohnbrightcollection.co.uk/",
    },
  ];

  const resourceLinksLeft = linksLeft.map(link => (
    <Styled.ResourceLink key={link.name}>
      <a href={link.to} target="_blank" rel="noreferrer">
        {link.name}
      </a>
    </Styled.ResourceLink>
  ));

  const resourceLinksRight = linksRight.map(link => (
    <Styled.ResourceLink key={link.name}>
      <a href={link.to} target="_blank" rel="noreferrer">
        {link.name}
      </a>
    </Styled.ResourceLink>
  ));

  const svg = (
    <SvgIcon
      sx={{
        color: "white",
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
            <Styled.Title controlDisplay={true}>
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
        <Styled.ImageContainer>
          <img src={bookcaseImage} alt="girls standing by bookcase" />
        </Styled.ImageContainer>
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

Styled.Container = styled.div`
  label: AdminFooter_Container;
  height: 575px;
  width: 100%;
  padding-right: 2%;
  padding-left: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #172a4f;
`;

Styled.MainContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_Container;
    ${[t.pb(1), t.pl(1), t.mt(8)]}
    height: 425px;
    margin-top: 25px;
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
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
    flex-direction: column;
    align-items: center;

    ${t.mq.sm} {
      flex-direction: row;
      align-items: flex-start;
    }

    ${t.mq.lg} {
      width: 60%;
    }
  `;
});

/* SITE NAV
-------------------------- */

Styled.NavLinksContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_NavLinksContainer;
    ${[t.pl(6), t.pb(6), t.pt(0)]}
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    color: white;

    ${t.mq.xs} {
      width: 80%;
    }

    ${t.mq.sm} {
      ${[t.pb(0), t.pt(0)]}
      width: 40%;
      flex-direction: column;
      justify-content: flex-start;
    }

    .nav-link {
      font-size: 1.125rem;
      line-height: 1.5rem;
      font-family: bellota text;
      color: white;
      background-color: #172a4f;
      ${[t.pr(4), t.pb(1), t.pl(0)]}

      ${t.mq.sm} {
        ${[t.pl(2), t.pr(0)]}
      }

      &:hover {
        cursor: pointer;
        color: #d3d9e5;
      }
    }
  `;
});

Styled.Button = styled.div(props => {
  const t = props.theme;
  return css`
    ${[t.pl(0), t.pr(6)]}
    font-size: 1.125rem;
    line-height: 1.5rem;
    font-family: bellota text;
    color: white;
    background-color: #172a4f;

    ${t.mq.sm} {
      ${[t.pl(2), t.pr(0)]}
    }

    &:hover {
      cursor: pointer;
      color: #d3d9e5;
    }
  `;
});

/* RESOURCE LINKS
-------------------------- */
Styled.ResourceLinksContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_ResourceLinksContainer;
    ${[t.pl(4)]};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    ${t.mq.xs} {
      width: 80%;
    }

    ${t.mq.sm} {
      width: 60%;
    }
  `;
});

Styled.Title = styled.div((props: any) => {
  const t = props.theme;
  const noDisplay = props.controlDisplay ? props.controlDisplay : false;
  return css`
    label: AdminFooter_ResourceTitle;
    ${[t.pt(4), t.pb(1), t.mb(2)]};
    width: 86%;
    margin-right: 14%;
    display: ${noDisplay ? "none" : "flex"};
    border-bottom: 1px solid #4C5F80;

    ${t.mq.sm} {
      display: flex;
    }

    h2 {
      ${t.pl(2)}
      font-size: 1.125rem;
      line-height: 1.5rem;
      font-family: bellota text;
      color: white;
    }
  `;
});

Styled.ResourceLinksSection = styled.div(() => {
  return css`
    label: AdminFooter_ResourceLinksSection;
    display: flex;
    width: 100%;
  `;
});

Styled.ResourceLinks = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_ResourceLinks;
    ${[t.pl(2)]}
    width: 100%;
    display: flex;
    flex-direction: column;

    ${t.mq.xs} {
      width: 50%;
    }
  `;
});

Styled.ResourceLink = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_ResourceLink;
    ${[t.pb(1)]}
    color: #d3d9e5;
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
    width: 40%;
    height: 500px;
    display: none;
    justify-content: center;
    align-items: center;
    margin-top: 25px;

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

Styled.BottomBarContainer = styled.div(() => {
  return css`
    label: AdminFooter_BottomBarContainer;
    height: 75px;
    margin-bottom: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
  `;
});

Styled.CircleButton = styled.div(() => {
  return css`
    label: AdminFooter_CircleButton;
    border: 2px solid white;
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
      color: #d3d9e5;
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
    color: white;
  `;
});
