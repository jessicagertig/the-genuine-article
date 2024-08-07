import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  UseQueryResult,
} from "react-query";
import { apiGet, apiPost, apiPut, apiDelete } from "./api";
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
    endpoint: "/items-colors/colors",
    variables: { colorOption },
  });
};

const addMaterialOption = async ({
  materialOption,
}: {
  materialOption: string;
}): Promise<Material> => {
  return await apiPost({
    endpoint: "/items-materials/materials",
    variables: { materialOption },
  });
};

const editGarmentTitleOption = async ({
  garmentTitleOptionId,
  garmentTitleOption,
}: {
  garmentTitleOptionId: number;
  garmentTitleOption: string;
}) => {
  console.log("%ceditGarmentTitleOption inputs", "background-color: orange;", {
    garmentTitleOptionId,
    garmentTitleOption,
  });
  return await apiPut({
    endpoint: `/items/garment_titles/${garmentTitleOptionId}`,
    variables: { garmentTitleOption },
  });
};

// Edit color option
const editColorOption = async ({
  colorOptionId,
  colorOption,
}: {
  colorOptionId: number;
  colorOption: string;
}): Promise<void> => {
  return await apiPut({
    endpoint: `/items-colors/colors/${colorOptionId}`,
    variables: { colorOption },
  });
};

// Edit material option
const editMaterialOption = async ({
  materialOptionId,
  materialOption,
}: {
  materialOptionId: number;
  materialOption: string;
}): Promise<void> => {
  return await apiPut({
    endpoint: `/items-materials/materials/${materialOptionId}`,
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
    endpoint: `/items-colors/colors/${colorOptionId}`,
    variables: {},
  });
};

const deleteMaterialOption = async ({
  materialOptionId,
}: {
  materialOptionId: number;
}) => {
  return await apiDelete({
    endpoint: `/items-materials/materials/${materialOptionId}`,
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
  const queryClient: QueryClient = useQueryClient();
  return useMutation(addGarmentTitleOption, {
    onSuccess: (data, variables) => {
      console.log("Add GarmentTitle Option VARIABLES:", { variables });
      console.log("Add GarmentTitle Option DATA:", { data });
      queryClient.invalidateQueries("menus");
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
      console.log("Add Color Option VARIABLES:", { variables });
      console.log("Add Color Option DATA:", { data });
      queryClient.invalidateQueries("menus");
    },
  });
}

function useAddMaterialOption(): {
  mutate: any;
  status: any;
  error: any;
  isLoading: boolean;
} {
  const queryClient: QueryClient = useQueryClient();
  return useMutation(addMaterialOption, {
    onSuccess: (data, variables) => {
      console.log("Add Material option VARIABLES:", { variables });
      console.log("Add Material option DATA:", { data });
      queryClient.invalidateQueries("menus");
    },
  });
}

function useEditGarmentTitleOption(): {
  mutate: any;
  status: any;
  error: any;
  isLoading: boolean;
} {
  const queryClient: QueryClient = useQueryClient();
  return useMutation(editGarmentTitleOption, {
    onSuccess: (data, variables) => {
      console.log(
        "%cSuccess!",
        "background-color: green;",
        "Edit Garment Title Option VARIABLES:",
        { variables }
      );
      console.log(
        "%cSuccess!",
        "background-color: green;",
        "Edit Garment Title Option DATA:",
        { data }
      );
      queryClient.invalidateQueries("menus");
    },
  });
}

function useEditColorOption(): {
  mutate: any;
  status: any;
  error: any;
  isLoading: boolean;
} {
  const queryClient: QueryClient = useQueryClient();
  return useMutation(editColorOption, {
    onSuccess: (data, variables) => {
      console.log(
        "%cSuccess!",
        "background-color: green;",
        "Edit Color Option VARIABLES:",
        { variables }
      );
      console.log(
        "%cSuccess!",
        "background-color: green;",
        "Edit Color Option DATA:",
        { data }
      );
      queryClient.invalidateQueries("menus");
    },
  });
}

function useEditMaterialOption(): {
  mutate: any;
  status: any;
  error: any;
  isLoading: boolean;
} {
  const queryClient: QueryClient = useQueryClient();
  return useMutation(editMaterialOption, {
    onSuccess: (data, variables) => {
      console.log(
        "%cSuccess!",
        "background-color: green;",
        "Edit Material Option VARIABLES:",
        { variables }
      );
      console.log(
        "%cSuccess!",
        "background-color: green;",
        "Edit Material Option DATA:",
        { data }
      );
      queryClient.invalidateQueries("menus");
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
      console.log("Delete GarmentTitle DATA:", { data });
      queryClient.invalidateQueries("menus");
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
      console.log("Delete Color DATA:", { data });
      queryClient.invalidateQueries("menus");
    },
  });
}

function useDeleteMaterialOption(): {
  mutate: any;
  status: any;
  error: any;
  isLoading: boolean;
} {
  const queryClient: QueryClient = useQueryClient();
  return useMutation(deleteMaterialOption, {
    onSuccess: (data: any) => {
      console.log("Delete Material DATA:", { data });
      queryClient.invalidateQueries("menus");
    },
  });
}

export {
  useMenus,
  useAddGarmentTitleOption,
  useAddColorOption,
  useAddMaterialOption,
  useEditGarmentTitleOption,
  useEditColorOption,
  useEditMaterialOption,
  useDeleteGarmentTitleOption,
  useDeleteColorOption,
  useDeleteMaterialOption,
};
