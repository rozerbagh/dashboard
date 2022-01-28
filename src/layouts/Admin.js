import React, { useEffect, useMemo, Suspense } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, Redirect, useParams, Link } from 'react-router-dom';
import { lazy } from '@loadable/component';
import styles from '../assets/jss/jsStyles/layouts/adminStyle';

import routes from '../routes';
import LinearLoader from '../components/UI/Loader/LinearLoader';
const Sidebar = lazy(() => import('../components/Sidebar/Sidebar'));
const Navbar = lazy(() => import('../components/Navbars/Navbar'));
const Dashboard = lazy(() => import("../containers/customer/Dashboard/Dashboard"));
const Dashboard_tag = lazy(() => import("../containers/customer/Dashboard/Dashboard_tag"));
const Users = lazy(() => import("../containers/customer/Privilege/Users"));
const ZoomView = lazy(() => import("../containers/customer/Manage/Zoom View/zoom_view"));
const Invoices = lazy(() => import("../containers/customer/Billing/Invoices/Invoices"));
const Bandwidth = lazy(() => import("../containers/customer/Reports/Bandwidth/Bandwidth"));
const UserProfile = lazy(() => import("../containers/customer/UserProfile/UserProfile"));
const Tickets = lazy(() => import('../containers/customer/Tickets/Tickets'));
const Footer = lazy(() => import('../components/Footer/Footer'));

const useStyles = makeStyles(styles);

function AdminDashboard(props) {

  const { ...rest } = props;
  const classes = useStyles();

  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [sidebarSize, setSidebarSize] = React.useState(240);

  const [rolesRedirection, setRolesRedirection] = React.useState(null)

  useMemo(() => {
    const size = sidebarOpen === true ? 240 : 60;
    setSidebarSize(size)
  }, [sidebarOpen])

  const handleSidebarToggle = () => {
    setSidebarOpen(prevState => !prevState)
  }

  const handleSidebarOpen = () => {
    setSidebarOpen(true)
  }

  return (
    <div className={classes.wrapper}>
      <Suspense fallback={<div className="flex-width"><LinearLoader /></div>}>
        <Sidebar {...rest}
          routes={routes}
          sidebarOpen={sidebarOpen}
          handleSidebarToggler={handleSidebarToggle}
          handleSidebarOpen={handleSidebarOpen}
          id="coc-sidebar"
          vendor={false}
        />
      </Suspense>
      <div className={classes.mainPanel}>
        <Suspense fallback={<div className="flex-width"><LinearLoader /></div>}>
          <Navbar {...rest} sidebarOpen={sidebarOpen} vendor={false} />
        </Suspense>
        <div className={classes.container} id="coc-panel-tooltip-action">
          <div style={{ minHeight: "calc(100vh - 60px)" }}>
            <Suspense fallback={<div className="flex-width"><LinearLoader /></div>}>

              <Switch>
                <Route exact path="/coc/dashboard">
                  <Dashboard />
                </Route>

                <Route path="/coc/users" exact >
                  <Users {...props} />
                </Route>

                <Route exact path="/coc/graphs">
                  <ZoomView {...props} mainSidebar={sidebarSize} />
                </Route>
                <Route path="/coc/invoices">
                  <Invoices {...props} />
                </Route>

                <Route path="/coc/reports/bandwidth">
                  <Bandwidth {...props} />
                </Route>
                <Route path="/coc/profile" component={UserProfile} />
                <Route path="/coc/tickets" component={Tickets} />
                <Route path="/coc/dashboard/tag/:tag" component={Dashboard_tag} />
                <Redirect from="/coc" to="/coc/dashboard" />
              </Switch>
            </Suspense>
          </div>
          <Suspense fallback={<div className="flex-width"><LinearLoader /></div>}>
            <Footer />
          </Suspense>
        </div>
      </div>
      {rolesRedirection}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.auth_reducer.token,
    userFlag: state.auth_reducer.user_flag,
    roles: state.auth_reducer.user_roles,
    isAuthenticated: state.auth_reducer.token !== null,
  }
}
export default connect(mapStateToProps, null)(AdminDashboard);