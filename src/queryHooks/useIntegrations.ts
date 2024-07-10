import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  UseQueryResult,
} from "react-query";
import { apiGet, apiPost } from "./api";

// Types
interface PinterestBoard {
  name: string;
  description: string;
}

interface PinterestPin {
  itemId: number;
  boardId: number;
}

interface PinterestPinResponse {
  title: string;
  description: string;
  link: string;
  image_url: string;
}

// Functions
const getPinterestBoards = async (): Promise<any> => {
  console.log(
    "%cgetPinterestBoards params:",
    "background-color: black; color: white;",
    {}
  );
  return await apiGet({ endpoint: "/integrations/pinterest/boards" });
};

const createPinterestBoard = async ({
  board,
}: {
  board: PinterestBoard;
}): Promise<any> => {
  return await apiPost({
    endpoint: "/integrations/pinterest/boards",
    variables: { board },
  });
};

const getPinterestBoard = async ({
  boardId,
  enabled = false,
}: {
  boardId: string;
  enabled?: boolean;
}): Promise<any> => {
  console.log(
    "%cgetPinterestBoard params:",
    "background-color: black; color: white;",
    { boardId, enabled }
  );
  return await apiGet({
    endpoint: `/integrations/pinterest/board/${boardId}`,
  });
};

const getPinterestPin = async ({
  pinId,
  enabled = false,
}: {
  pinId: string;
  enabled?: boolean;
}): Promise<any> => {
  console.log(
    "%cgetPinterestPin params:",
    "background-color: black; color: white;",
    { pinId, enabled }
  );
  return await apiGet({
    endpoint: `/integrations/pinterest/pin/${pinId}`,
  });
};

const createPinterestPin = async ({
  itemId,
  boardId,
}: PinterestPin): Promise<PinterestPinResponse> => {
  return await apiPost({
    endpoint: "/integrations/pinterest/pin",
    variables: { itemId, boardId },
  });
};

// Hooks
function usePinterestBoards(): UseQueryResult<any, string> {
  return useQuery(["pinterestBoards"], () => getPinterestBoards(), {
    onSuccess: (data) => {
        console.log(
          "%cusePinterestBoards onSuccess",
          "background-color: black; color: white;",
          { data }
        );
    },
    refetchOnWindowFocus: false,
  });
}

function useCreatePinterestBoard(): {
  mutate: any;
  status: any;
  error: any;
  isLoading: boolean;
} {
  const queryClient: QueryClient = useQueryClient();
  return useMutation(createPinterestBoard, {
    onSuccess: (data, variables) => {
      console.log("Create Pinterest Board VARIABLES:", { variables });
      console.log("Create Pinterest Board DATA:", { data });
      queryClient.invalidateQueries("pinterestBoards");
    },
    onError: (error, variables) => {
      console.log(
        "%cCreate Pinterest Board ERROR:",
        "background-color: pink;",
        { variables, error }
      );
    },
  });
}

function usePinterestBoard({
  boardId,
  enabled = false,
}: {
  boardId: string;
  enabled?: boolean;
}): {
  status: any;
  data: any;
  error: any;
  refetch: any;
  isFetching: boolean;
  isLoading: boolean;
} {
  return useQuery(
    ["pinterestBoard", boardId],
    () => getPinterestBoard({ boardId, enabled }),
    {
      enabled,
      refetchOnWindowFocus: true,
    }
  );
}

function usePinterestPin({
  pinId,
  enabled = false,
}: {
  pinId: string;
  enabled?: boolean;
}): {
  status: any;
  data: any;
  error: any;
  refetch: any;
  isFetching: boolean;
  isLoading: boolean;
} {
  return useQuery(
    ["pinterestPin", pinId],
    () => getPinterestPin({ pinId, enabled }),
    {
      enabled,
      refetchOnWindowFocus: true,
    }
  );
}

function useCreatePinterestPin(): {
  mutate: any;
  status: any;
  error: any;
  isLoading: boolean;
} {
  const queryClient: QueryClient = useQueryClient();
  return useMutation(createPinterestPin, {
    onSuccess: (data, variables) => {
      console.log("Create Pinterest Pin VARIABLES:", { variables });
      console.log("Create Pinterest Pin DATA:", { data });
      queryClient.invalidateQueries("pinterestBoards");
    },
    onError: (error, variables) => {
      console.log(
        "%cCreate Pinterest Pin ERROR:",
        "background-color: pink;",
        { variables, error }
      );
    },
  });
}

export {
  usePinterestBoards,
  useCreatePinterestBoard,
  usePinterestBoard,
  usePinterestPin,
  useCreatePinterestPin,
};
