import React from "react";
import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import PinterestIcon from "@mui/icons-material/Pinterest";
import XIcon from "@mui/icons-material/X";
import LinkIcon from "@mui/icons-material/Link";
import CloseIcon from "@mui/icons-material/Close";
import { GarmentData } from "src/types";

interface ShareModalProps {
  onClose: () => void;
  garment?: GarmentData;
  url: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ onClose, garment, url }) => {
  const handlePinterestShare = () => {
    // Implement Pinterest sharing logic
  };

  const handleTwitterShare = () => {
    // Implement Twitter sharing logic
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    // Optionally, show a toast or notification that the link was copied
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        <h3>Share</h3>
        <ShareButtons>
          <IconButton
            onClick={handlePinterestShare}
            aria-label="Share on Pinterest"
          >
            <PinterestIcon style={{ color: "#E60023" }} fontSize="large" />
          </IconButton>
          <IconButton
            onClick={handleTwitterShare}
            aria-label="Share on Twitter"
            sx={{ width: "51px"}}
          >
            <XIcon style={{ color: "black" }} />
          </IconButton>
          <IconButton onClick={handleCopyLink} aria-label="Copy link">
            <LinkIcon fontSize="large" />
          </IconButton>
        </ShareButtons>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width: 90%;
  max-width: 240px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h3 {
    font-size: 1.25rem;
    font-family: "bellota text";
  }
  
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ShareButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

export default ShareModal;
