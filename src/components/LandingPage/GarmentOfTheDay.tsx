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

  const { maxHeight } = useImageDimensions({
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

  const no = windowHeight * -0.14

  const transitions = useTransition(dataRef?.isIntersecting, {
    from: { opacity: 0, transform: `translateY(0px) scale(1)` },
    enter: { opacity: 1, transform: `translateY(${no}px) scale(1.1)` },
    leave: { opacity: 1, transform: `translateY(${no}px) scale(1.1)` },
    unique: true,
    delay: 800,
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

  const style = mediumScreen
    ? {}
    : {
        transform: to(
          [
            resize.translate.to((v: any) => `translateY(${v})`),
            resize.scale.to((v: any) => `scale(${v})`),
          ],
          (translate, scale) => `${translate} ${scale}`
        ),
      };

  // const styleTwo = mediumScreen
  // ? {}
  // : {
  //     transform: to(
  //       [
  //         appear.translate.to((v: any) => `translateY(${v})`),
  //       ],
  //       (translate) => `${translate}`
  //     ),
  //     opacity: to([appear.opacity.to((v: any) => `opacity(${v})`),], (opacity) => opacity)
  //   };

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
                sx={{ color: "#020b1c", height: "32px", width: "32px" }}
              >
                <OpenInNewOutlinedIcon />
              </IconButton>
            </Link>
          </Styled.IconButtonContainer>
        </Styled.HeaderContainer>
        <Styled.InfoItem>
          <p>
            c. {garment?.beginYear},<span> {garment?.cultureCountry}</span>
          </p>
        </Styled.InfoItem>
        <Styled.InfoItem>
          <p className="date"></p>
        </Styled.InfoItem>
      </>
    );
    if (!mediumScreen) {
      return transitions((style, item) =>
        item ? <Styled.Info style={style}>{content}</Styled.Info> : null
      );
    } else {
      return <Styled.Info>{content}</Styled.Info>
    }
  };

  // Image container can NOT be conditionally displayed (even if loading is slow)
  // because the imageRef cannot be used until img is rendered (don't forget!)
  return (
    <Styled.HomeContentContainer height={windowHeight}>
      <Styled.ContentTitleContainer>
        {/* <animated.h2 style={{
            transform: to([
              resize.scale.to((v: any) => `scale(${v})`)
            ], (scale) => `${scale}`),
            }}>Garment of the Day</animated.h2> */}
        <h2>Garment of the Day</h2>
      </Styled.ContentTitleContainer>
      <Styled.Card height={windowHeight}>
        <Styled.ImageSection style={style}>
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
          >
            <img
              ref={imgRef}
              src={imageUrl}
              alt={garment ? garment.garmentTitle : "garment"}
              onLoad={onLoad}
            />
            <div>
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
            </div>
          </Styled.DisplayedImage>
        </Styled.ImageSection>
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
  return css`
    display: flex;
    flex-direction: column;
    align-items: space-between;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 92vw;
    max-height: calc(${heightInVh}vh - 120px);
    border-radius: 8px;
    width: fit-content;
    height: fit-content;

    ${t.mq.xs} {
      max-height: calc(${heightInVh}vh - 120px);
    }

    ${t.mq.md} {
      box-shadow: none;
      align-items: flex-start;
      border-radius: 0px;
    }
  `;
});

Styled.ImageSection = styled(animated.div)((props: any) => {
  const t = props.theme;
  return css`
    label: DailyGarment_ImageSection;
    display: flex;
    justify-content: center;
    z-index: 1;

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
    max-height: calc(${heightInVh}vh - 204px);
    border-radius: 8px 8px 0 0;

    ${t.mq.md} {
      max-width: 640px;
      max-height: calc(${heightInVh}vh - 120px);
    }

    img {
      max-width: 92vw;
      max-height: calc(${heightInVh}vh - 204px);
      border-radius: 8px 8px 0 0;

      ${t.mq.md} {
        max-width: 640px;
        max-height: calc(${heightInVh}vh - 120px);
      }
    }

    div {
      display: none;
      position: absolute;
      top: 10px;
      right: 10px;
    }

    &:hover {
      div {
        display: block;
      }
    }
  `;
});

Styled.Info = styled(animated.div)(props => {
  const t = props.theme;
  return css`
    display: flex;
    height: 88px;
    align-items: space-between;
    flex-direction: column;
    padding: 8px;
    width: 100%;
    z-index: 0;

    ${t.mq.md} {
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      padding-top: 24px;
      height: 140px;
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
  return css`
    label: Garment_InfoTitle;
    ${[t.pt(3), t.pb(1), t.pl(2)]}
    font-family: "Sorts Mill Goudy";
    color: #020b1c;
    font-size: 1.375rem;
    letter-spacing: 0.05rem;
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

Styled.InfoItem = styled.div((props: any) => {
  const t = props.theme;
  return css`
    label: Garment_InfoItem;
    display: flex;
    flex-direction: column;
    width: 100%;
    color: #020b1c;
    font-size: 1rem;
    line-height: 1.375rem;
    font-family: "bellota text";

    p {
      ${[t.px(2)]}

      span {
        font-style: italic;
      }
    }
  `;
});
