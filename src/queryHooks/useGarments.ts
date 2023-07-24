import {
  useMutation,
  useQuery,
  useQueryClient,
  QueryClient,
  useInfiniteQuery
} from "react-query";
import { apiGet, apiPost, apiPut, apiDelete } from "./api";
import { GarmentState } from "src/types";

type GarmentParam = { itemId: number | undefined };

interface UpdateGarmentParams extends GarmentState {
  itemId: number;
}

const getGarments = async () => {
  return await apiGet({ endpoint: "/items" });
};

const getPaginatedGarments = async (page = 1, limit = 15) => {
  return await apiGet({ endpoint: `/items/list?page=${page}&limit=${limit}` });
};

const getPageCount = async (limit = 15) => {
  return await apiGet({ endpoint: `/items/pages?limit=${limit}` });
};

const getDailyGarment = async () => {
  return await apiGet({ endpoint: `/items/daily` });
};

const getGarment = async ({ itemId }: GarmentParam) => {
  if (itemId !== undefined) {
    return await apiGet({ endpoint: `/items/${itemId}` });
  }
};

const createGarment = async ({
  itemInfo,
  itemColors,
  itemMaterials,
}: GarmentState) => {
  return await apiPost({
    endpoint: "/items",
    variables: { itemInfo, itemColors, itemMaterials },
  });
};

const updateGarment = async ({
  itemId,
  itemInfo,
  itemColors,
  itemMaterials,
}: UpdateGarmentParams) => {
  return await apiPut({
    endpoint: `/items/${itemId}`,
    variables: { itemInfo, itemColors, itemMaterials },
  });
};

const deleteGarment = async ({ itemId }: GarmentParam) => {
  if (itemId !== undefined) {
    return await apiDelete({
      endpoint: `/items/${itemId}`,
      variables: {},
    });
  }
};

/* Hooks
--===================================================-- */

function useGarments(): {
  status: any;
  data: any;
  error: any;
  isFetching: boolean;
  isLoading: boolean;
} {
  return useQuery(["garments"], () => getGarments(), {
    refetchOnWindowFocus: false,
  });
}

function usePaginatedGarments(page: number): {
  status: any;
  data: any;
  error: any;
  isFetching: boolean;
  isLoading: boolean;
  isPreviousData: any;
} {
  return useQuery(["garmentsPages", page], () => getPaginatedGarments(page), {
    refetchOnWindowFocus: false,
    keepPreviousData: true
  });
}

function usePageCount(limit: number): {
  status: any;
  data: any;
  error: any;
  isFetching: boolean;
  isLoading: boolean;
} {
  return useQuery(["pageCount"], () => getPageCount(limit), {
    refetchOnWindowFocus: false,
  });
}

function useInfiniteGarments(): {
  data: any;
  error: any;
  isFetching: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isFetchingNextPage?: string | boolean; // isFetchingMore
  fetchNextPage: () => any; // fetchMore
  hasNextPage?: boolean; // canFetchMore
} {
  // const queryClient = useQueryClient();
  return useInfiniteQuery(
  ["paginatedGarments"],
  ({ pageParam = 1 }) => getPaginatedGarments(pageParam),
    {
      // ...queryOptions,
      // onSettled: () => {
      //   queryClient.invalidateQueries("notificationsHasUnread");
      // },
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length + 1;
      },
    },
  );
}

function useDailyGarment(): {
  status: any;
  data: any;
  error: any;
  isFetching: boolean;
  isLoading: boolean;
} {
  return useQuery(["dailyGarment"], () => {
    return getDailyGarment();
  });
}

function useGarment({ itemId }: GarmentParam): {
  status: any;
  data: any;
  error: any;
  isFetching: boolean;
  isLoading: boolean;
} {
  return useQuery(["garment", itemId ? itemId : null], () => {
    return getGarment({ itemId });
  });
}

function useCreateGarment(): {
  mutate: any;
  status: any;
  error: any;
  isLoading: boolean;
} {
  const queryClient: QueryClient = useQueryClient();
  return useMutation(createGarment, {
    onSuccess: (data, variables) => {
      console.log("VARIABLES", variables);
      console.log("DATA", data);
      queryClient.invalidateQueries(["garments"]);
    },
  });
}

function useUpdateGarment(): {
  mutate: any;
  status: any;
  error: any;
  isLoading: boolean;
} {
  const queryClient: QueryClient = useQueryClient();
  return useMutation(updateGarment, {
    onSuccess: (data, variables) => {
      console.log("VARIABLES", variables);
      console.log("DATA", data);
      queryClient.invalidateQueries(["garments"]);
      queryClient.invalidateQueries(["garment"]);
    },
  });
}

function useDeleteGarment(): {
  mutate: any;
  status: any;
  error: any;
  isLoading: boolean;
} {
  const queryClient: QueryClient = useQueryClient();
  return useMutation(deleteGarment, {
    onSuccess: (data: any, variables: any) => {
      console.log("DATA", data);
      queryClient.invalidateQueries(["garments"]);
      // queryClient.invalidateQueries(["garment", data.id]);
    },
  });
}

export {
  useGarments,
  useDailyGarment,
  useGarment,
  useCreateGarment,
  useUpdateGarment,
  useDeleteGarment,
  usePaginatedGarments,
  useInfiniteGarments,
  usePageCount,
};
