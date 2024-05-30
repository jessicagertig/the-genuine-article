// import { useMutation, useQuery, useQueryClient, QueryClient } from "react-query";
// import { apiGet, apiPost } from "./api";

// type BoardParam = { boardId: string | undefined };
// type PinParam = { pinId: string | undefined };

// const getBoards = async () => {
//   return await apiGet({ endpoint: "/integrations/pinterest/boards" });
// };

// const getBoard = async ({ boardId }: BoardParam) => {
//   if (boardId !== undefined) {
//     return await apiGet({
//       endpoint: `/integrations/pinterest/board/${boardId}`,
//     });
//   }
// };

// const getPin = async ({ pinId }: PinParam) => {
//   if (pinId !== undefined) {
//     return await apiGet({ endpoint: `/integrations/pinterest/pin/${pinId}` });
//   }
// };

// const createBoard = async (boardData: any) => {
//   return await apiPost({
//     endpoint: "/integrations/pinterest/boards",
//     variables: boardData,
//   });
// };

// type CreatePinData = {
//   itemId: number;
//   boardId: string;
// };

// const createPin = async ({ itemId, boardId }: CreatePinData) => {
//   return await apiPost({
//     endpoint: "/integrations/pinterest/pin",
//     variables: { item_id: itemId, board_id: boardId },
//   });
// };

// /* Hooks
// --===================================================-- */

// function useBoards(): {
//   status: any;
//   data: any;
//   error: any;
//   isFetching: boolean;
//   isLoading: boolean;
// } {
//   return useQuery(["boards"], () => getBoards(), {
//     refetchOnWindowFocus: false,
//   });
// }

// function useBoard({ boardId }: BoardParam): {
//   status: any;
//   data: any;
//   error: any;
//   isFetching: boolean;
//   isLoading: boolean;
// } {
//   return useQuery(["board", boardId ? boardId : null], () => {
//     return getBoard({ boardId });
//   });
// }

// function usePin({ pinId }: PinParam): {
//   status: any;
//   data: any;
//   error: any;
//   isFetching: boolean;
//   isLoading: boolean;
// } {
//   return useQuery(["pin", pinId ? pinId : null], () => {
//     return getPin({ pinId });
//   });
// }

// function useCreateBoard(): {
//   mutate: any;
//   status: any;
//   error: any;
//   isLoading: boolean;
// } {
//   const queryClient: QueryClient = useQueryClient();
//   return useMutation(createBoard, {
//     onSuccess: (data, variables) => {
//       console.log("VARIABLES", variables);
//       console.log("DATA", data);
//       queryClient.invalidateQueries(["boards"]);
//     },
//   });
// }

// function useCreatePin(): {
//   mutate: any;
//   status: any;
//   error: any;
//   isLoading: boolean;
// } {
//   const queryClient: QueryClient = useQueryClient();
//   return useMutation(createPin, {
//     onSuccess: (data, { itemId, boardId }) => {
//       console.log("ITEM ID", itemId);
//       console.log("BOARD ID", boardId);
//       console.log("DATA", data);
//       queryClient.invalidateQueries(["pins"]);
//     },
//   });
// }

// export { useBoards, useBoard, usePin, useCreateBoard, useCreatePin };

import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  UseQueryResult,
} from "react-query";
import { apiGet, apiPost } from "./api";

// Pinterest API endpoints
const getPinterestBoards = async (): Promise<any[]> => {
  return await apiGet({ endpoint: "/integrations/pinterest/boards" });
};

const createPinterestBoard = async (board: any): Promise<any> => {
  return await apiPost({
    endpoint: "/integrations/pinterest/boards",
    variables: { board },
  });
};

const getPinterestBoard = async (boardId: string) => {
  console.log(boardId)
  return await apiGet({ endpoint: `/integrations/pinterest/board/${boardId}` });
};

const getPinterestPin = async (pinId: string) => {
  return await apiGet({ endpoint: `/integrations/pinterest/pin/${pinId}` });
};

type PinParams = { itemId: number; boardId: string };

const createPinterestPin = async ({
  itemId,
  boardId,
}: PinParams): Promise<any> => {
  return await apiPost({
    endpoint: `/integrations/pinterest/pin`,
    variables: { itemId, boardId },
  });
};

/* Hooks
--===================================================-- */

function usePinterestBoards(): UseQueryResult<any[], string> {
  return useQuery(["pinterestBoards"], () => getPinterestBoards(), {
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
  });
}

function useGetPinterestBoard(boardId: string, enabled = false): {
  data: any;
  isLoading: boolean;
  refetch: any;
} {
  return useQuery(["pinterestBoard"], () => getPinterestBoard(boardId), {
    enabled: enabled,
    refetchOnWindowFocus: false,
  });
}

function useGetPinterestPin(
  pinId: string,
  enabled = false
): {
  data: any;
  isLoading: boolean;
  refetch: any;
} {
  return useQuery(["pinterestPin"], () => getPinterestPin(pinId), {
    enabled: enabled,
    refetchOnWindowFocus: false,
  });
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
  });
}

export {
  usePinterestBoards,
  useCreatePinterestBoard,
  useGetPinterestBoard,
  useGetPinterestPin,
  useCreatePinterestPin,
};
