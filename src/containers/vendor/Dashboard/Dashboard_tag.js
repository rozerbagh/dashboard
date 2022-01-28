import React, { useState, useEffect, useMemo } from "react";
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// @material-ui/core
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid"
// core components
import Card from "../../../components/Card/Card";
import Loader from '../../../components/UI/Loader/Loader';
import DashboardTable from './Instances/DashboardInstances';
import * as action from '../../../store/actions/vendor/index';
import styles from "../../../assets/jss/jsStyles/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const cardStyles = makeStyles(theme => ({
    cardBox: {
        padding: theme.spacing(1),
        border: "0",
        margin: "1em",
        borderRadius: "0.8em",
        background: "#fff",
        width: "100%",
        boxShadow: "0 0 0.5em #d6f0fd",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        wordWrap: "break-word",
        fontSize: "0.75rem"
    },
    cardRow: {
        position: "relative",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "20% 25% 25% 25%",
        gridTemplateRows: "auto",
        gap: "10px",
        marginTop: "10px"
    },
    cardHeader: {
        textTransform: "uppercase",
        fontSize: "1.1em",
        margin: " 0px"
    },
    link: {
        margin: "0px",
        padding: "0px",
    },
}))

const createDashboardLists = (power_status, vm_os, hostname, server_hostanme, public_ip, vendor_name, tagsArr, bandwidth, backup, m_type, vendor_flag, inst_details, cpu, ram, disk, private_ip, vmid) => {
    return {
        power_status,
        vm_os,
        hostname, server_hostanme,
        public_ip,
        vendor_name,
        tagsArr,
        bandwidth,
        backup, m_type,
        vendor_flag,
        inst_details,
        cpu, ram, disk,
        private_ip,
        vmid
    }
}

const DashboardTag = (props) => {
    const classes = useStyles();
    const cardClasses = cardStyles();

    const [vmData, setVmData] = useState([]);

    const { tag } = useParams();

    useEffect(() => {
        const id = JSON.parse(localStorage.getItem('vuid'));
    }, [tag]);


    useMemo(() => {
        const vm_data = [];
        props.tag_vm_data.filter(ele => {
            return ele.tags.find(item => tag === item)
        }).map((vm, index) => {
            vm_data.push(createDashboardLists(
                vm.power_status,
                vm.vm_os,
                vm.vm_hostname,
                vm.vm_server_hostname,
                vm.wan_ip,
                vm.vendor_name,
                vm.tags,
                vm.bandwidth,
                vm.vm_backup,
                vm.m_type,
                vm.vendor_flag,
                vm.network,
                vm.cpu,
                vm.ram,
                vm.disk,
                vm.lan_ip,
                vm.host_id
            ))
        })
        setVmData(vm_data);
    }, [props.tag_vm_data]);

    const handleModifyVMTags = (arr, index) => {
        const data = [...vmData];
        vmData.map((ele, i) => {
            if (i === index) {
                data[index].tagsArr = arr
            }
        })
        setVmData(data)
    }


    const handleVendorFlag = index => {
        const data = [...vmData];
        vmData.map((ele, i) => {
            if (i === index) {
                data[index].vendor_flag = 0;
            }
        })
        setVmData(data)
    }
    return (
        <div>
            <Grid container>
                <Card>
                    <DashboardTable vms={vmData}
                        modify_vm_data={handleModifyVMTags}
                    />
                </Card>
            </Grid>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        vmTagLoader: state.vendorDashboard.tagsPageLoading,
        tag_vm_data: state.vendorDashboard.vm_data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardTag);