import React, { useEffect, Suspense } from 'react';
import { lazy } from '@loadable/component';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, Redirect, useParams } from 'react-router-dom';
import styled from 'styled-components'

import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbars/Navbar';

import styles from '../assets/jss/jsStyles/layouts/adminStyle';

import routes from '../vendor-routes';
import LinearLoader from '../components/UI/Loader/LinearLoader';
import Logout from '../Auth/Logout';

const VendorDashboard = lazy(() => import("../containers/vendor/VendorDashboard/VendorDashboard"));
const Dashboard = lazy(() => import("../containers/vendor/Dashboard/Dashboard"));
const Dashboard_tag = lazy(() => import("../containers/vendor/Dashboard/Dashboard_tag"));
const Vendors = lazy(() => import("../containers/vendor/Privilege/Vendors"));
const VendorProfile = lazy(() => import("../containers/vendor/VendorProfile/VendorProfile"));
const Instance = lazy(() => import("../containers/vendor/Manage/Instance/Instances"));
const Settings = lazy(() => import("../containers/vendor/Manage/Settings/settings"));
const ZoomView = lazy(() => import("../containers/vendor/Manage/Zoom View/zoom_view"));

const SuccessBtn = styled.button`
    outline: none;
    border: none;
    background-color: #31E8A9;
    padding: 0.3rem 0.9rem;;
    font-size: 1rem;
    color:#ffffff;
    margin: 0.1rem 0.5rem;
    border-radius: 5px;
    cursor: pointer;
`;
const ConfirmButtons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
`;

const ConfirmAlertText = styled.p`
    font-size: 1rem;
    text-align: center;
`

const useStyles = makeStyles(styles);

function VendorAdminDashboard(props) {

    const { ...rest } = props
    const classes = useStyles();

    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const [sidebarSize, setSidebarSize] = React.useState(240);

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen)
    }

    useEffect(() => {
        const size = sidebarOpen === true ? 240 : 60;
        setSidebarSize(size)
        sessionStorage.setItem('for_vendor_sidebar_size', size)
    }, [sidebarOpen])

    const handleSidebarOpen = () => {
        setSidebarOpen(true)
    }

    return (
        <div className={classes.wrapper}>
            <Suspense fallback={<div className="flex-width"><LinearLoader /></div>}>

                <Sidebar routes={routes(props.inside_customer)}
                    rerendered={props.inside_customer}
                    sidebarOpen={sidebarOpen}
                    handleSidebarToggler={handleSidebarToggle}
                    handleSidebarOpen={handleSidebarOpen}
                    vendor={true}
                />
            </Suspense>
            <div className={classes.mainPanel}>
                <Suspense fallback={<div className="flex-width"><LinearLoader /></div>}>
                    <Navbar {...rest} sidebarOpen={sidebarOpen} vendor={true} />
                </Suspense>
                <div className={classes.container} id="coc-panel-tooltip-action">
                    <Suspense fallback={<div className="flex-width"><LinearLoader /></div>}>
                        <Switch>
                            <Route path="/vendor/maindashboard" component={VendorDashboard} />
                            <Route exact path="/vendor/dashboard" component={Dashboard} />
                            <Route path="/vendor/dashboard/tag/:tag" component={Dashboard_tag} />
                            <Route path="/vendor/privilege/vendors" component={Vendors} />
                            <Route path="/vendor/vprofile" component={VendorProfile} />
                            <Route path="/vendor/manage/instance" component={Instance} />
                            <Route path="/vendor/manage/zoom_view" component={ZoomView} sidebarSize={sidebarSize} />
                            <Route path="/vendor/manage/setting" component={Settings} />
                            <Route path="/logout" render={() => (
                                <Logout />
                            )}
                            />
                            <Redirect from="/vendor" to="/vendor/maindashboard" />
                        </Switch>
                    </Suspense>
                </div>
            </div>

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        inside_customer: state.vendorCommon.insideCustomer,
    }
}

export default connect(mapStateToProps, null)(VendorAdminDashboard);