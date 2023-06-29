import React from "react";
import {
  StyledGarmentCard,
  StyledGarmentCardImage,
  StyledGarmentCardText,
} from "src/components/SearchPage/styles/StyledGarmentCard";
import { GarmentData } from "src/types";

interface GarmentCardProps {
  garment: GarmentData;
  handleClick: (
    event: React.MouseEvent<HTMLDivElement>,
    garmentId: number
  ) => void;
}

const GarmentCard: React.FC<GarmentCardProps> = ({ garment, handleClick }) => {
  const url =
    garment && garment.imageUrls ? garment.imageUrls.displayUrl : undefined;
  return (
    <StyledGarmentCard onClick={event => handleClick(event, garment?.id)}>
      <StyledGarmentCardImage>
        <img src={url} alt={garment ? garment?.garmentTitle : "garment"} />
      </StyledGarmentCardImage>
      <StyledGarmentCardText>
        <h6>{garment?.garmentTitle}</h6>
        <p>c. {garment?.beginYear}</p>
      </StyledGarmentCardText>
    </StyledGarmentCard>
  );
};

export default GarmentCard;
