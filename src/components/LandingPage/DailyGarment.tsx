import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useSpring, useTrail, animated } from "@react-spring/web";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import ZoomOutMapOutlinedIcon from "@mui/icons-material/ZoomOutMapOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import GarmentZoomModal from "src/components/Garment/GarmentZoomModal";
import DailyGarmentInfo from "src/components/LandingPage/DailyGarmentInfo";
import Divider from "src/components/shared/Divider";


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
    freezeOnceVisible: false,
  });

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
    config: { duration: 500 },
  });

  const enter = useTrail(show ? 2 : 0, {
    from: {
      opacity: 0,
      transform: "translate3d(-100px,0px, 0)",
      width: "100%",
      color: "white",
    },
    to: {
      opacity: 1,
      transform: "translate3d(0px, 0px, 0)",
      width: "100%",
      color: show ? "#020b1c" : "white",
    },
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
    <Styled.Container height={windowHeight}>
      <Styled.SubContainer height={windowHeight}>
        <Styled.HomeContentContainer
          height={windowHeight}
          spaceBelow={spaceBelow}
        >
          <Styled.ContentTitleContainer height={maxHeight ? maxHeight : 100}>
            {enter.map((props, index) => (
              <animated.div key={index} style={{ ...props, width: "100%" }}>
                {index === 0 && <h2>Garment of the Day</h2>}
                {index === 1 && <Divider color="#020b1c" />}
              </animated.div>
            ))}
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
          <Styled.InfoCardContainer height={maxHeight ? maxHeight : 100}>
            <DailyGarmentInfo
              maxHeight={maxHeight ? maxHeight : 100}
              garment={garment}
              trail={trail}
            />
          </Styled.InfoCardContainer>
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
  return css`
    label: HomeContentContainer;
    display: flex;
    width: 100%;
    height: ${heightInVh}vh;
    align-items: center;
    justify-content: center;
    background-color: #020b1c;
  `;
});

Styled.SubContainer = styled.div((props: any) => {
  const t = props.theme;
  const heightInVh = props.height / (props.height * 0.01);
  return css`
    label: HomeContentContainer;
    display: flex;
    width: 100%;
    height: auto;
    min-height: min(${heightInVh}vh, 800px);
    align-items: center;
    justify-content: center;
    background-color: white;

    ${t.mq.xl} {
      height: min(${heightInVh}vh, 760px);
    }
  `;
});

Styled.HomeContentContainer = styled.div((props: any) => {
  const t = props.theme;
  const shortScreen = props.height <= 800;
  return css`
    label: HomeContentContainer;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 96%;
    align-items: center;
    justify-content: flex-start;
    max-width: 1500px;

    ${t.mq.md} {
      height: ${shortScreen ? `${props.height}px` : "94%"};
      justify-content: ${shortScreen ? "space-between" : "flex-start"};
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

Styled.ContentTitleContainer = styled(animated.div)((props: any) => {
  const t = props.theme;
  const shortScreen = props.height <= 800;
  return css`
    label: HomeContentContainer;
    display: flex;
    flex-direction: column;
    width: min(500px, 95vw, 100%);
    height: 40px;
    justify-content: flex-end;
    align-items: flex-end;
    ${[t.mt(2), t.mb(4)]};

    ${t.mq.xs} {
      margin-bottom: ${shortScreen ? "2vh" : "24px"};
    }

    ${t.mq.md} {
      height: ${shortScreen ? "auto" : "64px"};
      margin-top: ${shortScreen ? "2vh" : "36px"};
      margin-bottom: ${shortScreen ? "2vh" : "36px"};
    }

    ${t.mq.xl} {
      width: 27%;
      height: 64px;
      margin-bottom: 30%;
      ${t.mt(9)}    
    }

    ${t.mq.xxl} {
      width: 28%;
    }
    
    div {
      display: flex;
      justify-content: flex-end;
    }

    h2 {
      font-size: 1.375rem;
      line-height: 2.25rem;
      color: inherit;
      letter-spacing: 0.01rem;
      line-height: 2rem;
      ${[t.pb(2)]};

      ${t.mq.md} {
        font-size: ${shortScreen ? "1.375rem" : "1.75rem"};
      }

      ${t.mq.xl} {
        ${[t.pl(4), t.pb(2)]};
      }
    }
  `;
});

Styled.ImageCardContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: DailyGarment_CardContainer;
    display: flex;
    justify-content: center;

    ${t.mq.xl} {
      width: 46%;
    }

    ${t.mq.xxl} {
      width: 44%;
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
      max-height: calc(${heightInVh}vh - ${subtractMedium});
    }

    ${t.mq.xl} {
      max-height: calc(${heightInVh}vh - 120px);
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
    transform: scale(1);

    ${t.mq.md} {
      max-height: calc(${heightInVh}vh - ${subtractMedium});
    }

    ${t.mq.xl} {
      max-height: calc(${heightInVh}vh - 120px);
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
        max-height: calc(${heightInVh}vh - ${subtractMedium});
      }

      ${t.mq.xl} {
        max-height: calc(${heightInVh}vh - 120px);
      }
    }
  `;
});

Styled.InfoCardContainer = styled.div((props: any) => {
  const t = props.theme;
  const shortScreen = props.height <= 800;
  return css`
    label: DailyGarment_InfoCardContainer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    width: min(500px, 95vw, 100%);
    max-height: 180px;
    ${[t.mt(4), t.mb(2)]};

    ${t.mq.xs} {
      ${[t.mt(6)]}
    }

    ${t.mq.sm} {
      ${t.my(8)}
      max-height: 200px;
    }

    ${t.mq.md} {
      max-height: ${shortScreen ? "26vh" : "224px"};
      margin-top: ${shortScreen ? "2vh" : "36px"};
      margin-bottom: ${shortScreen ? "2vh" : "36px"};
    }

    ${t.mq.xl} {
      width: 27%;
    }

    ${t.mq.xxl} {
      width: 28%;
    }
  `;
});

Styled.InfoCard = styled.div(props => {
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
