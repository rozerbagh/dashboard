import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import styled from 'styled-components'
// @material-ui/core components
import makeStyles from "@material-ui/core/styles/makeStyles";
// core components
import Redirection from '../../../../components/Alerts/Alert/Modal';
import SuccessAlert from '../../../../components/Alerts/Success/success';
import ErrorAlert from '../../../../components/Alerts/Error/Error';
import Loader from "../../../../components/UI/Loader/Loader";
import GridItem from "../../../../components/Grid/GridItem.js";
import GridContainer from "../../../../components/Grid/GridContainer.js";
import Card from "../../../../components/Card/Card.js";
import InstanceTable from './InstanceTable';
import StatusFooter from './StatusView';

import * as action from '../../../../store/actions/vendor/index';

function createData(serviceArr, power_status, vm_os, hostname, server_hostanme, private_ip, public_ip, ok, warn, crit, id, cpu, ram, disk) {
    return { serviceArr, power_status, vm_os, hostname, server_hostanme, private_ip, public_ip, ok, warn, crit, id, cpu, ram, disk };
}

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
`;

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

function Instnaces(props) {

    const classes = useStyles();

    const [instanceList, setInstanceList] = useState([]);
    const [vmStatus, setVmStatus] = useState([]);
    const [lanIps, setLanIps] = useState([])

    useEffect(() => {
        const vuid = JSON.parse(localStorage.getItem('vuid'));
        const vname = JSON.parse(localStorage.getItem('vname'));
        const vemail = JSON.parse(localStorage.getItem('vemail'));
        props.onSettingCustomers(vemail.email, vuid.vid, vname.name, true);
        props.onFetchingInstancesList(props.token, vuid.vid);

    }, []);



    useEffect(() => {
        const intstanceData = [];
        const serviceDetails = [];
        const ipArr = [];
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

    const [logoutRedirection, setLogoutRedirection] = useState(null)

    return (<>
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
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            {props.loader ?
                                <div className={classes.loaderContainer}>
                                    <Loader bigLoader style={{ margin: "0 auto" }} />
                                </div> :
                                <Card>
                                    <InstanceTable
                                        paper={Card}
                                        rows={instanceList}
                                        services={vmStatus} />
                                </Card>}
                        </GridItem>
                        {props.loader ? null : <StatusFooter ipArr={lanIps} />}
                    </GridContainer>
        }
        {logoutRedirection}
    </>)
}


const mapStateToProps = state => {
    return {
        token: state.auth_reducer.token,
        vid: state.auth_reducer.uid,
        instanceLists: state.vendorInstances.instances_list,
        loader: state.vendorInstances.loading,
        notifyLoader: state.vendorInstances.notifyLoading,
        instanceError: state.vendorInstances.instance_error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchingInstancesList: (token, id) => dispatch(action.fetchInstances(token, id)),
        onFetchingNotifications: (token, id, skip, limit, ip) => dispatch(action.fetchInstanceNotifications(token, id, skip, limit, ip)),

        onSettingCustomers: (email, id, name, bool) => dispatch(action.set_customers(email, id, name, bool)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Instnaces);
