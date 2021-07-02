import React from "react";

export const UserContext = React.createContext();

export function UserProvider({ children, ...props }) {
  const [state, setState] = React.useState({});

  const value = React.useMemo(() => [state, setState], [state]);

  return (
    <UserContext.Provider value={value} {...props}>
      {children}
    </UserContext.Provider>
  );
}
