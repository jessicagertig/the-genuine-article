import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import ZoomOutMapOutlinedIcon from "@mui/icons-material/ZoomOutMapOutlined";

import GarmentZoomModal from "src/components/Garment/GarmentZoomModal";

import { useModalContext } from "src/context/ModalContext";
import { useDailyGarment } from "src/queryHooks/useGarments";
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

  const { maxHeight } = useImageDimensions({
    imageLoaded,
    dimensions,
  });
  const imgRef = React.useRef<HTMLImageElement>(null!);

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

  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));

  const imageUrl =
    garment && garment.imageUrls ? garment.imageUrls.mainImageUrl : "";
  const noImage = imageUrl === "" || imageUrl === undefined;

  const handleZoom = () => {
    const modal = (
      <GarmentZoomModal
        onClose={() => removeModal()}
        garmentTitle={garment?.garmentTitle}
        imageUrl={imageUrl}
        responsiveFullscreen={fullscreen}
      />
    );

    openModal(modal);
  };

  // Image container can NOT be conditionally displayed (even if loading is slow)
  // because the imageRef cannot be used until img is rendered (don't forget!)
  return (
    <Styled.HomeContentContainer height={windowHeight}>
      <Styled.ContentTitleContainer>
        <h2>Garment of the Day</h2>
      </Styled.ContentTitleContainer>
      <Styled.ImageSection>
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
  `;
});

Styled.ContentTitleContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: HomeContentContainer;
    display: flex;
    width: 100%;
    height: 90px;
    justify-content: center;
    ${t.py(8)}

    h2 {
      font-size: 1.75rem;
      color: #020b1c;
      letter-spacing: 0.01rem;
    }
  `;
});

Styled.ImageSection = styled.section(() => {
  return css`
    label: DailyGarment_ImageSection;
    display: flex;
    justify-content: center;
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
    max-height: calc(${heightInVh}vh - 160px);
    flex-shrink: 1;
    border-radius: 8px;

    ${t.mq.xs} {
      max-height: calc(${heightInVh}vh - 120px);
    }

    img {
      max-width: 95vw;
      max-height: calc(${heightInVh}vh - 160px);
      height: auto;
      border-radius: 8px;

      ${t.mq.xs} {
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
