import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Entrada from "../pages/Entrada";
import DashBoard from "../pages/dashboard";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={DashBoard} />
        <Route exact path="/entrada" component={Entrada} />
      </Switch>
    </BrowserRouter>
  );
}
