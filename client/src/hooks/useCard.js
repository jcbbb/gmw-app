import React from "react";
import { CardContext } from "../context/CardContext";

export function useCard() {
  const context = React.useContext(CardContext);

  if (!context) {
    throw new Error("useCard must be within CardProvider");
  }
  const [state, setState] = context;

  const setUserCards = React.useCallback(
    (cards) => {
      setState((prev) => ({
        ...prev,
        cards,
      }));
    },
    [setState]
  );

  return { setUserCards, ...state };
}
