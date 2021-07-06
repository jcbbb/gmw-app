import React from "react";
import api from "../api";
import { useAsync } from "../hooks/useAsync";

export const UserContext = React.createContext();

export function UserProvider({ children, ...props }) {
  const [state, setState] = React.useState({});
  const { run, isLoading, isIdle } = useAsync();

  const value = React.useMemo(() => [state, setState], [state]);

  React.useEffect(() => {
    const checkAuth = async () => {
      const { user } = await run(api.user.checkAuth()).catch((err) => ({}));
      if (user) {
        setState({ user });
      }
    };

    checkAuth();
  }, [run]);

  if (isLoading || isIdle) return null;

  return (
    <UserContext.Provider value={value} {...props}>
      {children}
    </UserContext.Provider>
  );
}
