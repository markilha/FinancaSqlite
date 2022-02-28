import React from "react";
import {Switch } from "react-router-dom";
import Entrada from "../pages/Entrada";
import Dashboard from "../pages/dashboard";
import Signin from "../pages/signin";
import Route from "./Router";

export default function Routes() {
  return (
  
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route exact path="/dashboard" component={Dashboard} isPrivate />
        <Route exact path="/entrada" component={Entrada} isPrivate />
      </Switch>
    
  );
}
