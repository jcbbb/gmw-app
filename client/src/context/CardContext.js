import React from "react";

export const CardContext = React.createContext();

export function CardProvider({ children, ...props }) {
  const [state, setState] = React.useState({});

  const value = React.useMemo(() => [state, setState], [state]);

  return (
    <CardContext.Provider value={value} {...props}>
      {children}
    </CardContext.Provider>
  );
}
