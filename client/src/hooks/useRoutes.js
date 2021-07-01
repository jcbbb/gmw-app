import { useUser } from "./useUser";

import { getRoutes } from "../config";

export const useRoutes = () => {
  const { isAuthenticated } = useUser();
  const routeType = isAuthenticated ? "private" : "public";
  return getRoutes(routeType);
};
