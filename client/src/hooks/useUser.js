import React from "react";
import { UserContext } from "../context/UserContext";

export function useUser() {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be within UserProvider");
  }

  const [state, setState] = context;

  const user = state.user;
  const isAuthenticated = !!user;

  const login = (user) => setState(user);

  const logout = () => setState({});

  return { isAuthenticated, login, logout, user };
}
