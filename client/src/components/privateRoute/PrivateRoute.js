import React from 'react';
import {Route, Redirect} from 'react-router-dom'

function PrivateRoute({component: Component, ...rest}){
    return <Route {...rest} render={(props) => {
        if(localStorage.getItem('authToken')) {
            return <Component {...props} />
        }else{
            return <Redirect to={{
                pathname: '/users/login'
            }} />
        }
    }} />
}

export default PrivateRoute