import React from "react";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";

import GarmentZoomModal from "src/components/Garment/GarmentZoomModal";
import DailyGarmentInfo from "src/components/LandingPage/DailyGarmentInfo";
import DailyGarmentTitle from "src/components/LandingPage/DailyGarmentTitle";

import { useModalContext } from "src/context/ModalContext";
import { useDailyGarment } from "src/queryHooks/useGarments";
import useResizeObserver from "src/hooks/useResizeObserver";
import useImageDimensions from "src/hooks/useImageDimensions";
import useIntersectionObserver from "src/hooks/useIntersectionObserver";

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

  const { maxWidth: maxZoomedImgWidth } = useImageDimensions({
    imageLoaded,
    dimensions,
  });
  const { ref: sizeRef, width: currentWidth } = useResizeObserver();

  const imgRef = React.useRef<HTMLImageElement>(null!);
  const contentContainerRef = React.useRef<HTMLDivElement>(null!);

  const [addBottomMobileNavPadding, setaddBottomMobileNavPadding] =
    React.useState(false);

  React.useEffect(() => {
    // console.log("CONTENT REF", contentContainerRef);
    if (
      contentContainerRef?.current &&
      contentContainerRef.current.clientHeight
    ) {
      const hasBorders =
        contentContainerRef?.current?.clientHeight < windowHeight;
      const needsMargin = mediumScreen && !hasBorders;
      setaddBottomMobileNavPadding(needsMargin);
    } else {
      setaddBottomMobileNavPadding(false);
    }
  }, [contentContainerRef, mediumScreen, windowHeight]);

  /* ANIMATIONS */

  const dataRef = useIntersectionObserver(imgRef, {
    freezeOnceVisible: true,
  });

  const show = dataRef?.isIntersecting;

  /* HANDLE IMAGE DIMENSIONS */

  const onLoad = () => {
    setDimensions({
      height: imgRef.current.naturalHeight,
      width: imgRef.current.naturalWidth,
    });
    setImageLoaded(true);
  };

  React.useEffect(() => {
    // console.log("IMAGE REF", imgRef);
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

  // styling variables
  const isVeryShortScreen = windowHeight && windowHeight <= 630;
  const isShortScreen = windowHeight && windowHeight <= 800;
  const heightInVh = windowHeight / (windowHeight * 0.01);
  const styleVars = {
    isVeryShortScreen,
    isShortScreen,
    heightInVh,
    addPadding: addBottomMobileNavPadding,
    show,
  };

  // Image container can NOT be conditionally displayed (even if loading is slow)
  // because the imageRef cannot be used until img is rendered (don't forget!)
  return (
    <Styled.Container height={windowHeight}>
      <Styled.SubContainer height={windowHeight} ref={contentContainerRef}>
        <Styled.HomeContentContainer
          height={windowHeight}
          addBottomMobileNavPadding={addBottomMobileNavPadding}
        >
          <DailyGarmentTitle show={show} height={windowHeight} />
          <Styled.ImageCardContainer currentWidth={currentWidth}>
            <Styled.Card
              height={windowHeight ? windowHeight : 100}
              noImage={noImage}
              imageLoaded={imageLoaded}
              ref={sizeRef}
            >
              {noImage || !imageLoaded ? (
                <Skeleton
                  variant="rectangular"
                  width="calc((100vh - 160px) * 0.82)"
                  height="calc(100vh - 160px)"
                  sx={{
                    bgcolor: "rgba(211, 217, 229, 0.5)",
                    borderRadius: "8px",
                  }}
                />
              ) : null}
              <Styled.DisplayedImage
                height={windowHeight ? windowHeight : 100}
                noImage={noImage}
                width={maxZoomedImgWidth}
                onClick={handleZoom}
              >
                <img
                  ref={imgRef}
                  src={imageUrl}
                  alt={garment ? garment.garmentTitle : "garment"}
                  onLoad={onLoad}
                />
              </Styled.DisplayedImage>
            </Styled.Card>
          </Styled.ImageCardContainer>
          <DailyGarmentInfo
            height={windowHeight ? windowHeight : 100}
            garment={garment}
            show={show}
          />
        </Styled.HomeContentContainer>
      </Styled.SubContainer>
    </Styled.Container>
  );
};

export default HomeContent;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.Container = styled.div((props: any) => {
  const t = props.theme;
  const heightInVh = props.height / (props.height * 0.01);
  const shortMediumScreen = props.height <= 630; // and is between md and xl width
  return css`
    label: DailyGarment_Container;
    display: flex;
    width: 100%;
    height: ${heightInVh}vh;
    align-items: center;
    justify-content: center;
    background-color: #020b1c;

    ${t.mq.md} {
      min-height: ${shortMediumScreen ? "630px" : "unset"};
    }
  `;
});

Styled.SubContainer = styled.div((props: any) => {
  const t = props.theme;
  const heightInVh = props.height / (props.height * 0.01);
  const shortMediumScreen = props.height <= 630; // and is between md and xl width
  return css`
    label: DailyGarment_SubContainer;
    display: flex;
    width: 100%;
    min-height: min(${heightInVh}vh, 800px);
    align-items: center;
    justify-content: center;
    background-color: white;

    ${t.mq.md} {
      min-height: ${shortMediumScreen
        ? "630px"
        : "min(${heightInVh}vh, 800px)"};
    }

    ${t.mq.xl} {
      min-height: min(${heightInVh}vh, 800px);
    }
  `;
});

Styled.HomeContentContainer = styled.div((props: any) => {
  const t = props.theme;
  const shortScreen = props.height <= 800;
  const addPadding = props.addBottomMobileNavPadding;
  return css`
    label: DailyGarment_HomeContentContainer;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    max-width: 1500px;
    padding-bottom: ${addPadding ? "64px" : "0px"};

    ${t.mq.md} {
      height: ${shortScreen ? "100%" : "94%"};
      justify-content: ${shortScreen ? "space-between" : "flex-start"};
      ${t.pb(0)};
    }

    ${t.mq.xl} {
      height: 100%;
      padding-right: 2%;
      padding-left: 2%;
      flex-direction: row;
      justify-content: center;
    }

    ${t.mq.gxl} {
      padding-right: 5%;
      padding-left: 5%;
    }
  `;
});

Styled.ImageCardContainer = styled.div((props: any) => {
  const t = props.theme;
  const currentWidth = props.currentWidth;
  return css`
    label: DailyGarment_CardContainer;
    display: flex;
    justify-content: center;

    ${t.mq.xl} {
      width: min(46%, calc(${currentWidth}px + 32px));
    }

    ${t.mq.xxl} {
      width: min(46%, calc(${currentWidth}px + 32px));
    }
  `;
});

Styled.Card = styled.div((props: any) => {
  const heightInVh = props.height / (props.height * 0.01);
  const display = props.noImage ? "none" : "flex";
  const shortScreen = props.height <= 800;
  const subtractMedium = shortScreen ? "40vh" : "414px";
  const t = props.theme;
  return css`
    label: Card;
    display: ${display};
    flex-direction: column;
    align-items: center;
    background-color: #d3d9e5;
    border-radius: 4px;
    width: auto;
    max-height: calc(${heightInVh}vh - 316px);
    max-width: min(500px, 95vw, 100%);
    position: relative;
    z-index: 0;

    ${t.mq.md} {
      max-height: max(calc(${heightInVh}vh - ${subtractMedium}), 378px);
      min-height: 378px;
    }

    ${t.mq.xl} {
      max-height: max(calc(${heightInVh}vh - 120px), 510px);
      min-height: 510px;
    }
  `;
});

Styled.DisplayedImage = styled.div((props: any) => {
  const t = props.theme;
  const heightInVh = props.height / (props.height * 0.01);
  const display = props.noImage ? "none" : "flex";
  const shortScreen = props.height <= 800;
  const subtractMedium = shortScreen ? "40vh" : "414px";
  return css`
    label: Garment_DisplayedImage;
    background-color: rgba(211, 217, 229, 0.5);
    display: ${display};
    position: relative;
    max-width: min(500px, 95vw, 100%);
    max-height: calc(${heightInVh}vh - 316px);
    border-radius: 4px;
    z-index: 1;

    ${t.mq.md} {
      max-height: max(calc(${heightInVh}vh - ${subtractMedium}), 378px);
      min-height: 378px;
    }

    ${t.mq.xl} {
      max-height: max(calc(${heightInVh}vh - 120px), 510px);
      min-height: 510px;
    }

    &:hover {
      cursor: pointer;
      transform: scale(1.005);
    }

    img {
      max-width: 95vw;
      max-height: calc(${heightInVh}vh - 316px);
      border-radius: 4px;

      ${t.mq.xs} {
        max-width: min(500px, 95vw, 100%);
      }

    ${t.mq.md} {
      max-height: max(calc(${heightInVh}vh - ${subtractMedium}), 378px);
      min-height: 378px;
    }

    ${t.mq.xl} {
      max-height: max(calc(${heightInVh}vh - 120px), 510px);
      min-height: 510px;
    }
  `;
});
