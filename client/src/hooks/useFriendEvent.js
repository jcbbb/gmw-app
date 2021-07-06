import React from "react";
import { FriendEventContext } from "../context/FriendEventContext";

export function useFriendEvent() {
  const context = React.useContext(FriendEventContext);

  if (!context) {
    throw new Error("useFriendEvent must be within FriendEventProvider");
  }

  const [state, setState] = context;

  const friendsEvents = state.friendsEvents;

  const setFriendsEvents = React.useCallback(
    (friendsEvents) => setState({ friendsEvents }),
    [setState]
  );

  return { friendsEvents, setFriendsEvents };
}
