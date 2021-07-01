import React from "react";
import Modal from "../components/modal/Modal";

export const ModalContext = React.createContext();

export function ModalProvider({ children, ...props }) {
  const [state, setState] = React.useState({
    open: false,
    name: undefined,
  });

  const value = React.useMemo(() => [state, setState], [state]);

  return (
    <ModalContext.Provider value={value} {...props}>
      {children}
      {<Modal />}
    </ModalContext.Provider>
  );
}
