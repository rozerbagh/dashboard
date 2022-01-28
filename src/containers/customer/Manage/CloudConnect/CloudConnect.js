import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Card from "../../../../components/Card/Card";
import CloudConnectsTable from './CloudConnectsTable';
import CloudConnectForm from '../../../../components/Forms/CloudConnectForm';
import WarnAlert from "../../../../components/Alerts/Warning/Warn";
import Breadcrumbs from "../../../../components/UI/Breadscrumbs/Breadscrumbs";
import * as action from '../../../../store/actions/customer/index';
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
        label: "Cloud Connect",
        link: null,
        subroutes: [],
    }
]
function CloudConnect(props) {

    const [demoAlert, setDemoAlert] = useState(null);
    const [ccData, setCCData] = useState([]);
    const [ccGraph, setCCGraph] = useState({});
    const [ccInternlhost, setCCInternalhost] = useState([]);
    const [ccIntExt, setCCIntExt] = useState([]);

    const [ccFormOpen, setCCformOpen] = useState(false);

    const [ccEditform, setCCEditForm] = useState({});
    const [editingForm, setEditingForm] = useState(false)
    useEffect(() => {
        props.onFetchingCloudConnect(props.token);
    }, [])

    useEffect(() => {
        // console.log(props.cc_list);
        const fetchedData = [];
        props.cc_list.map(ele => {
            let state = 'Passive'
            if (ele.state == 1) {
                state = 'Active';
            } else if (ele.state == 2) {
                state = 'Passive';
            }
            fetchedData.push({
                id: ele._id,
                hostname: ele.hostname,
                ip_addr: ele.ip,
                net_mask: ele.netmask,
                mac_addr: ele.mac,
                vlan: ele.vlan,
                bandwidth_size: ele.bandwidth,
                state: state,
                location_a: ele.location_a,
                location_b: ele.location_b,
                circuit_id: ele.circuit_id,
            })
        })
        setCCData(fetchedData);
        var to = Math.floor(new Date().getTime() / 1000);
        to = to * 1000;
        var from = to - (15 * 60 * 1000);
        if (props.cc_list.length > 0) {
            props.onFecthingCloudConnectChart(
                props.token,
                props.cc_list[0].mac,
                from,
                to
            )
            props.onFecthingCloudConnectInternalhost(
                props.token,
                props.cc_list[0].ip,
                from,
                to
            )
        };
    }, [props.cc_list, props.ccListLoader]);

    useEffect(() => {
        setCCGraph(props.cc_graphs);
    }, [props.cc_graphs, props.graphLoader]);

    useEffect(() => {
        const data = [];
        props.cc_internal_host.map(ele => {
            data.push({
                ip: ele.ip,
                total: ele.total,
                received: ele.recived,
                transmitted: ele.transmit,
            })
        })
        setCCInternalhost(data)
    }, [props.cc_internal_host])

    useEffect(() => {
        const data = [];
        props.cc_int_ext.map(ele => {
            data.push({
                source_ip: ele.source_ip,
                dest_ip_port: `${ele.destination_ip} / ${ele.destination_port}`,
                total: parseInt(ele.total_bandwidth) * 300,
                received: parseInt(ele.recived_bandwidth) * 300,
                transmitted: parseInt(ele.transmit_bandwidth) * 300,
            })
        })
        setCCIntExt(data)
    }, [props.cc_int_ext])

    const handleInternalToExternal = (ip) => {
        if (ip === '10.144.71.124') {
            props.onFecthingCloudConnectInt_Ext(props.token, 225)
        } else if (ip === '10.144.71.125') {
            props.onFecthingCloudConnectInt_Ext(props.token, 226)
        } else {
            props.onFecthingCloudConnectInt_Ext(props.token, 100)
            setDemoAlert(<WarnAlert message="Demo Account" />);
            setTimeout(() => setDemoAlert(null), 5000)
        }
    }

    const handleUpdatingTheUsagePanel = (from, to, mac, ip) => {
        setDemoAlert(<WarnAlert message="Demo Account" />);
        setTimeout(() => setDemoAlert(null), 5000)
        // props.onFecthingCloudConnectChart(
        //     props.token,
        //     mac,
        //     from,
        //     to
        // )
        // props.onFecthingCloudConnectInternalhost(
        //     props.token,
        //     ip,
        //     from,
        //     to
        // )
    }

    const handleCCformOpen = () => {

        setCCEditForm({})
        setEditingForm(false)
        setCCformOpen(true)
    }

    const handleCCformClose = () => {
        setCCformOpen(false)
        setEditingForm(false)
    }

    const handleAddingConnects = () => {
        setDemoAlert(<WarnAlert message="Demo Account" />);
        setTimeout(() => setDemoAlert(null), 5000)
        // if (editingForm === true) {
        //     props.onEditingCloudConnect()
        // } else {
        //     props.onAddingCloudConnect()
        // }
        setCCformOpen(false);
        // props.onFetchingCloudConnect(props.token);
    }

    const handleEditingCloudConnectform = (e, row) => {

        setCCEditForm(row)
        setEditingForm(true)
        setCCformOpen(true)
    }
    return (
        <>
            <Breadcrumbs links={subroutes} />
            <Card id="cc-chart">
                {props.ccListLoader ? <div></div> : <CloudConnectsTable
                    selectHostanme={props.cc_list}
                    openCCForm={handleCCformOpen}
                    ccdata={ccData}
                    ccgraph={ccGraph}
                    ccinternalhost={ccInternlhost}
                    ccintext={ccIntExt}
                    graphLoader={props.graphLoader}
                    intextloader={props.ccIntExtLoader}
                    graphTime={props.cc_graphs_time}
                    graphReceived={props.cc_graphs_recieved}
                    graphTransmitted={props.cc_graphs_transmitted}
                    sidebarSize={props.mainSidebar}
                    fetchInternalToExternal={handleInternalToExternal}
                    updateUsagePanel={handleUpdatingTheUsagePanel}
                    handleEditCloudConnects={handleEditingCloudConnectform}
                />}
            </Card>
            {ccFormOpen ? <CloudConnectForm
                editData={ccEditform}
                editing={editingForm}
                open={ccFormOpen}
                handleClose={handleCCformClose}
                submitHandler={handleAddingConnects}
            /> : null}

            {demoAlert}
        </>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth_reducer.token,
        graphLoader: state.customerCloudConnect.cc_graphs_loading,
        ccListLoader: state.customerCloudConnect.cc_lists_loading,
        ccIntExtLoader: state.customerCloudConnect.cc_int_ext_loading,

        cc_list: state.customerCloudConnect.cc_list,
        cc_graphs: state.customerCloudConnect.cc_graphs_data,
        cc_graphs_time: state.customerCloudConnect.cc_graph_time,
        cc_graphs_recieved: state.customerCloudConnect.cc_graph_recieved,
        cc_graphs_transmitted: state.customerCloudConnect.cc_graph_transmitted,
        cc_internal_host: state.customerCloudConnect.cc_internal_host_data,
        cc_int_ext: state.customerCloudConnect.cc_int_ext_data,

        cc_add_err_msg: state.customerCloudConnect.cc_add_error_msg,
        cc_add_suc_msg: state.customerCloudConnect.cc_add_suc_msg,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchingCloudConnect: (token) => dispatch(action.fetchCloudConnects(token)),
        onFecthingCloudConnectChart: (token, mac, from, to) => dispatch(action.fetchCloudConnectsChart(token, mac, from, to)),
        onFecthingCloudConnectInternalhost: (token, ip, from, to) => dispatch(action.fetchCloudConnectsInternalhost(token, ip, from, to)),
        onFecthingCloudConnectInt_Ext: (token, ip) => dispatch(action.fetchCloudConnectsInternalToExternal(token, ip)),
        onAddingCloudConnect: () => dispatch(action.addingCloudConnects()),
        onEditingCloudConnect: () => dispatch(action.editingCloudConnects()),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CloudConnect);
