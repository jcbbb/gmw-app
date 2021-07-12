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

  const deleteUserFriend = React.useCallback(
    (id) => {
      setState((prev) => ({
        ...prev,
        friends: prev.friends.filter((friend) => friend.id !== id),
      }));
    },
    [setState]
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

  const deleteSuggested = React.useCallback(
    (id) => {
      setState((prev) => ({
        ...prev,
        suggestedFriends: prev.suggestedFriends.filter(
          (suggestedFriend) => suggestedFriend.id !== id
        ),
      }));
    },
    [setState]
  );

  const updateUser = React.useCallback(
    (user) => {
      setState((prev) => ({
        ...prev,
        user,
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
    deleteSuggested,
    updateUser,
    deleteUserFriend,
    ...state,
  };
}
