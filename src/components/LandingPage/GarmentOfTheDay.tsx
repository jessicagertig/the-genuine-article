import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useSpring, useTrail, animated } from "@react-spring/web";

import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import ZoomOutMapOutlinedIcon from "@mui/icons-material/ZoomOutMapOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SouthWestOutlinedIcon from "@mui/icons-material/SouthWestOutlined";

import GarmentZoomModal from "src/components/Garment/GarmentZoomModal";

import { useModalContext } from "src/context/ModalContext";
import { useDailyGarment } from "src/queryHooks/useGarments";
import useResizeObserver from "src/hooks/useResizeObserver";
import useImageDimensions from "src/hooks/useImageDimensions";

interface HomeContentProps {
  windowHeight: number;
  windowWidth: number;
}

const HomeContent: React.FC<HomeContentProps> = ({ windowHeight }) => {
  const { openModal, removeModal } = useModalContext();
  const { data: garment } = useDailyGarment();

  const [show, setShow] = React.useState(false);
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
  const {
    ref: sizeRef,
    height: currentHeight,
    width: currentWidth,
  } = useResizeObserver();

  const imgRef = React.useRef<HTMLImageElement>(null!);

  const infoHeight = currentHeight && currentHeight * 0.25;

  const changeDimensions = useSpring({
    from: {
      height: "48px",
      width: "48px",
      borderRadius: "0px 0px 0px 0px",
      paddingRight: "0%",
      paddingLeft: "0%",
      minHeight: "48px",
    },
    to: {
      height: show ? `${infoHeight}px` : "48px",
      width: show ? `${currentWidth}px` : "48px",
      borderRadius: show ? "36px 36px 8px 8px" : "0px 48px 0px 8px",
      paddingRight: show ? "5%" : "0%",
      paddingLeft: show ? "5%" : "0%",
      minHeight: show ? "155px" : "48px",
    },
    config: { duration: 500 },
  });

  const trail = useTrail(show ? 3 : 0, {
    delay: 250,
    from: {
      opacity: 0,
      transform: "translate3d(0px,-10px, 0)",
      width: "100%",
    },
    to: {
      opacity: 1,
      transform: "translate3d(0px, 0px, 0)",
      width: "100%",
    },
    config: { duration: 1000 },
  });

  const remove = useSpring({
    from: { opacity: 1 },
    to: { opacity: show ? 0 : 1 },
    config: { duration: 500 },
  });

  const styles = changeDimensions;

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

  const handleClickInfo = () => {
    setShow(!show);
  };

  const garmentInfo = (
    <Styled.Info>
      <Styled.InfoSubContainer style={changeDimensions}>
        {trail.map((props, index) => (
          <animated.div key={index} style={{ ...props, width: "100%" }}>
            {index === 0 && (
              <Styled.HeaderContainer>
                <Styled.InfoTitleContainer>
                  <Styled.InfoTitle>{garment?.garmentTitle}</Styled.InfoTitle>
                </Styled.InfoTitleContainer>
                <Styled.IconButtonContainer>
                  <Link to={`/garments/${garment?.id}`} target="_blank">
                    <IconButton
                      sx={{
                        color: "white",
                        height: "36px",
                        width: "36px",
                        "&:hover": {
                          bgcolor: "rgba(0, 0, 0, 0.5)",
                        },
                      }}
                    >
                      <OpenInNewOutlinedIcon />
                    </IconButton>
                  </Link>
                </Styled.IconButtonContainer>
              </Styled.HeaderContainer>
            )}
            {index === 1 && (
              <Styled.InfoItem>
                <p>c. {garment?.beginYear}</p>
                <p>
                  <span>{garment?.cultureCountry}</span>
                </p>
              </Styled.InfoItem>
            )}
            {index === 2 && (
              <Styled.SolidIconButtonContainer style={{alignItems: "flex-end"}}>
                <IconButton
                  sx={{
                    color: "white",
                    height: "40px",
                    width: "40px",
                    marginBottom: "0.25rem",
                    marginLeft: "-0.6rem",
                    opacity: 0.6,
                    "&:hover": {
                      opacity: 1,
                      transform: "scale(1.05)",
                      transition: "all 0.5s",
                    },
                  }}
                  onClick={handleClickInfo}
                >
                  <SouthWestOutlinedIcon />
                </IconButton>
              </Styled.SolidIconButtonContainer>
            )}
          </animated.div>
        ))}
        {!show && (
          <Styled.SolidIconButtonContainer style={remove}>
            <IconButton
              sx={{
                color: "white",
                height: "40px",
                width: "40px",
                "&:hover": {
                  transform: "scale(1.1)",
                  transition: "all 0.5s",
                },
              }}
              onClick={handleClickInfo}
            >
              <InfoOutlinedIcon />
            </IconButton>
          </Styled.SolidIconButtonContainer>
        )}
      </Styled.InfoSubContainer>
    </Styled.Info>
  );

  // Image container can NOT be conditionally displayed (even if loading is slow)
  // because the imageRef cannot be used until img is rendered (don't forget!)
  return (
    <Styled.HomeContentContainer height={windowHeight}>
      <Styled.ContentTitleContainer>
        <h2>Garment of the Day</h2>
      </Styled.ContentTitleContainer>
      <Styled.Card
        height={maxHeight ? maxHeight : "calc(100vh - 160px)"}
        noImage={noImage}
        imageLoaded={imageLoaded}
        ref={sizeRef}
      >
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
              bgcolor: "rgba(23, 42, 79, 0.1)",
              "&:hover": {
                bgcolor: "rgba(23, 42, 79, 0.2)",
              },
            }}
          >
            <ZoomOutMapOutlinedIcon />
          </IconButton>
        </Styled.EnlargeButton>
        {garmentInfo}
      </Styled.Card>
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
    height: 88px;
    justify-content: center;
    ${t.py(6)}

    h2 {
      font-size: 1.75rem;
      color: #020b1c;
      letter-spacing: 0.01rem;
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
    border-radius: 8px;
    max-width: 92vw;
    width: auto;
    max-height: calc(${heightInVh}vh - 120px);
    position: relative;
    z-index: 0;
    margin-bottom: 48px;
  `;
});

Styled.EnlargeButton = styled.div(() => {
  return css`
    display: block;
    position: absolute;
    opacity: 0.5;
    transition: opacity 0.5s;
    top: 10px;
    right: 10px;
    z-index: 3;

    &:hover {
      display: block;
      cursor: pointer;
      opacity: 1;
      transition: opacity 0.5s;
    }
  `;
});

Styled.ImageSection = styled(animated.div)(() => {
  return css`
    label: DailyGarment_ImageSection;
    display: flex;
    justify-content: center;
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

    ${t.mq.md} {
      max-width: 550px;
    }

    img {
      max-width: 92vw;
      max-height: calc(${heightInVh}vh - 120px);
      border-radius: 8px;

      ${t.mq.md} {
        max-width: 550px;
      }
    }
  `;
});

Styled.Info = styled(animated.div)(() => {
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

Styled.InfoSubContainer = styled(animated.div)`
  label: Garment_InfoHeaderContainer;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  position: relative;
`;

Styled.HeaderContainer = styled.div`
  label: Garment_InfoHeaderContainer;
  width: 100%;
  margin-top: 1rem;
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
    display: inline-flex;
  `;
});

Styled.IconButtonContainer = styled.div(() => {
  return css`
    label: Garment_InfoIconButton;
    display: flex;
    justify-content: flex-end;
    width: 20%;
    margin-top: 8px;

    &:hover {
      cursor: pointer;
    }
  `;
});

Styled.SolidIconButtonContainer = styled(animated.div)(() => {
  return css`
    label: Garment_InfoIconButton;
    display: flex;
    height: 48px;
    width: 48px;
    position: absolute;
    bottom: 0;
    top: 0.25rem;
    left: 0;

    &:hover {
      cursor: pointer;
    }
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
