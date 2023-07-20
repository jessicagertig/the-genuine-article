import * as React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Dialog, { DialogProps } from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Grow from "@mui/material/Grow";
import { TransitionProps } from "@mui/material/transitions";

import { useModalContext } from "src/context/ModalContext";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Grow
      ref={ref}
      {...props}
    />
  );
});

interface GarmentZoomModalProps extends Omit<DialogProps, "open"> {
  onClose: () => void;
  responsiveFullscreen: boolean;
  garmentTitle: string;
  imageUrl: string;
  windowHeight: number;
}

const GarmentZoomModal: React.FC<GarmentZoomModalProps> = props => {
  const { responsiveFullscreen, garmentTitle, imageUrl, windowHeight } = props;
  const { modalOpen } = useModalContext();
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [dimensions, setDimensions] = React.useState({
    height: 0,
    width: 0,
  });
  const [maxWidth, setMaxWidth] = React.useState(0);

  const imgRef = React.useRef<HTMLImageElement>(null!);

  const onLoad = () => {
    setImageLoaded(true);
    setDimensions({
      height: imgRef.current.naturalHeight,
      width: imgRef.current.naturalWidth,
    });
  };

  const ratio = imageLoaded ? dimensions.width / dimensions.height : 0.82;

  React.useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      onLoad();
    }
  });

  React.useEffect(() => {
    if (imageLoaded) {
      const calcWidth = windowHeight * ratio;
      setMaxWidth(calcWidth);
    }
  }, [dimensions]);

  const handleClose = () => {
    props.onClose();
  };

  return (
    <div>
      <Dialog
        maxWidth="xl"
        fullScreen={responsiveFullscreen}
        open={modalOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{ sx: { width: maxWidth, height: windowHeight, maxHeight: windowHeight} }}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "transparent", boxShadow: "none" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseOutlinedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Styled.DisplayedImage height={windowHeight}>
          <img
            ref={imgRef}
            src={imageUrl}
            alt={garmentTitle ? garmentTitle : "garment"}
            onLoad={onLoad}
          />
        </Styled.DisplayedImage>
      </Dialog>
    </div>
  );
};

export default GarmentZoomModal;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.DisplayedImage = styled.div((props: any) => {
  const t = props.theme;
  const heightInVh = props.height/(props.height * 0.01)
  return css`
    label: Garment_DisplayedImage;
    background-color: rgba(211, 217, 229, 0.2);
    display: flex;
    position: absolute;
    width: auto;
    height: ${heightInVh}vh;
    flex-shrink: 1;

    // ${t.mq.xs} {
    // }

    img {
      width: auto;
      height: ${heightInVh}vh;

      // ${t.mq.xs} {
      // }
    }
  `;
});
