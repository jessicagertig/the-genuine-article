import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  UseQueryResult,
} from "react-query";
import { apiGet, apiPost, apiDelete } from "./api";
import { Menus, Title, Color } from "src/utils/formHelpers";

const getMenus = async (): Promise<Menus> => {
  return await apiGet({ endpoint: "/items/menus" });
};

const addGarmentTitleOption = async ({
  garmentTitleOption,
}: {
  garmentTitleOption: string;
}): Promise<Title> => {
  return await apiPost({
    endpoint: "/items/garment_titles",
    variables: { garmentTitleOption },
  });
};

const deleteGarmentTitleOption = async ({
  garmentTitleOptionId,
}: {
  garmentTitleOptionId: number;
}) => {
  return await apiDelete({
    endpoint: `/items/garment_titles/${garmentTitleOptionId}`,
    variables: {},
  });
};

const addColorOption = async ({
  colorOption,
}: {
  colorOption: string;
}): Promise<Color> => {
  return await apiPost({
    endpoint: "/colors",
    variables: { colorOption },
  });
};

/* Hooks
--===================================================-- */

function useMenus(): UseQueryResult<Menus, string> {
  return useQuery(["menus"], () => getMenus(), {
    refetchOnWindowFocus: false,
  });
}

function useAddGarmentTitleOption(): {
  mutate: any;
  status: any;
  error: any;
  isLoading: boolean;
} {
  // console.log("QUERY HOOK");
  const queryClient: QueryClient = useQueryClient();
  return useMutation(addGarmentTitleOption, {
    onSuccess: (data, variables) => {
      console.log("VARIABLES", variables);
      console.log("DATA", data);
      queryClient.invalidateQueries(["menus"]);
    },
  });
}

function useDeleteGarmentTitleOption(): {
  mutate: any;
  status: any;
  error: any;
  isLoading: boolean;
} {
  const queryClient: QueryClient = useQueryClient();
  return useMutation(deleteGarmentTitleOption, {
    onSuccess: (data: any) => {
      console.log("DATA", data);
      queryClient.invalidateQueries(["menus"]);
      // queryClient.invalidateQueries(["garment", data.id]);
    },
  });
}

function useAddColorOption(): {
  mutate: any;
  status: any;
  error: any;
  isLoading: boolean;
} {
  // console.log("QUERY HOOK");
  const queryClient: QueryClient = useQueryClient();
  return useMutation(addColorOption, {
    onSuccess: (data, variables) => {
      console.log("VARIABLES", variables);
      console.log("DATA", data);
      queryClient.invalidateQueries(["menus"]);
    },
  });
}


export { useMenus, useAddGarmentTitleOption, useDeleteGarmentTitleOption, useAddColorOption };
