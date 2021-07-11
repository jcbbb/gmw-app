import React from "react";

export const DonationContext = React.createContext();

export function DonationProvider({ children, ...props }) {
  const [state, setState] = React.useState({});

  const value = React.useMemo(() => [state, setState], [state]);

  return (
    <DonationContext.Provider value={value} {...props}>
      {children}
    </DonationContext.Provider>
  );
}
