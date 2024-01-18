import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  UseQueryResult,
} from "react-query";
import { apiGet, apiPost, apiDelete } from "./api";
import { Menus, Title } from "src/utils/formHelpers";

const getMenus = async (): Promise<Menus> => {
  return await apiGet({ endpoint: "/items/menus" });
};

const addGarmentTitle = async ({
  garmentTitle,
}: {
  garmentTitle: string;
}): Promise<Title> => {
  return await apiPost({
    endpoint: "/items/garment_titles",
    variables: { garmentTitle },
  });
};

const deleteGarmentTitle = async ({
  garmentTitleId,
}: {
  garmentTitleId: number;
}) => {
  return await apiDelete({
    endpoint: `/items/garment_titles/${garmentTitleId}`,
    variables: {},
  });
};
/* Hooks
--===================================================-- */

function useMenus(): UseQueryResult<Menus, string> {
  return useQuery(["menus"], () => getMenus(), {
    refetchOnWindowFocus: false,
  });
}

function useAddGarmentTitle(): {
  mutate: any;
  status: any;
  error: any;
  isLoading: boolean;
} {
  // console.log("QUERY HOOK");
  const queryClient: QueryClient = useQueryClient();
  return useMutation(addGarmentTitle, {
    onSuccess: (data, variables) => {
      console.log("VARIABLES", variables);
      console.log("DATA", data);
      queryClient.invalidateQueries(["menus"]);
    },
  });
}

function useDeleteGarmentTitle(): {
  mutate: any;
  status: any;
  error: any;
  isLoading: boolean;
} {
  const queryClient: QueryClient = useQueryClient();
  return useMutation(deleteGarmentTitle, {
    onSuccess: (data: any) => {
      console.log("DATA", data);
      queryClient.invalidateQueries(["menus"]);
      // queryClient.invalidateQueries(["garment", data.id]);
    },
  });
}


export { useMenus, useAddGarmentTitle, useDeleteGarmentTitle };
