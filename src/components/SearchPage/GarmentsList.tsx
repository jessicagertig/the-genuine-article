import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import Pagination from "@mui/material/Pagination";

import GarmentCard from "src/components/SearchPage/GarmentCard";
import LoadingBar from "src/components/shared/Loading";
import { GarmentData } from "src/types";
import { useInfiniteGarments, usePageCount } from "src/queryHooks/useGarments";

interface GarmentsListProps {}

const GarmentsList: React.FC<GarmentsListProps> = () => {
  
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteGarments();
  const { data: count } = usePageCount(15)
  // const garments = data?.pages.flatMap((page: any) => page) ?? [];

  const [pageNo, setPageNo] = React.useState(1);
  const [garments, setGarments] = React.useState<GarmentData[]>([]);
  const [pageCount, setPageCount] = React.useState(0);
  
  const disabled = pageCount === 0 || pageCount === undefined;
  const navigate = useNavigate();

  console.log("data", data);
  const fetchingNextPage = (isFetchingNextPage as boolean)
  React.useEffect(() => {
    if (data && data.pages) {
      setGarments(data.pages[pageNo - 1]);
    }
  }, [data, pageNo]);

  React.useEffect(() => {
    if (count) {
      setPageCount(count)
    }
  }, [count]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageNo(value);
  };

  const handleClickPage = () => {
    const pagesFetched = data && data?.pages ? data?.pages?.length : 1000;
    const newPageExists = hasNextPage && pagesFetched < pageCount;

    if (newPageExists && !fetchingNextPage) {
      fetchNextPage()
    }
  }

  const handleOnClick = (
    e: React.MouseEvent<HTMLDivElement>,
    garmentId: number
  ): void => {
    e.preventDefault();
    navigate(`/garments/garment/${garmentId}`);
  };

  if (!data) {
    return (
      <Styled.LoadingContainer>
        <h2>Loading...</h2>
        <LoadingBar />
      </Styled.LoadingContainer>
    );
  }

  return (
    <Styled.GarmentsListContainer>
      <Styled.GarmentsList>
        {garments?.map((garment: any, index: number) => (
          <GarmentCard
            key={index}
            garment={garment}
            handleClick={handleOnClick}
          />
        ))}
      </Styled.GarmentsList>
      <Styled.PaginationContainer>
        <Pagination
          count={pageCount}
          disabled={disabled}
          page={pageNo}
          onChange={handleChangePage}
          onClick={handleClickPage}
          variant="outlined"
          shape="rounded"
        />
      </Styled.PaginationContainer>
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

Styled.GarmentsList = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentsList;
    ${[t.p(2), t.mx(6)]}
    height: max-content;
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
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-self: center;
  `;
});

