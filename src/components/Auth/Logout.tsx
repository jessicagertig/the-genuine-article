import React from "react";
import { useQueryClient } from "react-query";

function Logout(props: any) {
  console.log("%c[Logout] render", "color: #1976D2", { ...props });

  const queryClient = useQueryClient();

  React.useEffect(() => {
    console.log("%c[Logout] useEffect", "color: #1976D2");
    localStorage.removeItem("token");
    queryClient.setQueryData(["authedUser"], null);
    queryClient.invalidateQueries("authedUser");
    queryClient.clear();
    queryClient.removeQueries();   
    window.location.href = `${process.env.REACT_APP_BASE_URL}/`;
  }, []);

  return null;
}

export default Logout;
