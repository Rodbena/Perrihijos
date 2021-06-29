import React from 'react';
import { Redirect, Route } from 'react-router';

const RutaPrivada = ({component: Component, ...rest}) =>{//Solo ciertos usuarios pueden acceder a esta ruta
    return <Route {...rest} component ={(props) =>{
        const token = window.localStorage.getItem('token');
        if(token){
            return <Component {...props} />
        }else{
            return <Redirect to={'/login'} />
        }
    }} />
}

export default RutaPrivada;