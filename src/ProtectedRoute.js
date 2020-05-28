import React from "react";
import { Route, Redirect } from "react-router-dom";
import Fragment from "react";
import Home from "./Home.js";

function ProtectedRoute({token, events}) {

  return token ? (
      <Redirect to="/Home" />
  ) : (
    <Redirect to="/SignIn" />
  );
}

export default ProtectedRoute;
