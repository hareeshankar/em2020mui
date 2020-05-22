import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute(props) {
  const { component: Component, ...rest } = props;
  return props.token ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to="/SignIn" />
  );
}

export default ProtectedRoute;
