import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";

import GarmentCard from "src/components/SearchPage/GarmentCard";
import LoadingBar from "src/components/shared/Loading";
import { GarmentData } from "src/types";

interface SearchResultsProps {
  garments: GarmentData[];
  isLoading: boolean;
  hasResults: boolean;
  noResults: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  garments,
  isLoading,
  hasResults,
  noResults,
}) => {
  const { search }: { search: string } = useLocation();
  console.log("Loading search results:", isLoading);
  console.log("search params", search);

  const navigationState = { isSearch: true, searchParams: search }

  return (
    <Styled.SearchResultsContainer>
      {hasResults ? (
        <>
          {!garments || isLoading ? (
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
                  navigationState={navigationState}
                  loading={isLoading}
                />
              ))}
            </Styled.SearchResults>
          )}
        </>
      ) : noResults ? (
        <Styled.EmptyState />
      ) : null}
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
    min-height: calc(100vh - 124px);
    display: block;
    max-width: 1500px;
  `;
});

Styled.LoadingContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: LoadingContainer;
    width: 50%;
    margin-right: 25%;
    margin-left: 25%;
    height: calc(100vh - 124px);
    padding-bottom: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;

    h2 {
      font-family: "bellota text";
      font-size: 1.25rem;
      color: #020b1c;
      ${t.m(4)}
    }

    ${t.mq.md} {
      height: calc(100vh - 166px);
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

Styled.EmptyState = styled.div(props => {
  const t = props.theme;
  return css`
    label: EmptyState_Container;
    height: calc(100vh - 136px);
    width: 100%;
    display: flex;
    justify-content: center;

    ${t.mq.md} {
      height: calc(100vh - 178px);
    }

    ${t.mq.lg} {
      height: calc(100vh - 248px);
    }

    ${t.mq.glg} {
      height: calc(100vh - 313px);
  `;
});
