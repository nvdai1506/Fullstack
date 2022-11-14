import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute(props) {
  if (!props.isAuthentication) {
    return <Redirect to={props.redirect} />;
  }
  return <Route {...props} />;
}

export default ProtectedRoute;
