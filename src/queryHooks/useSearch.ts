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

const getGarmentsSearch = async ({ query, page = 1, limit = 15}: SearchParams) => {
  return await apiGet({ endpoint: `/items/search?q=${query}&page=${page}&limit=${limit}` });
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

export {
  useGarmentsSearch,
}
