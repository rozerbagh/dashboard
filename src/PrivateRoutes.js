import React from 'react';

import { Redirect, Route, withRouter } from 'react-router-dom'
import { auth } from 'store/reducers/customer';

const PrivateRoutes = (props,{component, ...rest}) => {
    return (
        <Route {...rest} render={()=>{
            return props.isAuthenticated == true ? component : <Redirect to="/login"/>
        }}/>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth_reducer.isAuthenticated,
    }
}

export default withRouter(connect(mapStateToProps, null)(PrivateRoutes));