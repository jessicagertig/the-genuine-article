import {
  useMutation,
  useQuery,
  useQueryClient,
  QueryClient,
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
    onSuccess: (data, variables) => {
      console.log("DATA", data);
      queryClient.invalidateQueries(["garments"]);
      queryClient.invalidateQueries(["garment"]);
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
};
