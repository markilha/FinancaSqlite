

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}){
  const { signed, loading } = React.useContext(AuthContext);

  if(loading){
    return(
      <div> Carregando.... </div>
    )
  }

  if(!signed && isPrivate){
    return <Redirect to="/" />
  }

  if(signed && !isPrivate){
    return <Redirect to="/dashboard" />
  }


  return(
    <Route
      {...rest}
      render={ props => (
        <Component {...props} />
      )}
    />
  )
}