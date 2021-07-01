import React from "react";
import { useRoutes } from "../hooks/useRoutes";
import { Switch, Route } from "react-router-dom";
import NotFound from "../components/404/404";

function Routes() {
  const routes = useRoutes();
  return (
    <Switch>
      {routes.map((route, i) => (
        <Route key={i} component={route.component} path={route.path} exact={route.exact} />
      ))}
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
