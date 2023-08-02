import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigate, useLocation } from "react-router-dom";

import Pagination from "@mui/material/Pagination";

import GarmentCard from "src/components/SearchPage/GarmentCard";
import LoadingBar from "src/components/shared/Loading";
import { GarmentData } from "src/types";
import { usePaginatedGarments } from "src/queryHooks/useGarments";

interface GarmentsListProps {}

const GarmentsList: React.FC<GarmentsListProps> = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null!);
  
  const [pageNo, setPageNo] = React.useState(1);
  const [garments, setGarments] = React.useState<GarmentData[]>([]);
  const [pageCount, setPageCount] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(false);
  
  const { data, isFetching, isLoading, isPreviousData } = usePaginatedGarments(pageNo);

  // const disabled = !hasMore;
  const navigate = useNavigate();
  const location = useLocation();

  console.log("data", data);

  React.useEffect(() => {
    if (location?.state && location.state.pageNo) {
      setPageNo(location.state.pageNo)
    }
  }, []);

  React.useEffect(() => {
    if (data) {
      setGarments(data.items);
      setPageCount(data.pages);
      setHasMore(data.hasMore);
    }
  }, [data]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const diffPage = value !== pageNo;
    setPageNo(value);
    console.log("diffPage", diffPage)
    if (diffPage && scrollRef?.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  };

  const handleOnClick = (
    e: React.MouseEvent<HTMLDivElement>,
    garmentId: number
  ): void => {
    e.preventDefault();
        navigate(`/garments/${garmentId}`, {
      state: {
        pageNo: pageNo,
      },
    });
  };

  const loadingState = !data && (isLoading || isFetching )

  return (
    <Styled.GarmentsListContainer>
      <div ref={scrollRef} />
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
                handleClick={handleOnClick}
              />
            ))}
            <Styled.Filler />
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

Styled.Filler = styled.div(props => {
  const t = props.theme;
  return css`
    label: FillerCard;
    ${t.rounded.md};
    width: 296px;
    height: 444px; //true visual height of image
    display: none;
    ${t.m(4)};

    // 2 columns
    ${t.mq.gsm} {
      display: flex;
    }
    // 3 columns
    ${t.mq.gmd} {
      display: none;
    }
    // 4 columns
    ${t.mq.glg} {
      display: flex;
    }
    
    // 5 columns
    ${t.mq.gxl} {
      display: none;
    }
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

