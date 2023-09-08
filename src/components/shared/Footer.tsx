import React from "react";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";

import { NavLink, useNavigate } from "react-router-dom";
import SvgIcon from "@mui/material/SvgIcon";

import darkLogo from "src/assets/lightHeaderLogo.png";
import lightLogo from "src/assets/darkHeaderLogo.png";

interface FooterProps {
  scrollToTop: () => void;
  dark?: boolean;
}

const Footer: React.FC<FooterProps> = props => {

  const navigate = useNavigate();
  const isDark = props.dark !== undefined ? props.dark : true;

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
    <Styled.Button onClick={handleClick} isDark={isDark}>
      Log out
    </Styled.Button>
  );

  // These are for the public and have been curated by ease of search
  // and/or quality of collection images & website user experience
  const externalLinks = [
    {
      name: "Metropolitan Museum of Art",
      to: "https://www.metmuseum.org/art/collection/search",
    },
    {
      name: "Victoria and Albert Museum",
      to: "https://www.vam.ac.uk/collections",
    },
    {
      name: "The Museum at FIT",
      to: "https://fashionmuseum.fitnyc.edu/objects",
    },
    {
      name: "Kyoto Costume Institute",
      to: "https://www.kci.or.jp/en/archives/digital_archives/",
    },
    {
      name: "Philadephia Museum of Art",
      to: "https://www.philamuseum.org/collection",
    },
    {
      name: "The John Bright Collection",
      to: "https://www.thejohnbrightcollection.co.uk/",
    },
    {
      name: "Irma G. Bowen Collection",
      to: "https://scholars.unh.edu/bowen_collection/",
    },
    {
      name: "Colonial Williamsburg",
      to: "https://emuseum.history.org/groups/costumes",
    },
  ];

  const resourceLinks = externalLinks.map(link => (
    <Styled.ResourceLink key={link.name} isDark={isDark}>
      <a href={link.to} target="_blank" rel="noreferrer">
        {link.name}
      </a>
    </Styled.ResourceLink>
  ));

  const svg = (
    <SvgIcon
      sx={{
        color: isDark ? "#d3d9e5" : "#020b1c",
        height: "55px",
        width: "55px",
        marginBottom: 1.5,
      }}
    >
      <path d="M 17 14 L 12 9 L 7 14 L 6 13 l 6 -6 l 6 6 Z" />
    </SvgIcon>
  );

  return (
    <Styled.Container isDark={isDark}>
      <Styled.MainContainer>
        <Styled.AboutContainer isDark={isDark}>
          <img
            src={isDark ? darkLogo : lightLogo}
            alt="the genuine article logo"
          />
          <p>
            The Genuine Article is a digital collection of images of Western
            clothing from the 1800s - each record includes historical details
            and a link to the source collection or museum.
          </p>
        </Styled.AboutContainer>
        <Styled.ContentContainer>
          <Styled.NavLinksContainer isDark={isDark}>
            <Styled.Title isDark={isDark}>
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
            <Styled.Title isDark={isDark}>
              <h2>External Resources</h2>
            </Styled.Title>
            <Styled.ResourceLinksSection>
              <Styled.ResourceLinks isDark={isDark}>
                {resourceLinks}
              </Styled.ResourceLinks>
            </Styled.ResourceLinksSection>
          </Styled.ResourceLinksContainer>
        </Styled.ContentContainer>
      </Styled.MainContainer>
      <Styled.BottomBarContainer>
        <Styled.CircleButton
          onClick={props.scrollToTop}
          role="button"
          aria-label="scroll to top"
          isDark={isDark}
        >
          {svg}
          <Styled.ButtonText isDark={isDark}>TOP</Styled.ButtonText>
        </Styled.CircleButton>
      </Styled.BottomBarContainer>
    </Styled.Container>
  );
};

export default Footer;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.Container = styled.div((props: { theme: Theme; isDark: boolean }) => {
  const t = props.theme;
  const dark = props.isDark;
  return css`
    label: Footer_Container;
    height: 475px;
    width: 100%;
    padding-right: 2%;
    padding-left: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${dark ? "#020b1c" : "white"};

    ${t.mq.md} {
      height: 475px;
    }
  `;
});

Styled.MainContainer = styled.div(
  (props: { theme: Theme; isDark: boolean }) => {
    const t = props.theme;
    return css`
      label: Footer_Container;
      height: 325px;
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

      ${t.mq.lg} {
        width: 85%;
      }

      ${t.mq.xl} {
        width: 80%;
      }
    `;
  }
);

/* About Section
------------------------*/

Styled.AboutContainer = styled.div(
  (props: { theme: Theme; isDark: boolean }) => {
    const t = props.theme;
    const dark = props.isDark;
    return css`
      label: Footer_AboutContainer;
      ${[t.pt(8)]}
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      ${t.mq.md} {
        width: 33%;
        margin-left: 5%;
        align-items: flex-start;
      }

      img {
        ${[t.mt(1), t.ml(1), t.mb(2)]};
        height: 84px;
        width: 207px;
      }

      p {
        color: ${dark ? "#d3d9e5" : "#172a4f"};
        width: 80%;
        display: none;
        ${t.pt(1)}

        ${t.mq.md} {
          display: block;
          font-size: 1rem;
          line-height: 1.375rem;
        }
      }
    `;
  }
);

/* Container for Site Nav & Resource Links
---------------------------------------------- */

Styled.ContentContainer = styled.div(
  (props: { theme: Theme; isDark: boolean }) => {
    const t = props.theme;
    return css`
      label: Footer_ContentContainer;
      ${[t.pt(8)]}
      width: 100%;
      height: 100%;
      display: flex;

      ${t.mq.sm} {
        width: 80%;
      }

      ${t.mq.md} {
        width: 60%;
      }
    `;
  }
);

/* SITE NAV
-------------------------- */

Styled.NavLinksContainer = styled.div(
  (props: { theme: Theme; isDark: boolean }) => {
    const t = props.theme;
    const dark = props.isDark;
    return css`
      label: Footer_NavLinksContainer;
      ${[t.pl(4)]}
      width: 90%;
      display: flex;
      color: ${dark ? "white" : "#020b1c"};
      justify-content: space-around;
      flex-wrap: wrap;

      ${t.mq.md} {
        width: 37%;
        flex-direction: column;
        justify-content: flex-start;
      }

      .nav-link {
        ${[t.pl(2), t.pb(1)]}
        font-size: 1.125rem;
        line-height: 1.5rem;
        font-family: bellota text;
        color: ${dark ? "white" : "#172a4f"};

        &:hover {
          cursor: pointer;
          color: ${dark ? "white" : "#020b1c"};
        }

        ${t.mq.md} {
          font-size: 1rem;
          line-height: 1.5rem;
          color: ${dark ? "#d3d9e5" : "#172a4f"};
        }
      }
    `;
  }
);

Styled.Button = styled.div((props: { theme: Theme; isDark: boolean }) => {
  const t = props.theme;
  const dark = props.isDark;
  return css`
    ${[t.pl(2), t.pb(1)]}
    font-size: 1.125rem;
    line-height: 1.5rem;
    font-family: bellota text;
    color: ${dark ? "white" : "#172a4f"};
    background-color: ${dark ? "#020b1c" : "white"};

    &:hover {
      cursor: pointer;
      color: ${dark ? "white" : "#020b1c"};
    }

    ${t.mq.md} {
      color: ${dark ? "#d3d9e5" : "#172a4f"};
      font-size: 1rem;
    }
  `;
});

/* RESOURCE LINKS
-------------------------- */
Styled.ResourceLinksContainer = styled.div(
  (props: { theme: Theme; isDark: boolean }) => {
    const t = props.theme;
    return css`
      label: Footer_ResourceLinksContainer;
      width: 60%;
      margin-left: 3%;
      display: none;
      flex-direction: column;
      align-items: center;

      ${t.mq.md} {
        display: flex;
      }

      ${t.mq.lg} {
        margin-left: 6%;
        width: 57%;
      }
    `;
  }
);

Styled.Title = styled.div((props: { theme: Theme; isDark: boolean }) => {
  const t = props.theme;
  const dark = props.isDark;
  return css`
    label: Footer_ResourceTitle;
    ${[t.pt(4), t.pb(1), t.mb(2)]};
    width: 86%;
    margin-right: 14%;
    display: none;
    border-bottom: 1px solid ${dark ? "#4c5f80" : "#899AB8"};
    
    h2 {
      ${t.pl(2)}
      font-size: 1.125rem;
      line-height: 1.5rem;
      font-family: bellota text;
      color: ${dark ? "white" : "#020b1c"};
    }

    ${t.mq.md} {
      display: flex;
    }
  `;
});

Styled.ResourceLinksSection = styled.div(() => {
  return css`
    label: Footer_ResourceLinksSection;
    display: flex;
    justify-content: center;
    width: 100%;
  `;
});

Styled.ResourceLinks = styled.div((props: { theme: Theme }) => {
  const t = props.theme;
  return css`
    label: Footer_ResourceLinksContainer;
    ${[t.pl(4)]}
    min-width: 100px;
    width: 100%;
    display: flex;
    flex-direction: column;

    ${t.mq.xs} {
      ${[t.pl(2)]}
    }
  `;
});

Styled.ResourceLink = styled.div((props: { theme: Theme; isDark: boolean }) => {
  const t = props.theme;
  const dark = props.isDark;
  return css`
    label: Footer_ExternalLink;
    ${[t.pb(1)]}
    color: ${dark ? "#D3D9E5" : "#172a4f"};
    font-size: 1rem;
    line-height: 1.5rem;

    a {
      font-family: "Bellota Text";

    &:hover {
      cursor: pointer;
      color: ${dark ? "white" : "#020b1c"};
    }
  `;
});

Styled.BottomBarContainer = styled.div(() => {
  return css`
    label: Footer_TopBarContainer;
    height: 75px;
    margin-bottom: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
  `;
});

Styled.CircleButton = styled.div((props: { theme: Theme; isDark: boolean }) => {
  const t = props.theme;
  const dark = props.isDark;
  return css`
    label: Footer_CircleButton;
    border: 2px solid ${dark ? "white" : "#172a4f"};
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
      border-color: ${dark ? "white" : "#020b1c"};
    }

    ${t.mq.sm} {
      border-color: ${dark ? "#d3d9e5" : "#172a4f"};
    }
  `;
});

Styled.ButtonText = styled.div((props: { theme: Theme; isDark: boolean }) => {
  const dark = props.isDark;
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
    color: ${dark ? "#d3d9e5" : "#020b1c"};
  `;
});
