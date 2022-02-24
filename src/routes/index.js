import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Entrada from '../pages/Entrada';

export default function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Entrada} /> 
        </Switch>
        </BrowserRouter>
    )
}