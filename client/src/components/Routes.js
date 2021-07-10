import React from "react";
import { useRoutes } from "../hooks/useRoutes";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import NotFound from "../components/404/404";

function Routes() {
  const { pathname } = useLocation();
  const routes = useRoutes();
  return (
    <Switch>
      <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
      {routes.map((route, i) => (
        <Route key={i} component={route.component} path={route.path} exact={route.exact} />
      ))}
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
