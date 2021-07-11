import React from "react";
import { DonationContext } from "../context/DonationContext";

export function useDonation() {
  const context = React.useContext(DonationContext);

  if (!context) {
    throw new Error("useDonation must be within DonationProvider");
  }

  const [state, setState] = context;

  const setDonations = React.useCallback(
    (donations) => {
      setState((prev) => ({
        ...prev,
        donations,
      }));
    },
    [setState]
  );

  return { setDonations, ...state };
}
