import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigate, useLocation } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/ShareOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ZoomOutMapOutlinedIcon from "@mui/icons-material/ZoomOutMapOutlined";

import GarmentZoomModal from 'src/components/Garment/GarmentZoomModal';
import ShareModal from "src/components/Garment/ShareModal"; 
import { useModalContext } from "src/context/ModalContext";

import { GarmentData } from 'src/types';

interface ImageToolbarProps {
  garmentMainImgUrl: string;
  garmentTitle: string;
  mediumScreen: boolean;
  garment?: GarmentData;
}

const ImageToolbar: React.FC<ImageToolbarProps> = props => {
  const { mediumScreen, garmentTitle, garmentMainImgUrl, garment } = props;
  const navigate = useNavigate();
  const { state } = useLocation();
  const { openModal, removeModal } = useModalContext();

  // console.log("GARMENT TOOLBAR LOCATION", { state, pathname });
  const isSearch = state?.isSearch;
  const searchParams = state?.searchParams;
  const pageNumber = state?.pageNo;

    const handleShareClick = () => {
      const modal = (
        <ShareModal
          onClose={() => removeModal()}
          garment={garment}
          url={window.location.href}
        />
      );

      openModal(modal);
    };

  const handleZoom = () => {
    const modal = (
      <GarmentZoomModal
        onClose={() => removeModal()}
        garmentTitle={garmentTitle}
        imageUrl={garmentMainImgUrl}
        responsiveFullscreen={mediumScreen}
      />
    );

    openModal(modal);
  };

  const handleClickBack = () => {
    if (pageNumber !== undefined) {
      navigate("/garments", {
        state: {
          pageNo: pageNumber,
        },
      });
    } else if (isSearch && searchParams !== undefined) {
      console.log("searchParams", { searchParams });
      navigate(`/garments${searchParams}`);
    } else {
      navigate("/garments");
    }
  };

  const buttonStyles = {
    color: "#020b1c",
    width: "32px",
    height: "32px",
    backgroundColor: "white",
    "&:hover": {
      color: "#899AB8",
      backgroundColor: "white",
    },
  };

  return (
    <Styled.Container>
      <Styled.ButtonsContainer>
        <Styled.NavButton
          onClick={handleClickBack}
          aria-label="navigate back to list"
        >
          <ArrowBackIcon fontSize="small" />
          <p>{isSearch ? "search results" : "garments"}</p>
        </Styled.NavButton>
        <Styled.ImageActionsButtons>
          <IconButton
            onClick={handleShareClick}
            aria-label="Share this garment"
            sx={buttonStyles}
          >
            <ShareIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={handleZoom} aria-label="zoom" sx={buttonStyles}>
            <ZoomOutMapOutlinedIcon fontSize="small" />
          </IconButton>
        </Styled.ImageActionsButtons>
      </Styled.ButtonsContainer>
    </Styled.Container>
  );
};

export default ImageToolbar;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.Container = styled.div(props => {
  const t = props.theme;
  return css`
    label: ImageToolbar_Container;
    ${[t.mb(1), t.p(2)]}
    width: calc(95vw - (100vw - 100%));
    display: flex;
    justify-content: center;
    height: 42px;

    ${t.mq.sm} {
      width: 500px;
    }
  `;
});

Styled.ButtonsContainer = styled.div((props: any) => {
  return css`
    label: ImageToolbar_Buttons;
    display: flex;
    width: 100%;
    justify-content: space-between;
  `;
});

Styled.ImageActionsButtons = styled.div((props: any) => {
  const t = props.theme;
  return css`
    label: ImageToolbar_ImageActionButtons;
    ${[t.pr(1)]}
    display: flex;
    width: fit-content;
    justify-content: space-between;
  `;
})

Styled.NavButton = styled.div(() => {
  return css`
    label: ImageToolbar_BackButton;
    display: flex;
    height: 32px;
    align-items: center;

    font-size: 0.875rem;
    font-family: bellota, sans-serif;
    font-style: italic;
    color: #020b1c;
    height: 32px;
    background-color: white;
    text-align: center;

    &:hover {
      color: #899ab8;
      backgroundcolor: white;
      cursor: pointer;
    }

    .MuiSvgIcon-root {
      &:hover {
        color: #899ab8;
        backgroundcolor: white;
        cursor: pointer;
      }
    }
  `;
});
