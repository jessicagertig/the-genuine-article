import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { NavLink } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import bookcaseImage from "src/assets/GirlsBookcaseImg.png";
import readingGirlImage from "src/assets/girlWithBook.png";

interface AdminFooterProps {}

const AdminFooter: React.FC<AdminFooterProps> = props => {

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

  const styles = {
    transition: "font-size 0.2s ease",
    fontFamily: "Bellota Text",
    fontSize: "1rem",
    paddingBottom: "24px",

    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgba(211, 217, 229, 0.25)",
      fontSize: "1.05rem",
    },
    "&:visited": {
      color: "#172a4f",
    },
    "&:link": {
      color: "#172a4f",
    },
  };

  const externalLinks = [
    {name: "The Metropolitan Museum of Art", to: "https://www.metmuseum.org/art/collection/search"},
    {name: "Victoria and Albert Museum", to: "https://www.vam.ac.uk/collections"},
    {name: "Philadeliphia Museum of Art", to: "https://www.philamuseum.org/collection"},
    {name: "The Kyoto Costume Institute", to: "https://www.kci.or.jp/en/archives/digital_archives/"},
    {name: "Los Angeles County Museum of Art", to: "https://collections.lacma.org/"},
    {name: "The Museum at FIT", to: "https://fashionmuseum.fitnyc.edu/objects"},
    {name: "Cincinnati Art Museum", to: "https://www.cincinnatiartmuseum.org/art/explore-the-collection"},
    {name: "The Smithsonian", to: "https://www.si.edu/collections"},
    {name: "Maryland Center for History and Culture", to: "https://www.mdhistory.org/digital-resource/"},
    {name: "The Royal Ontario Museum", to: "https://collections.rom.on.ca/objects"},
    {name: "RISD Museum", to: "https://risdmuseum.org/art-design/collection"},
    {name: "Newfields", to: "https://discovernewfields.org/"},
    {name: "UNT Digital Library", to: "https://digital.library.unt.edu/explore/collections/"},
  ]
  
  const resourceLinks = (
    externalLinks.map(link => 
      <Styled.ResourceLink key={link.name}>
        <a href={link.to} target="_blank" rel="noreferer">{link.name}</a>
      </Styled.ResourceLink>
    )
  )

  return (
    <Styled.MainContainer>
      <Styled.ImageContainer>
        {isMediumScreen ? (
          <img src={readingGirlImage} alt="girl standing with book"/>
        ) : (
          <img src={bookcaseImage} alt="girls standing by bookcase"/>
        )}
      </Styled.ImageContainer>
      <Styled.ContentContainer>
        <Styled.ResourceContainer>
          <Styled.Title>
            <h2>Resources</h2>
          </Styled.Title>
          <Styled.ResourceLinksContainer>
            {resourceLinks}
          </Styled.ResourceLinksContainer>
        </Styled.ResourceContainer>
        <Styled.NavLinksContainer>
          {links.map(link => (
            <NavLink to={link.path} key={link.name} style={styles}>
              {link.name}
            </NavLink>
          ))}
        </Styled.NavLinksContainer>
      </Styled.ContentContainer>
    </Styled.MainContainer>
  );
};

export default AdminFooter;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.MainContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_Container;
    ${[t.pb(8), t.pt(4), t.pl(8)]}
    height: 550px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: rgba(251, 233, 239, 1);
  `;
});

Styled.ImageContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_ImageContainer;
    width: 50%;
    height: 550px;
    margin-top: 0px;
    display: none;
    justify-content: flex-start;
    align-items: center;

    ${t.mq.sm} {
      height: 500px;
      width: 25%;
      display: flex;
    }
    
    ${t.mq.lg} {
      margin-top: -100px;
    }
    
    img {
      margin-bottom: 24px;
      margin-right: 12px;
      height: 600px;
      width: auto;
      display: none;

      ${t.mq.sm} {
        display: flex;
        height: 450px;
        width: auto;
      }

      ${t.mq.lg} {
        margin-bottom: 24px;
        margin-left: 24px;
        height: 600px;
      }
    }
  `;
});

Styled.ContentContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_ContentContainer;
    ${[t.py(4), t.pr(12)]}
    width: 100%;
    min-height: 250px;
    display: flex;
    justify-content: flex-end;

    ${t.mq.sm} {
      ${[t.mt(12)]}
      width: 75%;
    }

    ${t.mq.lg} {
      width: 66%;
    }
  `;
});

Styled.NavLinksContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_Container;
    ${[t.pb(8), t.pt(4), t.pl(8)]}
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: #223F7C;

    ${t.mq.sm} {
      width: 25%;
    }

    ${t.mq.lg} {
      width: 34%;
    }
  `;
});


Styled.ResourceContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_ResourceContainer
    ${t.mt(10)}
    width: 66%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    max-height: 550px;
  `;
});

Styled.Title = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_TitleContainer;
    ${[t.pb(2), t.pt(4), t.pl(8)]}
    width: 100%;
    display: flex;

    h2 {
        ${t.pl(2)}
        width: 300px;
        font-size: 1.125rem;
        line-height: 1.5rem; 
        font-weight: bold;
        font-family: bellota text;
        color: #172a4f;
        border-bottom: 1px solid red;
      }
  `;
});


Styled.ResourceLinksContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_Container;
    ${[t.pb(8), t.pl(8)]}
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-height: 500px;
    flex-wrap: nowrap;

    ${t.mq.sm} {
      flex-wrap: wrap;
    }
  `;
});

Styled.ResourceLink = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_ExternalLink;
    ${[t.py(1), t.pr(12), t.pl(2)]}
    color: #223F7C;
    font-size: 1rem;

    a {
      font-family: "Bellota Text";
      
      &:hover {
        color: #172a4f;
      }
    }

    ${t.mq.md} {
      font-size: 1rem;
      line-height: 1.375rem;
    }
  `;
});


// when image is added use media query to set its display to none when smaller screen
