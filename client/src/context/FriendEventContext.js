import React from "react";

export const FriendEventContext = React.createContext();

export function FriendEventProvider({ children, ...props }) {
  const [state, setState] = React.useState({});

  const value = React.useMemo(() => [state, setState], [state]);

  return (
    <FriendEventContext.Provider value={value} {...props}>
      {children}
    </FriendEventContext.Provider>
  );
}
