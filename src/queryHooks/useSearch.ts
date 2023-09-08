import {
  useQueryClient,
  useInfiniteQuery
} from "react-query";
import { apiGet } from "./api";

type SearchParams = {
  query: string;
  page?: number;
  limit?: number;
}

const getGarmentsSearch = async ({ query, page = 1, limit = 12}: SearchParams) => {
  return await apiGet({ endpoint: `/items/search?q=${query}&page=${page}&limit=${limit}` });
};

const getGarmentsKeywordSearch = async ({ query, page = 1, limit = 12}: SearchParams): Promise<{
  data: any;
  pagination: any;
}> => {
  const res: any = await apiGet({ endpoint: `/items/keyword_search?q=${query}&page=${page}&limit=${limit}` });
  return { data: res.data, pagination: res.pagination };
};


function useGarmentsSearch(query: string, enabled = false): {
  data: any;
  refetch: any;
  error: any;
  isFetching: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isFetchingNextPage?: string | boolean; // isFetchingMore
  fetchNextPage: () => any; // fetchMore
  hasNextPage?: boolean; // canFetchMore
} {
  const queryClient = useQueryClient();
  return useInfiniteQuery(
  ["searchGarments", query],
  ({ pageParam = 1 }) => getGarmentsSearch({ query, page: pageParam }),
    { 
      enabled: enabled,
      onSettled: () => {
        queryClient.invalidateQueries("garments");
        // queryClient.invalidateQueries("searchGarments");
      },
      getNextPageParam: (lastPage, allPages) => {
        // return allPages.length + 1;
        return lastPage;
      },
    },
  );
}

function useGarmentsKeywordSearch(query: string, enabled = false): {
  data: any;
  pagination: any;
  refetch: any;
  error: any;
  isFetching: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isFetchingNextPage?: string | boolean; // isFetchingMore
  fetchNextPage: () => any; // fetchMore
  hasNextPage?: boolean; // canFetchMore
} {
  const queryClient = useQueryClient();
  const {
    data,
    refetch,
    error,
    isFetching,
    isSuccess,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(
  ["searchGarments", query],
  ({ pageParam = 1 }) => getGarmentsKeywordSearch({ query, page: pageParam }),
    { 
      enabled: enabled,
      onSuccess: (data) => {
        console.log("Keyword Search Data", data)
      },
      onSettled: () => {
        console.log("Keyword Search Data", data)
        queryClient.invalidateQueries("garments");
        // queryClient.invalidateQueries("searchGarments");
      },
      getNextPageParam: (lastPage, allPages) => {
        console.log("All Pages:", allPages)
        const pagination = lastPage.pagination
        const nextPage: number = pagination.nextPage
        return nextPage;
      },
    },
  );

  // Access the data and pagination of each page
  // const allData = data?.pages.map(page => page.data);
  const allPagination = data?.pages.map(page => page.pagination);

  // Add data and pagination to the useInfiniteQuery result
  return {
    data,
    pagination: allPagination,
    refetch,
    error,
    isFetching,
    isSuccess,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  };
}

export {
  useGarmentsSearch,
  useGarmentsKeywordSearch,
}
