import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Button from "@mui/material/Button";
import { useSearchParams } from 'react-router-dom';

import GarmentsList from "src/components/SearchPage/GarmentsList";
import NavBar from "src/components/shared/NavBar";
import SearchResults from "src/components/SearchPage/SearchResults";
import SearchBar from "src/components/shared/SearchBar";
import Footer from "src/components/shared/Footer";
import { GarmentData } from "src/types";
import { useGarmentsKeywordSearch } from "src/queryHooks/useSearch";
import { mainSearchStyles } from "src/components/SearchPage/styles/SearchFieldStyles";

interface SearchPageProps {}

const SearchPage: React.FC<SearchPageProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = React.useState<GarmentData[]>([]);
  const [hasResults, setHasResults] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [totalResults, setTotalResults] = React.useState(0);
  const [enabled, setEnabled] = React.useState(false);
  const hasQuery = searchQuery !== "" && searchQuery !== undefined;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGarmentsKeywordSearch(searchQuery, enabled);

  console.log("Data in index:", data);
  console.log("Search results:", searchResults);
  console.log("hasQuery", hasQuery);

  const pageContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (pageContainerRef && pageContainerRef.current) {
      pageContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const noResults = !hasResults && hasQuery && !isLoading;

  const fetchingNextPage = isFetchingNextPage as boolean;

  React.useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setSearchQuery(query);
      setSearchValue(query);
      setEnabled(true);
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (data && data.pages) {
      const garmentResults =
        data?.pages.flatMap((page: any) => page.data) ?? [];
      setSearchResults(garmentResults);
      const totalNo = data?.pages[0]?.pagination?.total;
      setTotalResults(totalNo);
    }
  }, [data, setSearchResults]);

  React.useEffect(() => {
    if (searchResults.length > 0) {
      setHasResults(true);
    } else {
      setHasResults(false);
    }
  }, [data, searchResults, setHasResults]);

  const handleOnChange = (value: string) => {
    console.log("value", value);
    if (value === "") {
      setSearchQuery(value);
      setSearchParams({});
    }
    setSearchValue(value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setHasResults(false);
    setSearchParams({});
  };

  const handleSubmitSearch = () => {
    setEnabled(true);
    setSearchQuery(searchValue);
    setSearchParams({ query: searchValue });
  };

  const handleClickLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const buttonStyles = {
    width: "120px",
    fontWeight: "bold",
    border: "1px solid",
    margin: "4px",
    color: "#899AB8",
  };

  return (
    <Styled.SearchPageContainer ref={pageContainerRef}>
      <NavBar backgroundColor="white" shadow={true} />
      <Styled.SearchContainer>
        <Styled.SearchHeaderContainer>
          <Styled.TextContainer>
            <h2>Search Garments</h2>
          </Styled.TextContainer>
          <Styled.SearchBarContainer>
            <SearchBar
              onChange={handleOnChange}
              onSubmit={handleSubmitSearch}
              handleClearSearch={handleClearSearch}
              styles={mainSearchStyles}
            />
          </Styled.SearchBarContainer>
          <Styled.ResultText>
            {noResults ? (
              <>
                0 search results for <span>{searchQuery}</span>
              </>
            ) : hasResults ? (
              <>
                {totalResults} search results for <span>{searchQuery}</span>
              </>
            ) : (
              ""
            )}
          </Styled.ResultText>
        </Styled.SearchHeaderContainer>
      </Styled.SearchContainer>
      <Styled.GarmentsContainer>
      {hasQuery ? (
          <SearchResults garments={searchResults} isLoading={isLoading} hasResults={hasResults} noResults={noResults} />
        ) : (
          <GarmentsList scrollToTop={scrollToTop} />
        )}
        <Styled.ButtonContainer>
          {hasResults && hasNextPage && !fetchingNextPage ? (
            <Button
              onClick={handleClickLoadMore}
              variant="outlined"
              size="medium"
              sx={buttonStyles}
            >
              Load more
            </Button>
          ) : null}
        </Styled.ButtonContainer>
      </Styled.GarmentsContainer>
      <Footer scrollToTop={scrollToTop} />
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
    align-items: center;

    & > :last-child {
      margin-top: auto;
    }
  `;
});

Styled.LoadingContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: LoadingContainer;
    width: 50%;
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

Styled.SearchContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: TextContainer;
    ${[t.mx(4), t.mt(4)]}
    width: 90%;
    margin-right: 5%;
    margin-left: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1500px;

    ${t.mq.sm} {
      width: 94%;
      margin-right: 3%;
      margin-left: 3%;
    }
  `;
});

Styled.SearchHeaderContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: TextContainer;
    ${t.my(2)}
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;
});

Styled.TextContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: TextContainer;
    ${t.mt(2)}
    width: 100%;
    display: none;
    justify-content: flex-start;

    ${t.mq.md} {
      display: flex;
    }

    h2 {
      font-family: "bellota text";
      font-size: 1.65rem;
      color: #020b1c;
      ${t.my(4)}
    }
  `;
});

Styled.ResultText = styled.p(props => {
  const t = props.theme;
  return css`
    label: ResultsText;
    font-size: 1.125rem;
    color: #172a4f;
    font-style: italic;

    span {
      font-weight: bold;
      font-style: normal;
    }

    ${t.mq.sm} {
      padding-left: 0.5rem;
    }
  `;
});

Styled.SearchBarContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: SearchBarContainer;
    ${[t.mb(4)]}
    display: flex;
    justify-content: flex-start;
  `;
});

Styled.GarmentsContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentsContainer;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 48px;

    ${t.mq.sm} {
      width: 94%;
      margin-right: 3%;
      margin-left: 3%;
    }
  `;
});

Styled.ButtonContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: ButtonContainer;
    display: flex;
    justify-content: center;
    width: 98%;

    > button {
      width: 90%;
      height: 40px;
      margin-right: 5%;
      margin-left: 5%;
      margin-top: 24px;
      margin-bottom: 24px;

      ${t.mq.sm} {
        width: 50%;
        margin-right: 25%;
        margin-left: 25%;
      }

      ${t.mq.md} {
        width: 120px;
      }
    }
  `;
});
