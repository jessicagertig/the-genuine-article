import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  UseQueryResult,
} from "react-query";
import { apiGet, apiPost, apiDelete } from "./api";
import { Menus, Title, Color, Material } from "src/utils/formHelpers";

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

const addMaterialOption = async ({
  materialOption,
}: {
  materialOption: string;
}): Promise<Material> => {
  return await apiPost({
    endpoint: "/materials",
    variables: { materialOption },
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

const deleteColorOption = async ({
  colorOptionId,
}: {
  colorOptionId: number;
}) => {
  return await apiDelete({
    endpoint: `/colors/${colorOptionId}`,
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

function useAddMaterialOption(): {
  mutate: any;
  status: any;
  error: any;
  isLoading: boolean;
} {
  // console.log("QUERY HOOK");
  const queryClient: QueryClient = useQueryClient();
  return useMutation(addMaterialOption, {
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

function useDeleteColorOption(): {
  mutate: any;
  status: any;
  error: any;
  isLoading: boolean;
} {
  const queryClient: QueryClient = useQueryClient();
  return useMutation(deleteColorOption, {
    onSuccess: (data: any) => {
      console.log("DATA", data);
      queryClient.invalidateQueries(["menus"]);
      // queryClient.invalidateQueries(["garment", data.id]);
    },
  });
}

export {
  useMenus,
  useAddGarmentTitleOption,
  useAddColorOption,
  useAddMaterialOption,
  useDeleteGarmentTitleOption,
  useDeleteColorOption
};
