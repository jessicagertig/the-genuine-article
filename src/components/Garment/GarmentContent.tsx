import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import IconButton from "@mui/material/IconButton";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined';
import Link from "@mui/material/Link";

import GarmentZoomModal from "src/components/Garment/GarmentZoomModal";
import { GarmentData } from "src/types";
import { useModalContext } from "src/context/ModalContext";

interface GarmentContentProps {
  garment: GarmentData | undefined;
}

const GarmentContent: React.FC<GarmentContentProps> = ({ garment }) => {
  const { openModal, removeModal } = useModalContext();

  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down('md'));
  
  type Item = {
    name: string;
    value: any;
  };

  const items: Item[] = [
    { name: "Materials", value: garment?.materials },
    { name: "Colors", value: garment?.colors },
    { name: "Museum/Collection", value: garment?.collection },
    { name: "Link", value: garment?.collectionUrl },
    { name: "Designer/Maker", value: garment?.creator },
    { name: "Credit Line/Source", value: garment?.source },
    { name: "Collection No.", value: garment?.itemCollectionNo },
  ];

  const itemNodes: JSX.Element[] = garment
    ? items.map(item => {
        if (item.name === "Colors" || item.name === "Materials") {
          const list = item ? item.value : [];
          const listToString = list.length > 0 ? list.join(", ") : "";
          return (
            <Styled.InfoItem key={item.name}>
              <p>
                <span>{item.name}: </span> {listToString}
              </p>
            </Styled.InfoItem>
          );
        } else if (item.name === "Link") {
          return (
            <Styled.InfoItem key={item.name}>
              <p>
                <span>{item.name}: </span>
                <a href={item.value} target="_blank" rel="noreferrer">
                  {item.value}
                </a>
              </p>
            </Styled.InfoItem>
          );
        } else {
          return (
            <Styled.InfoItem key={item.name}>
              <p>
                <span>{item.name}: </span>
                {item.value}
              </p>
            </Styled.InfoItem>
          );
        }
      })
    : [];

  const itemDescription = () => {
    const item: Item = { name: "Description", value: garment?.description };
    const lines = item.value ? item.value.split("\n") : [];
    return (
      <Styled.InfoItem key={item.name}>
        {lines.map((line: string, index: number) => (
          <p key={index} className="description">
            {line}
          </p>
        ))}
      </Styled.InfoItem>
    );
  };

  const handleZoom = () => {
    const imageUrl = garment && garment.imageUrls ? garment.imageUrls.mainImageUrl : "";

    const modal = (
      <GarmentZoomModal
        onClose={() => removeModal()}
        garmentTitle={garment?.garmentTitle ? garment.garmentTitle : ""}
        imageUrl={imageUrl}
        responsiveFullscreen={fullscreen}
      />
    );

    openModal(modal);
  }

  return (
    <Styled.GarmentContainer>
      <Styled.ImagesSection>
        <Styled.DisplayedImage>
          <img
            src={garment?.imageUrls?.largeUrl}
            alt={garment ? garment.garmentTitle : "garment"}
            onClick={handleZoom}
          />
        </Styled.DisplayedImage>
        <Styled.ThumbGallery></Styled.ThumbGallery>
      </Styled.ImagesSection>
      <Styled.InfoSection>
        <Styled.InfoContainer>
          <Styled.HeaderContainer>
            <Styled.InfoTitleContainer>
              <Styled.InfoTitle>{garment?.garmentTitle}</Styled.InfoTitle>
            </Styled.InfoTitleContainer>
            <Styled.IconButtonContainer>
              <Link
                target="_blank"
                href={garment?.collectionUrl}
                rel="noreferrer"
              >
                <IconButton sx={{ color: "white" }}>
                  <OpenInNewOutlinedIcon />
                </IconButton>
              </Link>
            </Styled.IconButtonContainer>
          </Styled.HeaderContainer>
          <Styled.InfoContent>
            <Styled.InfoItem>
              <p className="culture">{garment?.cultureCountry}</p>
            </Styled.InfoItem>
            <Styled.InfoItem>
              <p className="date">c. {garment?.beginYear}</p>
            </Styled.InfoItem>
            <Styled.Description>{itemDescription()}</Styled.Description>
          </Styled.InfoContent>
          <Styled.InfoContent>
            <Styled.Subheader>
              <h3>Details</h3>
            </Styled.Subheader>
            {itemNodes}
          </Styled.InfoContent>
        </Styled.InfoContainer>
      </Styled.InfoSection>
    </Styled.GarmentContainer>
  );
};

export default GarmentContent;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.GarmentContainer = styled.div(() => {
  return css`
    label: Garment_Container;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
  `;
});

Styled.ImagesSection = styled.section(() => {
  return css`
    label: Garment_ImagesSection;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
});

Styled.DisplayedImage = styled.div(props => {
  const t = props.theme;
  return css`
    label: Garment_DisplayedImage;
    background-color: rgba(211, 217, 229, 0.5);
    display: flex;
    position: relative;
    width: 100vw;
    min-height: 300px;
    flex-shrink: 1;

    ${t.mq.xs} {
      width: 500px;
      height: 609px;
      min-height: 609px;
    }

    img {
      width: 100vw;
      max-width: 480px;
      max-height: 575px;

      ${t.mq.xs} {
        width: 500px;
        height: 609px;
        max-width: 500px;
        max-height: 609px;
      }
    }

    &:hover {
      cursor: pointer;
    }
  `;
});

Styled.ThumbGallery = styled.div(props => {
  const t = props.theme;
  return css`
    label: Garment_ImagesGallery;
    ${t.m(4)}
    width: 320px;
    height: 64px;
    display: flex;
    flex-shrink: 1;

    ${t.mq.xs} {
      width: 500px;
    }
  `;
});

Styled.ThumbImage = styled.div(props => {
  const t = props.theme;
  return css`
    label: Garment_ThumbImage;
    ${t.pt(1)}
    width: 64px;
    height: 64px;
    margin-right: 23px;
    background-color: rgba(211, 217, 229, 0.5);

    &:last-of-type {
      margin-right: 0px;
    }
  `;
});

Styled.InfoSection = styled.section(props => {
  const t = props.theme;
  return css`
    label: Garment_InfoSection;
    ${t.py(20)}
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: ${t.color.blue[700]};
  `;
});

Styled.InfoContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: Garment_InfoSection;
    ${[t.p(4), t.mb(6)]}
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    background-color: 
    border-radius: 8px;

    ${t.mq.sm} {
      margin-right: 6%;
      margin-left: 6%;
      width: 88%;
    }
  `;
});

Styled.HeaderContainer = styled.div`
  label: Garment_InfoHeaderContainer
  width: 100%;
`;

Styled.InfoTitleContainer = styled.div(() => {
  return css`
    label: Garment_InfoHeader;
    display: flex;
    justify-content: flex-start;
    width: 60%;
    margin-right: 20%;
  `;
});

Styled.InfoTitle = styled.h2(props => {
  const t = props.theme;
  return css`
    label: Garment_InfoTitle;
    ${[t.py(2), t.pl(4)]}
    font-family: "goudy";
    color: white;
    font-size: 1.75rem;
    font-weight: 200;
  `;
});

Styled.IconButtonContainer = styled.div(() => {
  return css`
    label: Garment_InfoIconButton;
    display: flex;
    justify-content: flex-end;
    width: 20%;
  `;
});

Styled.InfoContent = styled.div(props => {
  const t = props.theme;
  return css`
    label: Garment_InfoContent;
    ${t.pt(2)}
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `;
});

Styled.Description = styled.div(props => {
  const t = props.theme;
  return css`
    label: Garment_Description;
    ${[t.pb(6), t.pt(2)]}
    width: 100%;
    border-bottom: 1px solid white;
  `;
});

Styled.Subheader = styled.div(props => {
  const t = props.theme;
  return css`
    label: Garment_DetailsSubheader;
    width: 100%;

    h3 {
      ${[t.pt(8), t.pb(4), t.px(4)]}
      color: white;
      font-family: "bellota text";
      font-size: 1.375rem;
    }
  `;
});

Styled.InfoItem = styled.div(props => {
  const t = props.theme;
  return css`
    label: Garment_InfoItem;
    display: flex;
    flex-direction: column;
    width: 100%;
    color: white;
    font-size: 1.125rem;
    line-height: 1.5rem;
    font-family: "bellota text";

    span {
      color: ${t.color.blue_gray[200]};
    }

    a {
      overflow-wrap: break-word;
      &:hover {
        text-decoration: underline;
      }
    }

    p {
      ${[t.py(2), t.px(4)]}
    }

    .culture {
      ${t.py(0)}
      font-style: italic;
    }

    .date {
      ${t.pt(0)}
    }
  `;
});
