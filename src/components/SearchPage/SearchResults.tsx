import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import GarmentCard from "src/components/SearchPage/GarmentCard";
import LoadingBar from "src/components/shared/Loading";
import { StyledSearchResults } from "src/components/SearchPage/styles/StyledSearchResults";
import { GarmentData } from "src/types";

interface SearchResultsProps {
  garments: GarmentData[];
  isLoading: boolean;
  error: any;
}

const SearchResults: React.FC<SearchResultsProps> = ({ garments, isLoading, error }) => {
  console.log("data", garments);
  if (isLoading || !garments) {
    return (
      <Styled.LoadingContainer>
        <h2>Loading...</h2>
        <LoadingBar />
      </Styled.LoadingContainer>
    )
  }

  return (
    <>
      <StyledSearchResults>
        {garments?.map((garment: any, index: number) => (
          <GarmentCard key={index} garment={garment} />
        ))}
      </StyledSearchResults>
    </>
  );
};

export default SearchResults;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.LoadingContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: LoadingContainer;
    ${t.mb(10)}
    width: 50%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;

    h2 {
      font-family: "bellota text";
      font-size: 1.25rem;
      color: #172a4f;
      ${t.m(4)}
    }
  `;
});
