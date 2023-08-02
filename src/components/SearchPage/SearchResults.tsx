import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import GarmentCard from "src/components/SearchPage/GarmentCard";
import LoadingBar from "src/components/shared/Loading";
import { GarmentData } from "src/types";

interface SearchResultsProps {
  garments: GarmentData[];
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  garments,
  isLoading,
}) => {
  const navigate = useNavigate();

  console.log("Loading search results:", isLoading);

  const handleOnClick = (
    e: React.MouseEvent<HTMLDivElement>,
    garmentId: number
  ): void => {
    e.preventDefault();
    navigate(`/garments/${garmentId}`);
  };

  return (
    <Styled.SearchResultsContainer>
      {!garments ?
      (
        <Styled.LoadingContainer>
          <h2>Loading...</h2>
          <LoadingBar />
        </Styled.LoadingContainer>
      ) : (
        <Styled.SearchResults>
          {garments?.map((garment: any, index: number) => (
            <GarmentCard
              key={index}
              garment={garment}
              handleClick={handleOnClick}
            />
          ))}
        </Styled.SearchResults>
      )}
    </Styled.SearchResultsContainer>
  );
};

export default SearchResults;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.SearchResultsContainer = styled.div(() => {
  return css`
    label: SearchResultsContainer;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  `;
});

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

Styled.SearchResults = styled.div(props => {
  const t = props.theme;
  return css`
    label: SearchResults;
    ${[t.p(2), t.mx(6)]}
    height: max-content;
    display: flex;
    justify-content: space-around;
    flex-flow: row wrap;
  `;
});