import {
  useMutation,
  useQuery,
  useQueryClient,
  QueryClient,
} from "react-query";
import { apiGet, apiPost, apiPut } from "./api";
import { GarmentState } from "src/types";

type GetGarmentParam = { itemId: number | undefined };

interface UpdateGarmentParams extends GarmentState {
  itemId: number;
}

const getGarments = async () => {
  return await apiGet({ endpoint: "/items" });
};

const getGarment = async ({ itemId }: GetGarmentParam) => {
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

function useGarment({ itemId }: GetGarmentParam): {
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

export { useGarments, useGarment, useCreateGarment, useUpdateGarment };
