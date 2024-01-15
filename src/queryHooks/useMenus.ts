import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  UseQueryResult
} from "react-query";
import { apiGet, apiPost } from "./api";
import { Menus, Title } from "src/utils/formHelpers";

const getMenus = async (): Promise<Menus> => {
  return await apiGet({ endpoint: "/items/menus" });
};

const addGarmentTitle = async ({ garmentTitle }: { garmentTitle: string }): Promise<Title> => {
  return await apiPost({
    endpoint: "/items/garment_titles",
    variables: { garmentTitle },
  });
}

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

export { useMenus, useAddGarmentTitle };
