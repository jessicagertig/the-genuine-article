import React from "react";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import GarmentZoomModal from "src/components/Garment/GarmentZoomModal";
import DailyGarmentInfo from "src/components/LandingPage/DailyGarmentInfo";
import DailyGarmentTitle from "src/components/LandingPage/DailyGarmentTitle";
import DailyGarmentSkeleton from "src/components/LandingPage/DailyGarmentSkeleton";

import { useModalContext } from "src/context/ModalContext";
import useResizeObserver from "src/hooks/useResizeObserver";
import useImageDimensions from "src/hooks/useImageDimensions";
import useIntersectionObserver from "src/hooks/useIntersectionObserver";
import { useProgressiveImage } from "src/hooks/useProgressiveImage";
import { GarmentData } from "src/types";

export interface StylingVariables {
  isVeryShortScreen: boolean;
  isShortScreen: boolean;
  heightInVh: number;
  addPadding: boolean;
  show: boolean | undefined;
  isLoading: boolean;
}

interface HomeContentProps {
  windowHeight: number;
  windowWidth: number;
  garment: GarmentData;
}

const HomeContent: React.FC<HomeContentProps> = ({ windowHeight, garment }) => {
  const { openModal, removeModal } = useModalContext();

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
  const placeholderSrc = garment?.imageUrls?.tinyMainUrl;
  const src = garment?.imageUrls?.mainImageUrl;
  const { currentSrc, isLoading } = useProgressiveImage(placeholderSrc as string, src as string);

  const isLoadingState: boolean = !!(
    placeholderSrc && isLoading
  );

  console.log("Daily Garment Image Info", {
    images: garment?.imageUrls,
    isLoadingState,
    currentSrc,
    placeholderSrc,
  });

  const imgRef = React.useRef<HTMLImageElement>(null!);
  const contentContainerRef = React.useRef<HTMLDivElement>(null!);
  const intersectionRef = React.useRef<HTMLDivElement>(null!);

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

  const dataRef = useIntersectionObserver(intersectionRef, {
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

  const handleZoom = () => {
    const modal = (
      <GarmentZoomModal
        onClose={() => removeModal()}
        garmentTitle={garment?.garmentTitle}
        imageUrl={currentSrc}
        responsiveFullscreen={mediumScreen}
      />
    );

    openModal(modal);
  };

  // styling variables
  const height = windowHeight ?? 100;
  const isVeryShortScreen = height <= 630;
  const isShortScreen = height <= 800;
  const heightInVh = height / (height * 0.01);
  const styleVars: StylingVariables = {
    isVeryShortScreen,
    isShortScreen,
    heightInVh,
    addPadding: addBottomMobileNavPadding,
    show,
    isLoading: isLoadingState,
  };

  return (
    <Styled.SubContainer styleVars={styleVars} ref={contentContainerRef}>
      <Styled.HomeContentContainer
        styleVars={styleVars}
        addBottomMobileNavPadding={addBottomMobileNavPadding}
        ref={intersectionRef}
      >
        <DailyGarmentTitle styleVars={styleVars} />
        <Styled.ImageCardContainer currentWidth={currentWidth}>
          <Styled.DisplayedImage
            styleVars={styleVars}
            width={maxZoomedImgWidth}
            onClick={handleZoom}
            ref={sizeRef}
          >
            <img
              ref={imgRef}
              src={currentSrc}
              alt={garment?.garmentTitle}
              onLoad={onLoad}
            />
          </Styled.DisplayedImage>
        </Styled.ImageCardContainer>
        <DailyGarmentInfo styleVars={styleVars} garment={garment} />
      </Styled.HomeContentContainer>
    </Styled.SubContainer>
  );
};

export default HomeContent;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

type Props = { theme: Theme; styleVars: StylingVariables };

Styled.SubContainer = styled.div(({ theme, styleVars }: Props) => {
  const t = theme;
  const { heightInVh, isVeryShortScreen } = styleVars;
  return css`
    label: DailyGarment_SubContainer;
    display: flex;
    width: 100%;
    min-height: min(${heightInVh}vh, 800px);
    align-items: center;
    justify-content: center;
    background-color: white;

    ${t.mq.md} {
      min-height: ${isVeryShortScreen
        ? "630px"
        : `min(${heightInVh}vh, 800px)`};
    }

    ${t.mq.xl} {
      min-height: min(${heightInVh}vh, 800px);
    }
  `;
});

Styled.HomeContentContainer = styled.div(({ theme, styleVars }: Props) => {
  const t = theme;
  const { addPadding, isShortScreen } = styleVars;
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
      height: ${isShortScreen ? "100%" : "94%"};
      justify-content: ${isShortScreen ? "space-between" : "flex-start"};
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

Styled.ImageCardContainer = styled.div(
  ({ theme, currentWidth }: { theme: Theme; currentWidth: number }) => {
    const t = theme;
    return css`
      label: DailyGarment_ImageCardContainer;
      display: flex;
      justify-content: center;

      ${t.mq.xl} {
        width: min(44%, calc(${currentWidth}px + 32px));
      }

      ${t.mq.xxl} {
        width: min(46%, calc(${currentWidth}px + 32px));
      }
    `;
  }
);

Styled.DisplayedImage = styled.div(({ theme, styleVars }: Props) => {
  const t = theme;
  const { heightInVh, isShortScreen, isLoading } = styleVars;
  return css`
    label: Garment_DisplayedImage;
    display: flex;
    position: relative;
    justify-content: center;
    align-content: center;
    z-index: 1;
    
    ${t.mq.md} {
      min-height: 378px;
    }

    ${t.mq.xl} {
      min-height: 510px;
    }


    &:hover {
      cursor: pointer;
      transform: scale(1.005);
    }

    &:after {
      content: "";
      position: absolute;
      inset: 0;
      backdrop-filter: ${isLoading ? "blur(7px)" : "blur(0px)"};
      transition: ${isLoading ? "none" : "backdrop-filter 0.7s linear"};
    }

    img {
      max-width: 95vw;
      max-height: calc(${heightInVh}vh - 316px);
      border-radius: 4px;

      ${t.mq.xs} {
        max-width: min(500px, 95vw, 100%);
      }

    ${t.mq.md} {
      max-height: max(calc(${heightInVh}vh - ${
    isShortScreen ? "40vh" : "414px"
  }), 378px);
      min-height: 378px;
    }

    ${t.mq.xl} {
      max-height: max(calc(${heightInVh}vh - 120px), 510px);
      min-height: 510px;
    }
  `;
});
