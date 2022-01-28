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
import * as action from '../../../store/actions/customer/index'
import styles from "../../../assets/jss/jsStyles/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

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

    const [vmData, setVmData] = useState([]);

    const { tag } = useParams();

    const vm_data = [];

    useMemo(() => {
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

    const handleInstanceNameChange = (name, index) => {
        const data = [...vmData];
        vmData.map((ele, i) => {
            if (i === index) {
                data[index].hostname = name;
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
        <Grid container>
            <Card>
                <DashboardTable vms={vmData}
                    modify_vm_data={handleModifyVMTags}
                    modifyInstnaceName={handleInstanceNameChange}
                    modifyVendorFlag={handleVendorFlag} />
            </Card>
        </Grid>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        vmTagLoader: state.customerDashboard.tagsPageLoading,
        tag_vm_data: state.customerDashboard.vm_data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchingTagVMData: (token, tag) => dispatch(),
    }
}
export default connect(mapStateToProps, null)(DashboardTag);