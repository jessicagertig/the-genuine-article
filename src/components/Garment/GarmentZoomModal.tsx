import * as React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import Dialog, { DialogProps } from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import ZoomOutOutlinedIcon from "@mui/icons-material/ZoomOutOutlined";
import Grow from "@mui/material/Grow";
import { TransitionProps } from "@mui/material/transitions";

import { useModalContext } from "src/context/ModalContext";
import useImageDimensions from "src/hooks/useImageDimensions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

interface GarmentZoomModalProps extends Omit<DialogProps, "open"> {
  onClose: () => void;
  responsiveFullscreen: boolean;
  garmentTitle: string;
  imageUrl: string;
}

const GarmentZoomModal: React.FC<GarmentZoomModalProps> = props => {
  const { responsiveFullscreen, garmentTitle, imageUrl } = props;
  const { modalOpen } = useModalContext();
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [dimensions, setDimensions] = React.useState({
    height: 0,
    width: 0,
  });

  const { maxHeight, maxWidth } = useImageDimensions({
    imageLoaded,
    dimensions,
  });
  const imgRef = React.useRef<HTMLImageElement>(null!);

  const onLoad = () => {
    setImageLoaded(true);
    setDimensions({
      height: imgRef.current.naturalHeight,
      width: imgRef.current.naturalWidth,
    });
  };

  React.useEffect(() => {
    console.log("img ref:", imgRef);
    if (imgRef.current && imgRef.current.complete) {
      onLoad();
    }
  }, [imgRef.current]);

  const handleClose = () => {
    props.onClose();
  };

  interface Controls {
    zoomIn: () => void;
    zoomOut: () => void;
    resetTransform: () => void;
  }

  const Buttons = ({ zoomIn, zoomOut, resetTransform }: Controls) => {
    return (
      <Styled.ButtonsContainer>
        <IconButton
          edge={false}
          color="inherit"
          onClick={() => zoomIn()}
          aria-label="zoom in"
          sx={{
            backgroundColor: "rgba(23, 42, 79, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(23, 42, 79, 0.2)",
            },
          }}
        >
          <ZoomInOutlinedIcon />
        </IconButton>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => zoomOut()}
          aria-label="zoom out"
          sx={{
            backgroundColor: "rgba(23, 42, 79, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(23, 42, 79, 0.2)",
            },
          }}
        >
          <ZoomOutOutlinedIcon />
        </IconButton>
      </Styled.ButtonsContainer>
    );
  };

  return (
    <>
      <Dialog
        disablePortal
        maxWidth="xl"
        fullScreen={responsiveFullscreen}
        open={modalOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            width: maxWidth,
            height: maxHeight,
            maxHeight: maxHeight,
            overflow: "hidden",
          },
        }}
      >
        <TransformWrapper>
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <AppBar
                sx={{
                  position: "relative",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                }}
              >
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    sx={{
                      backgroundColor: "rgba(23, 42, 79, 0.1)",
                      "&:hover": {
                        backgroundColor: "rgba(23, 42, 79, 0.2)",
                      },
                    }}
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                  <Buttons
                    zoomIn={zoomIn}
                    zoomOut={zoomOut}
                    resetTransform={resetTransform}
                  />
                </Toolbar>
              </AppBar>
              <Styled.DisplayedImage height={maxHeight} width={maxWidth}>
                <TransformComponent>
                  <img
                    ref={imgRef}
                    src={imageUrl}
                    alt={garmentTitle ? garmentTitle : "garment"}
                    onLoad={onLoad}
                  />
                </TransformComponent>
              </Styled.DisplayedImage>
            </React.Fragment>
          )}
        </TransformWrapper>
      </Dialog>
    </>
  );
};

export default GarmentZoomModal;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.DisplayedImage = styled.div((props: any) => {
  return css`
    label: Garment_DisplayedImage;
    background-color: rgba(211, 217, 229, 0.2);
    display: block;
    position: absolute;
    width: ${props.width}px;
    height: ${props.height}px;
    flex-shrink: 1;

    img {
      width: ${props.width}px;
      height: ${props.height}px;
    }
  `;
});

Styled.ButtonsContainer = styled.div((props: any) => {
  return css`
    label: Garment_ToolbarButtons;
    display: flex;
    width: 100%;
    justify-content: flex-end;
  `;
});