import React from "react";
import { ModalContext } from "../context/ModalContext";

export function useModal() {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be within ModalProvider");
  }

  const [modal, setModal] = context;

  const openModal = React.useCallback(
    (name, props) => {
      setModal({
        open: true,
        name,
        props,
      });
    },
    [setModal]
  );

  const closeModal = React.useCallback(
    (name, props) => {
      setModal({
        open: false,
        name,
        props,
      });
    },
    [setModal]
  );

  return {
    modal,
    openModal,
    closeModal,
  };
}
