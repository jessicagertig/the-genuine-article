import styled from "@emotion/styled";
import { css } from "@emotion/react";

import SearchResults from "src/components/SearchPage/SearchResults";
import GarmentsList from "src/components/SearchPage/GarmentsList";
import NavBar from "src/components/shared/NavBar";

interface SearchPageProps {}
// TODO: add Search here? 
// If so conditionally render garments list if no search results 
// otherwise render search results

const SearchPage: React.FC<SearchPageProps> = () => {
  return (
    <Styled.SearchPageContainer>
      <NavBar backgroundColor="white" shadow={true} />
      <GarmentsList />
    </Styled.SearchPageContainer>
  );
};

export default SearchPage;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.SearchPageContainer = styled.div(() => {
  return css`
    label: SearchPageContainer;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  `;
});
