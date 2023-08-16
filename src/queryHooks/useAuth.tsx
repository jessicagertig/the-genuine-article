import {
  useMutation,
  // useQuery,
  // useQueryClient,
  // QueryClient,
} from "react-query";
import { apiPost } from "./api";

type LoginParams = {
  email: string;
  password: string;
};

const loginUser = async ({ email, password }: LoginParams) => {
  return await apiPost({
    endpoint: "/auth/login",
    variables:{ email, password },
  });
};

/* HOOKS
-------------------------------------------- */

function useLoginUser(): {
  mutate: any;
  status: any;
  error: any;
  isLoading: boolean;
} {
  console.log("useLoginUser query hook");
  // const queryClient: QueryClient = useQueryClient();
  return useMutation(loginUser, {
    onSuccess: (data, variables) => {
      console.log("VARIABLES", variables);
      console.log("DATA", data);
      // queryClient.invalidateQueries(["garments"]);
    },
  });
}

export { useLoginUser };
