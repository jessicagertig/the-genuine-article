import React from 'react';

import GarmentCard from 'src/components/SearchPage/GarmentCard';
import { StyledSearchResults } from 'src/components/SearchPage/styles/StyledSearchResults';

const fakeData = require('src/assets/data.json');

interface SearchResultsProps {
  // data: any;
}

const SearchResults: React.FC<SearchResultsProps> = () => {
  console.log("data", fakeData)
  return (
    <>
      <StyledSearchResults>
        {fakeData.garments.map((garment: any, index: number) => (
          <GarmentCard key={index} garment={garment} />
        ))}
      </StyledSearchResults>
    </>
  )
}

export default SearchResults