import React from "react";

export const WalletContext = React.createContext();

export function WalletProvider({ children, ...props }) {
  const [state, setState] = React.useState({});

  const value = React.useMemo(() => [state, setState], [state]);

  return (
    <WalletContext.Provider value={value} {...props}>
      {children}
    </WalletContext.Provider>
  );
}
