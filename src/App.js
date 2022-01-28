import React, { Component, Suspense } from 'react';

import { Provider, connect } from 'react-redux';

import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect, withRouter, Link } from "react-router-dom";
import * as actions from './store/actions/auth';
import { lazy } from '@loadable/component';
// core components
// import Auth from './Auth/Auth';
import Logout from './Auth/Logout';
import Loader from './components/UI/Loader/Loader';
const Auth = lazy(() => import('./Auth/Auth'));
const ForgotPassword = lazy(() => import('./Auth/ForgotPassword'));
const SetPassword = lazy(() => import('./containers/SetPassword'));
const VendorSetPassword = lazy(() => import('./containers/VendorSetPassword'));
const VendorAccept = lazy(() => import('./containers/VendorAccept'));
const WelcomeSignup = lazy(() => import('./containers/Welcome_signup'));
const VendorReject = lazy(() => import('./containers/VendorReject'));

const CustomerDashboard = lazy(() => import('./layouts/Admin'));

const history = createBrowserHistory();

class App extends Component {
    constructor() {
        super();
        this.state = {}
    }
    componentDidMount() {
        const path = {
            path: this.props.location.pathname,
            search: this.props.location.search,
            hash: this.props.location.hash,
            state: this.props.location.state,
        }
        this.props.onTryAutoSignIn(path);
        history.push(path.path)
    }

    static getDerivedStateFromProps(props, state) {
        history.push(props.authRedirectPath.path)

        return props;
    }


    render() {
        let routes = (
            <Suspense fallback={<div id="loader_screen">
                <Loader bigLoader />
            </div>}>
                <Switch>
                    <Route path="/login" component={Auth} />
                    <Route path="/forgot_password" component={ForgotPassword} />
                    <Route path="/set-password/:token" component={SetPassword} />
                    <Route exact path="/">
                        <Redirect from="/" to="/login" />
                    </Route>
                    {/* {this.props.isAuthenticated === false &&
                        (this.props.location.pathname !== '/login' ||
                            this.props.location.pathname !== '/') ?
                        <Redirect to="/login" /> : null
                    } */}
                </Switch>
            </Suspense>
        )

        if (this.props.isAuthenticated) {
            routes = (
                <Suspense fallback={<div id="loader_screen">
                    <Loader bigLoader />
                </div>}>
                    <Switch>
                        <Route path="/login" component={Auth} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/coc" component={CustomerDashboard} />
                        <Route exact path="/">
                            <Redirect to="/coc" />
                        </Route>
                    </Switch>
                </Suspense>
            )
        } else {
            routes = routes;
        }
        return (
            <Router history={history}>
                {routes}
            </Router>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth_reducer.token !== null,
        authRedirectPath: state.auth_reducer.authRedirectPath,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignIn: (path) => dispatch(actions.checkAuthState(path)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));