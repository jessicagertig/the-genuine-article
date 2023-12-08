import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigate, useLocation } from "react-router-dom";

import Pagination from "@mui/material/Pagination";

import GarmentCard from "src/components/SearchPage/GarmentCard";
import LoadingBar from "src/components/shared/Loading";
import { GarmentData } from "src/types";
import { usePaginatedGarments } from "src/queryHooks/useGarments";

interface GarmentsListProps {
  scrollToTop: () => void;
}

const GarmentsList: React.FC<GarmentsListProps> = props => {
  const [pageNo, setPageNo] = React.useState(1);
  const [garments, setGarments] = React.useState<GarmentData[]>([]);
  const [pageCount, setPageCount] = React.useState(0);
  // const [hasMore, setHasMore] = React.useState(false);

  const { data, isFetching, isLoading } = usePaginatedGarments(pageNo);

  const navigate = useNavigate();
  const location = useLocation();

  console.log("data", data);

  React.useEffect(() => {
    if (location?.state && location.state.pageNo) {
      setPageNo(location.state.pageNo);
    }
    // NOTE: Run effect once on component mount, please
    // recheck dependencies if effect is updated.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (data) {
      setGarments(data.items);
      setPageCount(data.pages);
      // setHasMore(data.hasMore);
    }
  }, [data]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const diffPage = value !== pageNo;
    setPageNo(value);
    console.log("diffPage", diffPage);
    if (diffPage) {
      props.scrollToTop();
    }
  };

  const loadingState = !data || isLoading || isFetching;

  return (
    <Styled.GarmentsListContainer>
      {loadingState ? (
        <Styled.LoadingContainer>
          <h2>Loading...</h2>
          <LoadingBar />
        </Styled.LoadingContainer>
      ) : (
        <>
          <Styled.GarmentsList>
            {garments?.map((garment: any, index: number) => (
              <GarmentCard
                key={index}
                garment={garment}
                navigationState={{ pageNo: pageNo }}
                loading={isLoading}
              />
            ))}
          </Styled.GarmentsList>
          <Styled.PaginationContainer>
            <Pagination
              count={pageCount}
              page={pageNo}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
            />
          </Styled.PaginationContainer>
        </>
      )}
    </Styled.GarmentsListContainer>
  );
};

export default GarmentsList;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.GarmentsListContainer = styled.div(() => {
  return css`
    label: GarmentsListContainer;
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 124px);
    display: flex;
    flex-direction: column;
    max-width: 1500px;
    align-content: center;
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

Styled.GarmentsList = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentsList;
    ${t.mx(0)};
    height: max-content;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-flow: row wrap;
  `;
});

Styled.PaginationContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: PaginationContainer;
    ${[t.py(12), t.mb(8)]}
    width: 342px;
    height: 128px;
    display: flex;
    justify-content: center;
    align-self: center;
  `;
});
