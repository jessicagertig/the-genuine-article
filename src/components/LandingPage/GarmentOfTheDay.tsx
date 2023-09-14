import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useSpring, useTransition, animated, to } from "@react-spring/web";

import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import ZoomOutMapOutlinedIcon from "@mui/icons-material/ZoomOutMapOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";

import GarmentZoomModal from "src/components/Garment/GarmentZoomModal";

import { useModalContext } from "src/context/ModalContext";
import { useDailyGarment } from "src/queryHooks/useGarments";
import useIntersectionObserver from "src/hooks/useIntersectionObserver";
import useImageDimensions from "src/hooks/useImageDimensions";

interface HomeContentProps {
  windowHeight: number;
  windowWidth: number;
}

const HomeContent: React.FC<HomeContentProps> = ({ windowHeight }) => {
  const { openModal, removeModal } = useModalContext();
  const { data: garment } = useDailyGarment();

  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [dimensions, setDimensions] = React.useState({
    height: 0,
    width: 0,
  });

  const theme = useTheme();
  const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { maxHeight, maxWidth } = useImageDimensions({
    imageLoaded,
    dimensions,
  });
  const imgRef = React.useRef<HTMLImageElement>(null!);
  const triggerRef = React.useRef<HTMLDivElement>(null!);
  const dataRef = useIntersectionObserver(triggerRef, {
    freezeOnceVisible: true,
  });

  const resize = useSpring({
    from: { scale: 1, translate: "0%" },
    to: async (next, cancel) => {
      await next({ scale: dataRef?.isIntersecting ? 0.85 : 1 });
      await next({ translate: dataRef?.isIntersecting ? "-7.5%" : "0%" });
    },
  });


  const onLoad = () => {
    setDimensions({
      height: imgRef.current.naturalHeight,
      width: imgRef.current.naturalWidth,
    });
    setImageLoaded(true);
  };

  React.useEffect(() => {
    console.log("IMAGE REF", imgRef);
    if (imgRef.current && imgRef.current.complete) {
      onLoad();
    }
  }, [imgRef]);

  const imageUrl =
    garment && garment.imageUrls ? garment.imageUrls.mainImageUrl : "";
  const noImage = imageUrl === "" || imageUrl === undefined;

  const handleZoom = () => {
    const modal = (
      <GarmentZoomModal
        onClose={() => removeModal()}
        garmentTitle={garment?.garmentTitle}
        imageUrl={imageUrl}
        responsiveFullscreen={mediumScreen}
      />
    );

    openModal(modal);
  };
  const garmentInfo = () => {
    const content = (
      <>
        <Styled.HeaderContainer>
          <Styled.InfoTitleContainer>
            <Styled.InfoTitle>{garment?.garmentTitle}</Styled.InfoTitle>
          </Styled.InfoTitleContainer>
          <Styled.IconButtonContainer>
            <Link to={`/garments/${garment?.id}`} target="_blank">
              <IconButton
                sx={{ color: "white", height: "32px", width: "32px" }}
              >
                <OpenInNewOutlinedIcon />
              </IconButton>
            </Link>
          </Styled.IconButtonContainer>
        </Styled.HeaderContainer>
        <Styled.InfoItem>
          <p>
            c. {garment?.beginYear}
          </p>
          <p><span>{garment?.cultureCountry}</span></p>
        </Styled.InfoItem>
      </>
    );
    // if (!mediumScreen) {
    //   return transitions((style, item) =>
    //     item ? <Styled.Info style={style}>{content}</Styled.Info> : null
    //   );
    // } else {
      return <Styled.Info><Styled.InfoSubContainer>{content}</Styled.InfoSubContainer></Styled.Info>
    // }
  };

  // Image container can NOT be conditionally displayed (even if loading is slow)
  // because the imageRef cannot be used until img is rendered (don't forget!)
  return (
    <Styled.HomeContentContainer height={windowHeight}>
      <Styled.ContentTitleContainer>
        <h2>Garment of the Day</h2>
      </Styled.ContentTitleContainer>
      <Styled.Card height={windowHeight} noImage={noImage} imageLoaded={imageLoaded}>
        {noImage || !imageLoaded ? (
          <Skeleton
            variant="rectangular"
            width="calc((100vh - 160px) * 0.82)"
            height="calc(100vh - 160px)"
            sx={{ bgcolor: "rgba(211, 217, 229, 0.5)", borderRadius: "8px" }}
          />
        ) : null}
        <Styled.DisplayedImage
          height={maxHeight ? maxHeight : 100}
          noImage={noImage}
          width={maxWidth}
        >
          <img
            ref={imgRef}
            src={imageUrl}
            alt={garment ? garment.garmentTitle : "garment"}
            onLoad={onLoad}
          />
        </Styled.DisplayedImage>
        <Styled.EnlargeButton>
          <IconButton
            edge="start"
            onClick={handleZoom}
            aria-label="zoom"
            sx={{
              color: "white",
              backgroundColor: "rgba(23, 42, 79, 0.1)",
              "&:hover": {
                backgroundColor: "rgba(23, 42, 79, 0.2)",
              },
            }}
          >
            <ZoomOutMapOutlinedIcon />
          </IconButton>
        </Styled.EnlargeButton>
        {garmentInfo()}
      </Styled.Card>
      <div ref={triggerRef} style={{ marginBottom: "48px" }} />
    </Styled.HomeContentContainer>
  );
};

export default HomeContent;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.HomeContentContainer = styled.div((props: any) => {
  const heightInVh = props.height / (props.height * 0.01);
  return css`
    label: HomeContentContainer;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: ${heightInVh}vh;
    align-items: center;
  `;
});

Styled.ContentTitleContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: HomeContentContainer;
    display: flex;
    width: 100%;
    height: 72px;
    justify-content: center;
    ${t.py(5)}

    h2 {
      font-size: 1.75rem;
      color: #020b1c;
      letter-spacing: 0.01rem;
    }
  `;
});

Styled.Card = styled.div((props: any) => {
  const t = props.theme;
  const heightInVh = props.height / (props.height * 0.01);
  const display = props.noImage ? "none" : "flex";
  return css`
    display: ${display};
    flex-direction: column;
    align-items: space-between;
    background-color: blue;
    border-radius: 8px;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
    max-width: 92vw;
    width: auto;
    max-height: calc(${heightInVh}vh - 120px);
    position: relative;
    z-index: 0;

    ${t.mq.md} {
    }
  `;
});

Styled.EnlargeButton = styled.div(() => {
  return css`
    display: block;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 3;

    &:hover {
      display: block;
      cursor: pointer;
    }
  `
})

Styled.ImageSection = styled(animated.div)((props: any) => {
  const t = props.theme;
  return css`
    label: DailyGarment_ImageSection;
    display: flex;
    justify-content: center;

    ${t.mq.md} {
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }
  `;
});

Styled.DisplayedImage = styled(animated.div)((props: any) => {
  const t = props.theme;
  const heightInVh = props.height / (props.height * 0.01);
  const display = props.noImage ? "none" : "flex";
  return css`
    label: Garment_DisplayedImage;
    background-color: rgba(211, 217, 229, 0.5);
    display: ${display};
    position: relative;
    max-width: 92vw;
    max-height: calc(${heightInVh}vh - 120px);
    border-radius: 8px;
    z-index: 1;

    img {
      max-width: 92vw;
      max-height: calc(${heightInVh}vh - 120px);
      border-radius: 8px;
    }

  `;
});

Styled.Info = styled(animated.div)((props: any) => {
  const t = props.theme;
  const heightInVh = props.height / (props.height * 0.01);
  return css`
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;

    ${t.mq.md} {
    }
  `;
});

Styled.InfoSubContainer = styled.div`
  label: Garment_InfoHeaderContainer;
  opacity: 0;
  transition: opacity 0.5s;
  width: 100%;
  height: 25%;
  padding-right: 5%;
  padding-left: 5%;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 36px 36px 8px 8px;
  &:hover {
    opacity: 1;
    transition: opacity 0.5s;
    cursor: pointer;
  }

`;

Styled.HeaderContainer = styled.div`
  label: Garment_InfoHeaderContainer
  width: 100%;
  margin-top: 16px;
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
  return css`
    label: Garment_InfoTitle;
    ${[t.pt(3), t.pb(1)]}
    font-family: "Sorts Mill Goudy";
    color: white;
    font-size: 1.5rem;
    line-height: 2rem;
    letter-spacing: 0.05rem;
  `;
});

Styled.IconButtonContainer = styled.div((props) => {
  const t = props.theme;
  return css`
    label: Garment_InfoIconButton;
    display: flex;
    justify-content: flex-end;
    width: 20%;
    margin-top: 8px;
  `;
});

Styled.InfoItem = styled.div((props: any) => {
  const t = props.theme;
  return css`
    label: Garment_InfoItem;
    display: flex;
    flex-direction: column;
    width: 100%;
    color: white;
    font-size: 1rem;
    line-height: 1.375rem;
    font-family: "bellota text";

    p {
      ${[t.pr(2)]}
      margin-top: -4px;

      span {
        font-style: italic;
      }
    }
  `;
});
