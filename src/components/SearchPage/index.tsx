import styled from "@emotion/styled";
import { css } from "@emotion/react";

import PublicHeader from 'src/components/shared/PublicHeader';
import SearchResults from 'src/components/SearchPage/SearchResults';

import { useGarments } from 'src/queryHooks/useGarments'; 

type Props = {};

const SearchPage = (props: Props) => {
  const { data: garments, isLoading, error } = useGarments();
  return (
    <Styled.SearchPageContainer>
      <PublicHeader
        titleText='Search Garments'
      />
      <SearchResults garments={garments} isLoading={isLoading} error={error} />
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