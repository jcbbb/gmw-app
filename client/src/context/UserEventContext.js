import React from "react";

export const UserEventContext = React.createContext();

export function UserEventProvider({ children, ...props }) {
  const [state, setState] = React.useState({});

  const value = React.useMemo(() => [state, setState], [state]);

  return (
    <UserEventContext.Provider value={value} {...props}>
      {children}
    </UserEventContext.Provider>
  );
}
