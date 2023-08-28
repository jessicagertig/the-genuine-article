import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";

import IconButton from "@mui/material/IconButton";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import Link from "@mui/material/Link";

import GarmentZoomModal from "src/components/Garment/GarmentZoomModal";
import Accordian from "src/components/shared/Accordian";
import { GarmentData } from "src/types";
import { useModalContext } from "src/context/ModalContext";

interface GarmentContentProps {
  garment: GarmentData | undefined;
  loading: boolean;
}

const GarmentContent: React.FC<GarmentContentProps> = props => {
  const { garment, loading } = props;
  const { openModal, removeModal } = useModalContext();

  const theme = useTheme();
  const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const dark = useMediaQuery(theme.breakpoints.down("lg"));

  const colors = {
    primaryText: dark ? "white" : "#172a4f",
    secondaryText: dark ? "#BFC9D9" : "#4C5F80",
    textReverse: dark ? "#172a4f" : "white",
    background: dark ? "#020b1c" : "white",
  };

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
            <Styled.InfoItem key={item.name} colors={colors}>
              <p>
                <span>{item.name}: </span> {listToString}
              </p>
            </Styled.InfoItem>
          );
        } else if (item.name === "Link") {
          return (
            <Styled.InfoItem key={item.name} colors={colors}>
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
            <Styled.InfoItem key={item.name} colors={colors}>
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
    const mainText = lines.map((line: string, index: number) => (
      <p key={index} className="description">
        {line}
      </p>
    ));
    return (
      <Styled.InfoItem key={item.name} colors={colors}>
        <Accordian text={mainText} dark={dark} />
      </Styled.InfoItem>
    );
  };

  const handleZoom = () => {
    const imageUrl =
      garment && garment.imageUrls ? garment.imageUrls.mainImageUrl : "";

    const modal = (
      <GarmentZoomModal
        onClose={() => removeModal()}
        garmentTitle={garment?.garmentTitle ? garment.garmentTitle : ""}
        imageUrl={imageUrl}
        responsiveFullscreen={mediumScreen}
      />
    );

    openModal(modal);
  };

  return (
    <Styled.GarmentContainer>
      <Styled.ImagesSection>
        {loading ? (
          <Skeleton
            variant="rectangular"
            width={mediumScreen ? "calc((100vh - 160px) * 0.82)" : "500px"}
            height={mediumScreen ? "calc(100vh - 160px)" : "609px"}
            sx={{
              bgcolor: "rgba(211, 217, 229, 0.9)",
              borderRadius: "8px",
              my: "32px",
            }}
          />
        ) : (
          <Styled.DisplayedImage>
            <img
              src={garment?.imageUrls?.largeUrl}
              alt={garment ? garment.garmentTitle : "garment"}
              onClick={handleZoom}
            />
          </Styled.DisplayedImage>
        )}
        {/* <Styled.ThumbGallery></Styled.ThumbGallery> */}
      </Styled.ImagesSection>
      <Styled.InfoSection colors={colors}>
        <Styled.InfoContainer colors={colors}>
          <Styled.HeaderContainer>
            <Styled.InfoTitleContainer colors={colors}>
              <Styled.InfoTitle colors={colors}>
                {garment?.garmentTitle}
              </Styled.InfoTitle>
            </Styled.InfoTitleContainer>
            <Styled.IconButtonContainer>
              <Link
                target="_blank"
                href={garment?.collectionUrl}
                rel="noreferrer"
              >
                <IconButton sx={{ color: colors.primaryText, pt: 0 }}>
                  <OpenInNewOutlinedIcon />
                </IconButton>
              </Link>
            </Styled.IconButtonContainer>
          </Styled.HeaderContainer>
          <Styled.InfoContent>
            <Styled.InfoItem colors={colors}>
              <p className="culture">{garment?.cultureCountry}</p>
            </Styled.InfoItem>
            <Styled.InfoItem colors={colors}>
              <p className="date">c. {garment?.beginYear}</p>
            </Styled.InfoItem>
            <Styled.Description colors={colors}>
              {itemDescription()}
            </Styled.Description>
          </Styled.InfoContent>
          <Styled.InfoContent>
            <Styled.Subheader colors={colors}>
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

Styled.GarmentContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: Garment_Container;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;

    ${t.mq.xl} {
      flex-direction: row;
      align-items: flex-start;
      justify-content: center;
      width: 86%;
      margin-left: 7%;
      margin-right: 7%;
    }
  `;
});

Styled.ImagesSection = styled.section(props => {
  const t = props.theme;
  return css`
    label: Garment_ImagesSection;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    ${t.mq.xl} {
      width: 45%;
      margin-left: 5%;
      margin-top: 8px;
    }
  `;
});

Styled.DisplayedImage = styled.div((props: any) => {
  const t = props.theme;
  return css`
    label: Garment_DisplayedImage;
    background-color: rgba(211, 217, 229, 0.5);
    display: flex;
    position: relative;
    width: 100vw;
    max-height: 575px;
    min-height: 375px;
    border-radius: 6px;
    flex-shrink: 1;
    margin-bottom: 36px;

    ${t.mq.xxs} {
      min-height: 420px;
    }

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

Styled.ThumbGallery = styled.div((props: any) => {
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

Styled.ThumbImage = styled.div((props: any) => {
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

Styled.InfoSection = styled.section((props: any) => {
  const t = props.theme;
  const c = props.colors;
  return css`
    label: Garment_InfoSection;
    ${[t.pt(9), t.pb(24)]}
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: ${c.background};

    ${t.mq.xl} {
      width: 45%;
      margin-right: 5%;
      ${[t.pt(4), t.pb(20)]}
      justify-content: flex-start;
    }
  `;
});

Styled.InfoContainer = styled.div((props: any) => {
  const t = props.theme;
  const c = props.colors;
  return css`
    label: Garment_InfoSection;
    ${[t.px(4), t.mb(6)]}
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    background-color: ${c.background};
    border-radius: 8px;

    ${t.mq.sm} {
      margin-right: 6%;
      margin-left: 6%;
      width: 88%;
    }

    ${t.mq.xl} {
      width: 95%;
      margin-left: 0%;
      margin-right: 5%;
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

Styled.InfoTitle = styled.h2((props: any) => {
  const t = props.theme;
  const c = props.colors;
  return css`
    label: Garment_InfoTitle;
    ${[t.pb(2), t.pl(4)]}
    font-family: "goudy";
    color: ${c.primaryText};
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

Styled.InfoContent = styled.div((props: any) => {
  const t = props.theme;
  return css`
    label: Garment_InfoContent;
    ${t.pt(2)}
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `;
});

Styled.Description = styled.div((props: any) => {
  const t = props.theme;
  const c = props.colors;
  return css`
    label: Garment_Description;
    ${[t.pb(6), t.pt(2)]}
    width: 100%;
    border-bottom: 1px solid ${c.primaryText};
  `;
});

Styled.Subheader = styled.div((props: any) => {
  const t = props.theme;
  const c = props.colors;
  return css`
    label: Garment_DetailsSubheader;
    width: 100%;

    h3 {
      ${[t.pt(8), t.pb(4), t.px(4)]}
      color: ${c.primaryText};
      font-family: "bellota text";
      font-size: 1.375rem;
    }
  `;
});

Styled.InfoItem = styled.div((props: any) => {
  const t = props.theme;
  const c = props.colors;
  return css`
    label: Garment_InfoItem;
    display: flex;
    flex-direction: column;
    width: 100%;
    color: ${c.primaryText};
    font-size: 1.125rem;
    line-height: 1.5rem;
    font-family: "bellota text";

    span {
      color: ${c.secondaryText};
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
