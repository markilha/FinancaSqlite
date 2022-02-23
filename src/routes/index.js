import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from '../pages/dashboard';
import Entrada from '../pages/Entrada';

export default function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Dashboard} />            
            <Route exact path="/entradas" component={Entrada} />
        </Switch>
        </BrowserRouter>
    )
}