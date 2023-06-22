import React from "react";
import {
  StyledGarmentCard,
  StyledGarmentCardImage,
  StyledGarmentCardText,
} from "src/components/SearchPage/styles/StyledGarmentCard";
import { GarmentData } from "src/types";

type Props = {
  garment: GarmentData;
};

function GarmentCard({ garment }: Props) {
  const url = garment && garment.imageUrls ? garment.imageUrls.displayUrl : undefined;
  return (
    <StyledGarmentCard>
      <StyledGarmentCardImage>
        <img src={url} alt={garment?.garmentTitle} />
      </StyledGarmentCardImage>
      <StyledGarmentCardText>
        <h6>{garment?.garmentTitle}</h6>
        <p>c. {garment?.beginYear}</p>
      </StyledGarmentCardText>
    </StyledGarmentCard>
  );
}

export default GarmentCard;
