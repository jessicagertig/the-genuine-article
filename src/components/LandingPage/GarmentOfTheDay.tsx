import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined';

import GarmentZoomModal from "src/components/Garment/GarmentZoomModal";

import { useModalContext } from "src/context/ModalContext";
import { useDailyGarment } from "src/queryHooks/useGarments";
import useImageDimensions from "src/hooks/useImageDimensions";

interface HomeContentProps {
  windowHeight: number;
  windowWidth: number;
}

const HomeContent: React.FC<HomeContentProps> = ({ windowHeight, windowWidth }) => {
  const { openModal, removeModal } = useModalContext();
  const { data: garment } = useDailyGarment();

  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [dimensions, setDimensions] = React.useState({
    height: 0,
    width: 0,
  });

  const { maxHeight, maxWidth } = useImageDimensions({imageLoaded, dimensions})
  const imgRef = React.useRef<HTMLImageElement>(null!);

  const onLoad = () => {
    setImageLoaded(true);
    setDimensions({
      height: imgRef.current.naturalHeight,
      width: imgRef.current.naturalWidth,
    });
  };

  React.useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      onLoad();
    }
  });

  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down('md'));

  const imageUrl = garment && garment.imageUrls ? garment.imageUrls.mainImageUrl : "";

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
  }

  return (
    <Styled.HomeContentContainer height={maxHeight}>
      <Styled.ContentTitleContainer>
        <h2>Garment of the Day</h2>
      </Styled.ContentTitleContainer>
      <Styled.ImageSection>
        <Styled.DisplayedImage height={maxHeight}>
          <img
            ref={imgRef}
            src={imageUrl}
            alt={garment ? garment.garmentTitle : "garment"}
            onLoad={onLoad}
          />
          <div>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleZoom}
              aria-label="zoom"
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
  const heightInVh = props.height/(props.height * 0.01)
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
      color: #172a4f;
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
  const heightInVh = props.height/(props.height * 0.01)
  return css`
    label: Garment_DisplayedImage;
    background-color: rgba(211, 217, 229, 0.5);
    display: flex;
    position: relative;
    width: auto;
    height: calc(${heightInVh}vh - 160px);
    flex-shrink: 1;

    ${t.mq.xs} {
      height: calc(${heightInVh}vh - 120px);
    }

    img {
      width: auto;
      height: calc(${heightInVh}vh - 160px);

      ${t.mq.xs} {
        height: calc(${heightInVh}vh - 120px);
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