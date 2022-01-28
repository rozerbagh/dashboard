import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
// @material-ui/core components
import makeStyles from "@material-ui/core/styles/makeStyles";
// core components
import Redirection from '../../../../components/Alerts/Alert/Modal';
import SuccessAlert from '../../../../components/Alerts/Success/success';
import ErrorAlert from '../../../../components/Alerts/Error/Error';
import Loader from "../../../../components/UI/Loader/Loader";
import GridItem from "../../../../components/Grid/GridItem";
import GridContainer from "../../../../components/Grid/GridContainer";
import Card from "../../../../components/Card/Card";
import InstanceTable from './InstanceTable';
import StatusFooter from './StatusView';
import * as action from '../../../../store/actions/customer/index';
import Breadcrumbs from "../../../../components/UI/Breadscrumbs/Breadscrumbs";
const subroutes = [
    {
        label: "Home",
        link: "/coc/dashboard",
        subroutes: [],
    },
    {
        label: "Manage",
        link: "/coc/manage/cloud_connect",
        subroutes: [
            { label: 'Instances', link: "/coc/manage/instance" },
            { label: 'Cloud Connect', link: "/coc/manage/cloud_connect" },
            { label: 'Zoom View', link: "/coc/manage/zoom_view" },
            { label: 'Setting', link: "/coc/manage/setting" },
        ]
    },
    {
        label: "Instances",
        link: null,
        subroutes: [],
    }
]
const useStyles = makeStyles(theme => ({
    loaderContainer: {
        position: "relative",
        margin: "0 auto",
        width: "500px",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}))

const Instnaces = (props) => {

    const classes = useStyles();

    const [instanceList, setInstanceList] = useState([]);
    const [vmStatus, setVmStatus] = useState([]);
    const [lanIps, setLanIps] = useState([])

    useEffect(() => {
        props.onFetchingInstancesList(props.token);
    }, []);

    useEffect(() => {
        const intstanceData = [];
        const serviceDetails = [];
        const ipArr = [];
        // console.log(props.instanceLists)
        props.instanceLists.map((instance, index) => {

            let ok = 0;
            let warn = 0;
            let crit = 0;
            instance.services.map(service => {
                if (service.title.indexOf('check_mk') < 0) {

                    if (service.state == 'OK') {
                        ok += 1;
                    } else if (service.state == 'WARN') {
                        warn += 1;
                    } else if (service.state == 'CRIT') {
                        crit += 1;
                    }
                }
            })

            serviceDetails.push(instance.services)

            intstanceData.push({
                id: Math.random().toString(),
                power_status: instance.power_status,
                vm_os: instance.vm_os,
                hostname: instance.vm_hostname,
                server_hostanme: instance.vm_hostname,
                private_ip: instance.lan_ip,
                public_ip: instance.wan_ip,
                ok: ok,
                warn: warn,
                crit: crit,
                serviceArr: instance.services,
                vmid: instance.instance_id,
            })
            ipArr.push(instance.lan_ip)
        });
        setInstanceList(intstanceData);
        setVmStatus(serviceDetails);
        setLanIps(ipArr)
    }, [props.instanceLists]);



    return (
        <>
            <Breadcrumbs links={subroutes} />
            {props.instanceError === 'logout' ? <Redirection
                linkRoute="/logout"
                bodyText="Other session is active and you are logged out. Please login again."
                btnText="Ok" /> :
                props.instanceError === 'Your roles have been updated. Login again.' ?
                    <Redirection
                        linkRoute="/logout"
                        bodyText="Your roles have been updated. Login again."
                        btnText="Ok" /> : (props.instanceError !== 'Your roles have been updated. Login again.' ||
                            props.instanceError !== 'logout') && props.instanceError !== null ?
                        <ErrorAlert message={props.instanceError} /> :
                        <>
                            {props.loader ?
                                <div className={classes.loaderContainer}>
                                    <Loader bigLoader style={{ margin: "0 auto" }} />
                                </div> :
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Card>
                                            <InstanceTable
                                                rows={instanceList}
                                                services={vmStatus} />
                                        </Card>
                                    </GridItem>
                                </GridContainer>
                            }

                            {props.loader ? null : <StatusFooter ipArr={lanIps} />}
                            {props.sheduledMsg !== null ? <SuccessAlert message={props.sheduledMsg} /> : null}
                            {props.errorSheduledMsg !== null ? <ErrorAlert message={props.errorSheduledMsg} /> : null}
                            {props.rebootMsg !== null ? <SuccessAlert message={props.rebootMsg} /> : null}
                            {props.errorRebootMsg !== null ? <ErrorAlert message={props.errorRebootMsg} /> : null}
                        </>
            }
        </>
    )
}


const mapStateToProps = state => {
    return {
        token: state.auth_reducer.token,
        roles: state.auth_reducer.user_roles,
        instanceLists: state.customerInstances.instances_list,
        loader: state.customerInstances.loading,
        notifyLoader: state.customerInstances.notifyLoading,
        instanceError: state.customerInstances.instance_error,

        sheduledMsg: state.rebootTheMachineTask.sheduledtaskMsg,
        rebootMsg: state.rebootTheMachineTask.rebootSuccessMsg,
        errorSheduledMsg: state.rebootTheMachineTask.error_sheduledtaskMsg,
        errorRebootMsg: state.rebootTheMachineTask.error_rebootSuccessMsg,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchingInstancesList: (token) => dispatch(action.fetchInstances(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Instnaces);
