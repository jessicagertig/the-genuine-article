import styled from "@emotion/styled";
import { css } from "@emotion/react";

import PublicHeader from 'src/components/shared/PublicHeader';
import SearchResults from 'src/components/SearchPage/SearchResults';

type Props = {};

const SearchPage = (props: Props) => {
  return (
    <Styled.SearchPageContainer>
      <PublicHeader
        titleText='Search Garments'
      />
      <SearchResults />
    </Styled.SearchPageContainer>
  );
};

export default SearchPage;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.SearchPageContainer = styled.div((props) => {
  const t = props.theme;
  return css`
    label: SearchPageContainer;
    ${t.pt(6)}
    width: 100%;
    display: flex;
    flex-direction: column;
  `;
});