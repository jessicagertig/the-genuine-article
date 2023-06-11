import React from 'react';

import GarmentCard from 'src/components/SearchPage/GarmentCard';
import { StyledSearchResults } from 'src/components/SearchPage/styles/StyledSearchResults';
import { GarmentData } from 'src/types';

interface SearchResultsProps {
  garments: GarmentData[],
  isLoading: boolean,
  error: any
}

const SearchResults: React.FC<SearchResultsProps> = ({ garments, isLoading, error }) => {
  console.log("data", garments)
  if (isLoading) {
    return <h2>"Loading..."</h2>
  }

  return (
    <>
      <StyledSearchResults>
        {garments?.map((garment: any, index: number) => (
          <GarmentCard key={index} garment={garment} />
        ))}
      </StyledSearchResults>
    </>
  )
}

export default SearchResults