import React from 'react'
import { StyledGarmentCard, StyledGarmentCardImage, StyledGarmentCardText } from 'src/components/SearchPage/styles/StyledGarmentCard';
//TODO: add a types file with a garment type once actual data is returned

type Props = {
  garment: any;  
}

function GarmentCard({ garment }: Props) {
  const url = garment.image_urls.large_url
  return (
    <StyledGarmentCard>
      <StyledGarmentCardImage>
        <img src={url} alt={garment.garment_title}/>
      </StyledGarmentCardImage>
      <StyledGarmentCardText>
        <h6>
          {garment.garment_title}
        </h6>
        <p>
          {garment.begin_year}
        </p>
        <p>
          {garment.culture_country}
        </p>
      </StyledGarmentCardText>
    </StyledGarmentCard>
  )
}

export default GarmentCard