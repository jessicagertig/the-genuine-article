import {
  useMutation,
  // useQuery,
  useQueryClient,
  QueryClient,
} from "react-query";
import { apiPost, apiPut, apiDelete } from "./api";

type MainImageParams = {
  formData: FormData;
  id: number;
};

const createMainImage = async ({ formData, id }: MainImageParams) => {
  return await apiPost({
    endpoint: `/images/main_image/${id}`,
    variables: formData,
    contentType: "multipart/form-data",
  });
};

const updateMainImage = async ({ formData, id }: MainImageParams) => {
  return await apiPut({
    endpoint: `/images/main_image/${id}`,
    variables: formData,
    contentType: "multipart/form-data",
  });
};

const deleteMainImage = async (item_id: number) => {
  return await apiDelete({
    endpoint: `/images/main_image/${item_id}`,
  });
};

/* HOOKS
-------------------------------------------- */

function useCreateMainImage(): {
  mutate: any;
  status: any;
  error: any;
  isLoading: boolean;
} {
  console.log("QURY HOOOK");
  const queryClient: QueryClient = useQueryClient();
  return useMutation(createMainImage, {
    onSuccess: (data, variables) => {
      console.log("VARIABLES", variables);
      console.log("DATA", data);
      queryClient.invalidateQueries(["garments"]);
      queryClient.invalidateQueries(["garment", variables.id]);
    },
  });
}

function useUpdateMainImage(): {
  mutate: any;
  status: any;
  error: any;
  isLoading: boolean;
} {
  console.log("Update main image query.");
  const queryClient: QueryClient = useQueryClient();
  return useMutation(updateMainImage, {
    onSuccess: (data: any, variables: any) => {
      console.log("VARIABLES", variables);
      console.log("DATA", data);
      queryClient.invalidateQueries(["garments"]);
      queryClient.invalidateQueries(["garment", variables.id]);
    },
  });
}

function useDeleteMainImage(): {
  mutate: any;
  status: any;
  error: any;
  isLoading: boolean;
} {
  const queryClient: QueryClient = useQueryClient();
  return useMutation(deleteMainImage, {
    onSuccess: (data: any, variables: any) => {
      console.log("DATA", data);
      console.log("Variables", variables)
      queryClient.invalidateQueries(["garments"]);
      queryClient.invalidateQueries(["garment", variables]);
    },
  });
}

export { useCreateMainImage, useUpdateMainImage, useDeleteMainImage };
