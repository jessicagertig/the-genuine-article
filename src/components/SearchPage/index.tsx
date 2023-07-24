import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Divider from "@mui/material/Divider";

import GarmentsList from "src/components/SearchPage/GarmentsList";
import NavBar from "src/components/shared/NavBar";
import LoadingBar from "src/components/shared/Loading";
// import LoadMoreTrigger from "src/components/SearchPage/LoadMoreTrigger";
import SearchResults from "src/components/SearchPage/SearchResults";
import SearchBar from "src/components/shared/SearchBar";
import { GarmentData } from "src/types";
import { useGarmentsSearch } from "src/queryHooks/useSearch";
import { mainSearchStyles } from "src/components/SearchPage/styles/SearchFieldStyles";
interface SearchPageProps {}

const SearchPage: React.FC<SearchPageProps> = () => {
  const [searchResults, setSearchResults] = React.useState<GarmentData[]>([]);
  const [hasResults, setHasResults] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [enabled, setEnabled] = React.useState(false);

  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useGarmentsSearch(searchQuery, enabled);

  console.log("data", data);

  const fetchingNextPage = isFetchingNextPage as boolean;

  React.useEffect(() => {
    if (data && data.pages) {
      const garmentResults = data?.pages.flatMap((page: any) => page) ?? [];
      setSearchResults(garmentResults);
    }
    console.log("has results", hasResults);
  }, [data]);

  React.useEffect(() => {
    if (searchResults.length > 0) {
      setHasResults(true);
    } else {
      setHasResults(false);
    }
  }, [searchResults, setHasResults]);

  const handleOnChange = (value: string) => {
    console.log("value", value);
    if (value === "") {
      setSearchQuery(value)
    }
    setSearchValue(value);
  };
  const handleClearSearch = () => {
    setSearchQuery("");
    setHasResults(false);
  };

  const handleSubmitSearch = () => {
    setEnabled(true);
    setSearchQuery(searchValue);
    refetch();
  };

  // if (isLoading) {
  //   return (
  //     <Styled.LoadingContainer>
  //       <h2>Loading...</h2>
  //       <LoadingBar />
  //     </Styled.LoadingContainer>
  //   );
  // }

  return (
    <Styled.SearchPageContainer>
      <NavBar backgroundColor="white" shadow={true} />
      <Styled.SearchContainer>
        <Styled.SearchHeaderContainer>
          <Styled.TextContainer>
            <h2>
              Search Garments
            </h2>
          </Styled.TextContainer>
          <Styled.SearchBarContainer>
            <SearchBar
              onChange={handleOnChange}
              onSubmit={handleSubmitSearch}
              handleClearSearch={handleClearSearch}
              styles={mainSearchStyles}
            />
          </Styled.SearchBarContainer>
          <Styled.Divider>
            <Divider sx={{ my: 4, borderColor: "#899AB8" }}/>
          </Styled.Divider>
        </Styled.SearchHeaderContainer>
      </Styled.SearchContainer>
      <Styled.GarmentsContainer>
        {hasResults ? (
          <SearchResults garments={searchResults} isLoading={isLoading} />
        ) : (
          /* {hasNextPage && !fetchingNextPage && (
            <LoadMoreTrigger
              onEnterView={() => {
                if (hasNextPage) {
                  fetchNextPage();
                }
              }}
            />
          )} */
          <GarmentsList />
        )}
      </Styled.GarmentsContainer>
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

Styled.SearchContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: TextContainer;
    ${t.m(4)}
    width: 80%;
    margin-right: 10%;
    margin-left: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `
})

Styled.SearchHeaderContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: TextContainer;
    ${t.my(2)}
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `
})

Styled.TextContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: TextContainer;
    ${t.mt(2)}
    width: 100%;
    display: none;
    justify-content: flex-start;

    ${t.mq.gmd} {
      display: flex;
    }

    h2 {
      font-family: "bellota text";
      font-size: 1.65rem;
      color: #172a4f;
      ${t.my(4)}
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
  
  Styled.Divider = styled.div(props => {
    const t = props.theme;
    return css`
      label: DividerContainer;
      display: none;
      
      ${t.mq.glg} {
        display: block;
      }
    `;
  });

  Styled.GarmentsContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentsContainer;
    display: flex;
    width: 100%;

    ${t.mq.md} {
      width: 96%;
      margin-right: 2%;
      margin-left: 2%;
    }

    ${t.mq.xl} {
      width: 90%;
      margin-right: 5%;
      margin-left: 5%;
    }
  `;
});
