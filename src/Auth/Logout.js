import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const Logout = (props) => {
    const [path, setPath] = useState(null)
    useEffect(() => {
        props.onLogout()
    }, [])

    useEffect(() => {
        props.path === '/login' ? setPath(<Redirect to="/login" />) : setPath(null)
    }, [props.path])
    return <Redirect to="/login" />
}
const mapStateToProps = state => {
    return {
        path: state.auth_reducer.authRedirectPath,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)