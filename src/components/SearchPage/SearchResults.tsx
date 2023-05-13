import React from 'react';

import GarmentCard from 'src/components/SearchPage/GarmentCard';
import { StyledSearchResults } from 'src/components/SearchPage/styles/StyledSearchResults';

const data = require('src/assets/data.json');

function SearchResults() {
  console.log("data", data)
  return (
    <>
      <StyledSearchResults>
        {data.garments.map((garment: any, index: number) => (
          <GarmentCard key={index} garment={garment} />
        ))}
      </StyledSearchResults>
    </>
  )
}

export default SearchResults