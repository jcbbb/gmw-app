import React from "react";
import { UserContext } from "../context/UserContext";

export function useUser() {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be within UserProvider");
  }

  const [state, setState] = context;

  const isAuthenticated = !!state.user;

  const login = (user) => setState(user);

  const logout = () => setState({});

  const updateState = React.useCallback(
    (update) => {
      setState((prev) => ({
        ...prev,
        ...update,
      }));
    },
    [setState]
  );

  const setUserFriends = React.useCallback(
    (friends) => {
      updateState({ friends });
    },
    [updateState]
  );

  const setSuggestedFriends = React.useCallback(
    (suggestedFriends) => {
      updateState({ suggestedFriends });
    },
    [updateState]
  );

  const setIncomingRequests = React.useCallback(
    (incomingRequests) => {
      updateState({ incomingRequests });
    },
    [updateState]
  );

  const setOutgoingRequests = React.useCallback(
    (outgoingRequests) => {
      updateState({ outgoingRequests });
    },
    [updateState]
  );

  const acceptIncoming = React.useCallback(
    (id) => {
      setState((prev) => ({
        ...prev,
        friends: [...prev.friends, prev.incomingRequests.find((req) => req.id === id)],
        incomingRequests: prev.incomingRequests.filter((req) => req.id !== id),
      }));
    },
    [setState]
  );

  const deleteOutgoing = React.useCallback(
    (id) => {
      setState((prev) => ({
        ...prev,
        outgoingRequests: prev.outgoingRequests.filter((req) => req.id !== id),
      }));
    },
    [setState]
  );

  const deleteIncoming = React.useCallback(
    (id) => {
      setState((prev) => ({
        ...prev,
        incomingRequests: prev.outgoingRequests.filter((req) => req.id !== id),
      }));
    },
    [setState]
  );

  const setUserCards = React.useCallback(
    (cards) => {
      setState((prev) => ({
        ...prev,
        cards,
      }));
    },
    [setState]
  );

  return {
    isAuthenticated,
    login,
    logout,
    setUserFriends,
    setSuggestedFriends,
    setIncomingRequests,
    setOutgoingRequests,
    acceptIncoming,
    deleteIncoming,
    deleteOutgoing,
    setUserCards,
    ...state,
  };
}
