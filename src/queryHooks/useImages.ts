import {
  useMutation,
  // useQuery,
  useQueryClient,
  QueryClient,
} from "react-query";
import { apiPost } from "./api";


type MainImageParams = {
  formData: FormData;
  id: number;
}

const createMainImage = async ({
  formData,
  id,
}: MainImageParams) => {
  return await apiPost({
    endpoint: `/images/main_image/${id}`,
    variables: formData,
    contentType: "multipart/form-data",
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
  console.log("QURY HOOOK")
  const queryClient: QueryClient = useQueryClient();
  return useMutation(createMainImage, {
    onSuccess: (
      data, variables
    ) => {
      console.log("VARIABLES", variables)
      console.log("DATA", data)
      queryClient.invalidateQueries(["garments"]);
    },
  });
}

export { useCreateMainImage };
