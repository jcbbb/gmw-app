import { useUser } from "./useUser";

import { getRoutes } from "../config";

export function useRoutes() {
  const { isAuthenticated } = useUser();
  const routeType = isAuthenticated ? "private" : "public";
  return getRoutes(routeType);
}
