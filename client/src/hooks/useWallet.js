import React from "react";
import { WalletContext } from "../context/WalletContext";

export function useWallet() {
  const context = React.useContext(WalletContext);

  if (!context) {
    throw new Error("useWallet must be within WalletProvider");
  }

  const [state, setState] = context;

  const setWallet = React.useCallback(
    (wallet) => {
      setState((prev) => ({
        ...prev,
        wallet,
      }));
    },
    [setState]
  );

  return { setWallet, ...state };
}
