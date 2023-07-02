import {
  useQuery,
} from "react-query";
import { apiGet } from "./api";

const getMenus = async () => {
  return await apiGet({ endpoint: "/items/menus" });
};

/* Hooks
--===================================================-- */

function useMenus(): {
  status: any;
  data: any;
  error: any;
  isFetching: boolean;
  isLoading: boolean;
} {
  return useQuery(["menus"], () => getMenus(), {
    refetchOnWindowFocus: false,
  });
}

export { useMenus };
