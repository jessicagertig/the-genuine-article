import React from 'react';
import {
  useMutation,
  useQuery,
} from "react-query";
import { apiGet, apiPost } from "./api";

type LoginParams = {
  email: string;
  password: string;
};

const loginUser = async ({ email, password }: LoginParams) => {
  return await apiPost({
    endpoint: "/auth/login",
    variables: { email, password },
  });
};

const getAuthedUser = async () => {
  return await apiGet({
    endpoint: "/auth",
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
    onSuccess: () => {
      console.log("LOGIN SUCCESS")
      // queryClient.invalidateQueries(["garments"]);
    },
  });
}

function useAuthedUser({ enabled = true }: { enabled?: boolean } = {}): {
  status: any;
  data: any;
  error: any;
  refetch: any;
  isFetching: boolean;
  isLoading: boolean;
} {
  return useQuery("authedUser", getAuthedUser,
    { 
      enabled,
      refetchOnWindowFocus: true,
      retry: (failureCount, error) => !error.message.includes(401),
      onError: (error) => {
          console.log("%c[useGetMe] ERROR - Redirecting to /logout", "color: #FF0000", window.location.href);
          const path = window.location.pathname;
          if (path.includes("admin")) {
            window.location.href = `${process.env.REACT_APP_BASE_URL}/login`
          }
        }
      },
  );
}

export { useLoginUser, useAuthedUser };
