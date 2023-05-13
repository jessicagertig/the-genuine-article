import React from 'react'
import { StyledGarmentCard, StyledGarmentCardImage } from 'src/components/SearchPage/styles/StyledGarmentCard';

type Props = {
  garment: any;  
}

function GarmentCard({ garment }: Props) {
  return (
    <StyledGarmentCard>
      <div>
        <StyledGarmentCardImage>
          <img src="" alt=""/>
        </StyledGarmentCardImage>
        <p>Title:
          <span>
            {`  ${garment.garment_title}`}
          </span>
        </p>
        <p>
          Garment Type: 
          <span>
            {`  ${garment.garment_type}`}
          </span>
        </p>
        <p>
          Date: 
          <span>
            {`  ${garment.begin_year}`}
          </span>
        </p>
        <p>
          Culture/Country: 
          <span>
            {`  ${garment.culture_country}`}
          </span>
        </p>
        <p>
          Location:
          <span>
            {`  ${garment.collection}`}
          </span>
        </p>
      </div>
    </StyledGarmentCard>
  )
}

export default GarmentCard