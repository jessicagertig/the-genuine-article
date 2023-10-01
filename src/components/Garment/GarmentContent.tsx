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
import ImageToolbar from "src/components/Garment/ImageToolbar";

interface GarmentContentProps {
  garment: GarmentData | undefined;
  loading: boolean;
  isDark: boolean;
}

const GarmentContent: React.FC<GarmentContentProps> = props => {
  const { garment, loading, isDark } = props;
  const { openModal, removeModal } = useModalContext();

  const theme = useTheme();
  const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));

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
            <Styled.InfoItem key={item.name} isDark={isDark}>
              <p>
                <span>{item.name}: </span> {listToString}
              </p>
            </Styled.InfoItem>
          );
        } else if (item.name === "Link") {
          return (
            <Styled.InfoItem key={item.name} isDark={isDark}>
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
            <Styled.InfoItem key={item.name} isDark={isDark}>
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
      <Styled.InfoItem key={item.name} isDark={isDark}>
        <Accordian text={mainText} dark={isDark} />
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
          <>
            <Styled.DisplayedImage>
              <img
                src={garment?.imageUrls?.largeUrl}
                alt={garment ? garment.garmentTitle : "garment"}
                onClick={handleZoom}
              />
            </Styled.DisplayedImage>
            <ImageToolbar
              garmentMainImgUrl={
                garment?.imageUrls ? garment?.imageUrls?.mainImageUrl : ""
              }
              garmentTitle={garment ? garment.garmentTitle : "garment"}
              mediumScreen={mediumScreen}
            />
          </>
        )}
        {/* <Styled.ThumbGallery></Styled.ThumbGallery> */}
      </Styled.ImagesSection>
      <Styled.InfoSection isDark={isDark}>
        <Styled.InfoContainer isDark={isDark}>
          <Styled.HeaderContainer>
            <Styled.InfoTitleContainer isDark={isDark}>
              <Styled.InfoTitle isDark={isDark}>
                {garment?.garmentTitle}
              </Styled.InfoTitle>
            </Styled.InfoTitleContainer>
            <Styled.IconButtonContainer>
              <Link
                target="_blank"
                href={garment?.collectionUrl}
                rel="noreferrer"
              >
                <IconButton sx={{ color: isDark ? "white" : "#020b1c" }}>
                  <OpenInNewOutlinedIcon />
                </IconButton>
              </Link>
            </Styled.IconButtonContainer>
          </Styled.HeaderContainer>
          <Styled.InfoContent>
            <Styled.InfoItem isDark={isDark}>
              <p className="culture">{garment?.cultureCountry}</p>
            </Styled.InfoItem>
            <Styled.InfoItem isDark={isDark}>
              <p className="date">c. {garment?.beginYear}</p>
            </Styled.InfoItem>
            <Styled.Description isDark={isDark}>
              {itemDescription()}
            </Styled.Description>
          </Styled.InfoContent>
          <Styled.InfoContent>
            <Styled.Subheader isDark={isDark}>
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
    mheight: 100%;
    flex-direction: column;
    align-items: center;
    ${t.mt(4)};

    ${t.mq.xs} {
      ${t.mt(6)};
    }

    ${t.mq.xl} {
      flex-direction: row;
      align-items: flex-start;
      justify-content: center;
      width: 90%;
      margin-left: 5%;
      margin-right: 5%;
      ${t.mt(16)};
    }

    ${t.mq.gxl} {
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
    ${[t.mb(4)]};
    display: flex;
    height: max-content;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;

    ${t.mq.xl} {
      width: 50%;
      margin-left: 3%;
      margin-top: 8px;
      margin-bottom: 200px;
    }

    ${t.mq.gxl} {
      width: 43%;
      margin-left: 5%;
      margin-top: 8px;
    }
  `;
});

Styled.DisplayedImage = styled.div((props: any) => {
  const t = props.theme;
  return css`
    label: Garment_DisplayedImage;
    background-color: white;
    display: flex;
    position: relative;
    width: calc(100vw - (100vw - 100%));
    max-height: 575px;
    min-height: 220px;
    flex-shrink: 1;
    justify-content: center;
    ${[t.px(4)]};

    ${t.mq.xxs} {
      max-height: 609px;
      min-height: 335px;
    }

    ${t.mq.sm} {
      width: 532px;
      max-height: 609px;
      min-height: 609px;
      ${t.mt(2)};
    }

    img {
      width: calc(100vw - (100vw - 100%));
      max-width: 480px;
      max-height: 575px;

      ${t.mq.xs} {
        max-width: 500px;
        max-height: 609px;
      }

      ${t.mq.sm} {
        width: 500px;
        height: 609px;
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
  const isDark = props.isDark;
  return css`
    label: Garment_InfoSection;
    ${[t.pt(10), t.pb(24)]}
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: ${isDark ? "#020b1c" : "white"};

    ${t.mq.xl} {
      width: 44%;
      margin-right: 3%;
      ${[t.pt(4)]}
      justify-content: flex-start;
    }

    ${t.mq.gxl} {
      width: 47%;
      margin-left: 5%;
      margin-top: 8px;
    }
  `;
});

Styled.InfoContainer = styled.div((props: any) => {
  const t = props.theme;
  const isDark = props.isDark;
  return css`
    label: Garment_InfoSection;
    ${[t.px(4), t.mb(6)]}
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    background-color: ${isDark ? "#020b1c" : "white"};
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
      ${t.mt(6)}
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
    width: 80%;
  `;
});

Styled.InfoTitle = styled.h2((props: any) => {
  const t = props.theme;
  const isDark = props.isDark;
  return css`
    label: Garment_InfoTitle;
    ${[t.pt(2), t.pb(2), t.pl(4)]}
    font-family: "Sorts Mill Goudy";
    color: ${isDark ? "white" : "#020b1c"};
    font-size: 2rem;
    letter-spacing: 0.05rem;
  `;
});

Styled.IconButtonContainer = styled.div(() => {
  return css`
    label: Garment_InfoIconButton;
    display: flex;
    justify-content: flex-end;
    width: 20%;
    padding-top: 4px;
  `;
});

Styled.InfoContent = styled.div(() => {
  return css`
    label: Garment_InfoContent;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `;
});

Styled.Description = styled.div((props: any) => {
  const t = props.theme;
  const isDark = props.isDark;
  return css`
    label: Garment_Description;
    ${[t.pb(6), t.pt(2)]}
    width: 100%;
    border-bottom: 1px solid ${isDark ? "white" : "#020b1c"};
  `;
});

Styled.Subheader = styled.div((props: any) => {
  const t = props.theme;
  const isDark = props.isDark;
  return css`
    label: Garment_DetailsSubheader;
    width: 100%;

    h3 {
      ${[t.pt(8), t.pb(4), t.px(4)]}
      color: ${isDark ? "white" : "#020b1c"};
      font-family: "Bellota text";
      font-size: 1.375rem;
    }
  `;
});

Styled.InfoItem = styled.div((props: any) => {
  const t = props.theme;
  const isDark = props.isDark;
  return css`
    label: Garment_InfoItem;
    display: flex;
    flex-direction: column;
    width: 100%;
    color: ${isDark ? "white" : "#020b1c"};
    font-size: 1.125rem;
    line-height: 1.5rem;
    font-family: "bellota text";

    span {
      color: ${isDark ? "#BFC9D9" : "#4C5F80"};
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

    .description {
      font-size: 1rem;
      letter-spacing: 0.03rem;
    }

    .culture {
      ${t.py(0)}
      margin-top: -4px;
      font-style: italic;
    }

    .date {
      ${t.pt(0)}
      margin-top: -6px;
    }
  `;
});
