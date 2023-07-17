import styled from "@emotion/styled";
import { css } from "@emotion/react";

import PublicHeader from "src/components/shared/PublicHeader";
import SearchResults from "src/components/SearchPage/SearchResults";
import NavBar from "src/components/shared/NavBar";

interface SearchPageProps {}

const SearchPage: React.FC<SearchPageProps> = () => {
  return (
    <Styled.SearchPageContainer>
      <NavBar backgroundColor="white" shadow={true} />
      <PublicHeader titleText="Garments" />
      <SearchResults />
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
