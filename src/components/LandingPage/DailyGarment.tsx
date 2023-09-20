import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useSpring, useTrail, animated } from "@react-spring/web";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import ZoomOutMapOutlinedIcon from "@mui/icons-material/ZoomOutMapOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import GarmentZoomModal from "src/components/Garment/GarmentZoomModal";
import DailyGarmentInfo from 'src/components/LandingPage/DailyGarmentInfo';

import { useModalContext } from "src/context/ModalContext";
import { useDailyGarment } from "src/queryHooks/useGarments";
import useResizeObserver from "src/hooks/useResizeObserver";
import useImageDimensions from "src/hooks/useImageDimensions";
import useIntersectionObserver from 'src/hooks/useIntersectionObserver';

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
  const largeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const verySmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const { maxHeight, maxWidth } = useImageDimensions({
    imageLoaded,
    dimensions,
  });
  const {
    ref: sizeRef,
    height: currentHeight,
    width: currentWidth,
  } = useResizeObserver();

  
  const imgRef = React.useRef<HTMLImageElement>(null!);
  
  const dataRef = useIntersectionObserver(imgRef, {
    freezeOnceVisible: false
  })
  
  const show = dataRef?.isIntersecting;
  const infoHeight = currentHeight && currentHeight * 0.25;
  const showMinHeight = verySmallScreen
    ? "140px"
    : smallScreen
    ? "155px"
    : "165px";
  const actualHeight =
    infoHeight && Math.max(infoHeight, parseInt(showMinHeight));

  let spaceBelow = false;
  if (largeScreen) {
    spaceBelow = false;
  } else if (currentHeight && actualHeight) {
    spaceBelow = windowHeight - (currentHeight + 132) > actualHeight;
  }

  const trail = useTrail(show ? 5 : 0, {
    delay: 500,
    from: {
      opacity: 0,
      transform: "translate3d(100px,0px, 0)",
      width: "100%",
      color: "white",
    },
    to: {
      opacity: 1,
      transform: "translate3d(0px, 0px, 0)",
      width: "100%",
      color: show ? "#020b1c" : "white",
    },
    config: { duration: 1000 },
  });

  const remove = useSpring({
    from: { opacity: 1 },
    to: { opacity: show ? 0 : 1 },
    config: { duration: 500 },
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

  // Image container can NOT be conditionally displayed (even if loading is slow)
  // because the imageRef cannot be used until img is rendered (don't forget!)
  return (
    <Styled.HomeContentContainer height={windowHeight} spaceBelow={spaceBelow}>
        <Styled.ContentTitleContainer>
          <h2>Garment of the Day</h2>
        </Styled.ContentTitleContainer>
        <Styled.ImageCardContainer>
          <Styled.Card
            height={maxHeight ? maxHeight : 100}
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
          </Styled.Card>
        </Styled.ImageCardContainer>
          <Styled.InfoCardContainer>
            <DailyGarmentInfo isIntersecting={dataRef?.isIntersecting} garment={garment} trail={trail} />
          </Styled.InfoCardContainer>
    </Styled.HomeContentContainer>
  );
};

export default HomeContent;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.HomeContentContainer = styled.div((props: any) => {
  const t = props.theme;
  const heightInVh = props.height / (props.height * 0.01);
  return css`
    label: HomeContentContainer;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: ${heightInVh}vh;
    align-items: center;
    justify-content: center;

    ${t.mq.xl} {
      width: 92%;
      margin-right: 4%;
      margin-left: 4%;
      background-color: white;
      justify-content: center;
      ${t.py(0)};
    }

    ${t.mq.gxl} {
      width: 84%;
      margin-right: 8%;
      margin-left: 8%;
    }

    ${t.mq.xxl} {
      width: 76%;
      margin-right: 12%;
      margin-left: 12%;
    }
  `;
});

Styled.ContentTitleContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: HomeContentContainer;
    display: flex;
    width: 30%;
    height: 64px;
    justify-content: center;
    ${t.pb(7)}
    color: #020b1c;

    ${t.mq.xxs} {
      ${t.pb(6)};
    }

    ${t.mq.xl} {
      justify-content: flex-end;
      border-bottom: 1px solid;
      align-items: flex-end;
      width: 30%;
      ${[t.pt(10), t.pb(2)]};
      color: unset;
    }

    h2 {
      font-size: 1.5rem;
      color: inherit;
      letter-spacing: 0.01rem;
      line-height: 2.66rem;

      ${t.mq.xxs} {
        font-size: 1.75rem;
      }

      ${t.mq.xl} {
        ${[t.pl(4)]};
      }
    }
  `;
});

Styled.ImageCardContainer = styled.div((props) => {
  const t = props.theme;
  return css`
    label: DailyGarment_CardContainer;
    display: flex;
    justify-content: center;

    ${t.mq.xl} {
      width: 40%;
    }
  `;
});

Styled.Card = styled.div((props: any) => {
  const heightInVh = props.height / (props.height * 0.01);
  const display = props.noImage ? "none" : "flex";
  return css`
    label: Card;
    display: ${display};
    flex-direction: column;
    align-items: flex-end;
    background-color: #d3d9e5;
    border-radius: 4px;
    max-width: 95vw;
    max-height: calc(${heightInVh}vh - 120px);
    position: relative;
    z-index: 0;
  `;
});

Styled.DisplayedImage = styled.div((props: any) => {
  const t = props.theme;
  const heightInVh = props.height / (props.height * 0.01);
  const display = props.noImage ? "none" : "flex";
  return css`
    label: Garment_DisplayedImage;
    background-color: rgba(211, 217, 229, 0.5);
    display: ${display};
    position: relative;
    max-width: 95vw;
    max-height: calc(${heightInVh}vh - 120px);
    border-radius: 4px;
    z-index: 1;

    ${t.mq.xs} {
      max-width: min(450px, 95vw);
    }

    img {
      max-width: 95vw;
      max-height: calc(${heightInVh}vh - 120px);
      border-radius: 4px;

      ${t.mq.xs} {
        max-width: min(450px, 95vw);
      }
    }
  `;
});

Styled.Tools = styled.div(() => {
  return css`
    label: DailyGarment_Tools;
    width: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
});

Styled.InfoCardContainer = styled.div((props) => {
  const t = props.theme;
  return css`
    label: DailyGarment_InfoCardContainer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    ${t.mq.xl} {
      width: 30%;
    }
  `;
});

Styled.InfoCard = styled.div((props) => {
  const t = props.theme;
  return css`
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    z-index: 2;

    ${t.mq.xl} {
      align-items: flex-start;
    }
  `;
});

Styled.Info = styled.div(() => {
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
  `;
});

Styled.InfoSubContainer = styled.div((props) => {
  const t = props.theme;
  return css`
    label: Garment_InfoSubContainer;
    flex-direction: column;
    position: relative;
    max-height: 170px;

    ${t.mq.xl} {
      width: 80%;
      ${t.pl(4)};
    }
  `;
})
