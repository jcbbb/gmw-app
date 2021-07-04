import React from "react";
import { UserEventContext } from "../context/UserEventContext";

export function useUserEvent() {
  const context = React.useContext(UserEventContext);

  if (!context) {
    throw new Error("useUserEvent must be within UserEventProvider");
  }

  const [state, setState] = context;

  const events = state.events;

  const deleteOne = React.useCallback(
    (id) => {
      setState((prev) => prev.events.filter((event) => event.id !== id));
    },
    [setState]
  );

  const updateOne = React.useCallback(
    (id, update) => {
      const index = state.events.findIndex((event) => event.id === id);
      const eventsCopy = [...state.events];
      eventsCopy[index] = update;
      setState({ events: eventsCopy });
    },
    [setState, state]
  );

  const setUserEvents = React.useCallback((events) => setState({ events }), [setState]);

  return { events, deleteOne, setUserEvents, updateOne };
}
