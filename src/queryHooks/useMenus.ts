import {
  useQuery,
  UseQueryResult
} from "react-query";
import { apiGet } from "./api";
import { Menus } from "src/utils/formHelpers";

const getMenus = async (): Promise<Menus> => {
  return await apiGet({ endpoint: "/items/menus" });
};

/* Hooks
--===================================================-- */

function useMenus(): UseQueryResult<Menus, string> {
  return useQuery(["menus"], () => getMenus(), {
    refetchOnWindowFocus: false,
  });
}

export { useMenus };
