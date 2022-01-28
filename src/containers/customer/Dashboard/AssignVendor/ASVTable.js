import React, { useState, useEffect, useMemo } from "react";
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

// @material-ui/core
import { makeStyles, withStyles, fade } from "@material-ui/core/styles";
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Checkbox from '@material-ui/core/Checkbox'

import CentOS from '../../../../assets/img/centos.png';
import { FaUbuntu, FaWindows, FaCentos } from "react-icons/fa";
import { DiRedhat } from "react-icons/di";
import * as formatter from '../../../../components/Functions/Formatter'

import styles from "../../../../assets/jss/jsStyles/views/dashboardStyle.js";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#F8F9FB",
        color: theme.palette.common.black,
        border: "none",
        fontSize: 12,
        padding: "5px",
        alignItems: "center",
        '&:nth-last-of-type(1)': {
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "5px",
            borderTopLeftRadius: "0",
            borderTopRightRadius: "5px",
        },
        '&:nth-of-type(1)': {
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "0px",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "0px",
        }
    },
    body: {
        padding: "5px",
        fontSize: 12,
        border: "none",
        alignItems: "center",
        '&:nth-last-of-type(1)': {
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "10px",
            borderTopLeftRadius: "0",
            borderTopRightRadius: "10px",
        },
        '&:nth-of-type(1)': {
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "0px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "0px",
        }
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        height: 20,
        fontSize: 14,
        border: "none",
        '&:nth-of-type(even)': {
            backgroundColor: fade(theme.palette.primary.light, 0.15),
            border: "none",
            borderRadius: theme.spacing(1)
        },
    },
}))(TableRow);

const useStyles = makeStyles(styles);

const createASVLists = (vm_os, vm_hostname, wan_ip, lan_ip) => {
    return {
        vm_os,
        vm_hostname,
        wan_ip,
        lan_ip,
    }
}

const ASVTable = (props) => {
    const { asvdata, modal, ...rest } = props;
    const classes = useStyles();

    const [vmData, setVmData] = useState([]);
    const [ipArr, setIpArr] = useState([]);
    const [selected, setSelected] = React.useState([]);
    const [tickedData, setTickedData] = React.useState([]);

    useMemo(() => {
        const vm_data = [];
        const ipArrs = [];
        asvdata.map((vm, index) => {
            vm_data.push(createASVLists(
                vm.vm_os,
                vm.vm_hostname,
                vm.wan_ip,
                vm.lan_ip,
            ))

            ipArrs.push(vm.lan_ip)
        })
        setVmData(vm_data);
        setIpArr(ipArrs);
        if (modal == false) {
            let newSelected = [];
            asvdata.map((vm, index) => {
                newSelected.push(vm.lan_ip);
            });
            setSelected(newSelected);
        } else {

        }

    }, [asvdata]);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = asvdata.map((vm) => vm.lan_ip);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const UpdatedData = []
    const handleClick = (event, name, dataTobeUpadated) => {
        const selectedIndex = selected.indexOf(name);
        const selectedRow = tickedData.indexOf(dataTobeUpadated)
        let newSelected = [];
        let newRowEntry = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {

            newSelected = newSelected.concat(selected.slice(1));

        } else if (selectedIndex === selected.length - 1) {

            newSelected = newSelected.concat(selected.slice(0, -1));

        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );

        }
        setSelected(newSelected);

        if (selectedRow === -1) {
            newRowEntry = newRowEntry.concat(tickedData, dataTobeUpadated);
        } else if (selectedRow === 0) {

            newRowEntry = newRowEntry.concat(tickedData.slice(1));

        } else if (selectedRow === tickedData.length - 1) {

            newRowEntry = newRowEntry.concat(tickedData.slice(0, -1));

        } else if (selectedRow > 0) {
            newRowEntry = newRowEntry.concat(
                tickedData.slice(0, selectedRow),
                tickedData.slice(selectedRow + 1),
            );

        }
        setTickedData(newRowEntry)

        props.handleSelectedAsvData(newSelected, newRowEntry)

    };

    const isSelected = (instance_name) => selected.indexOf(instance_name) !== -1;

    return (
        <TableContainer>
            <span style={{ fontSize: "17px", fontWeight: 400 }}>Assined Instances for Vendor</span>
            <Table aria-label="instances-table" aria-label="a dense table" size="small">
                <TableHead>
                    <StyledTableRow key="heading">
                        <StyledTableCell align="center"
                            onClick={handleSelectAllClick}
                        >Checkbox</StyledTableCell>
                        <StyledTableCell align="center">OS</StyledTableCell>
                        <StyledTableCell>Hostname</StyledTableCell>
                        <StyledTableCell align="left">Private IP</StyledTableCell>
                        <StyledTableCell align="left">Public IP</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {vmData.map((row, index) => {
                        const isItemSelected = isSelected(row.lan_ip);
                        return (
                            <StyledTableRow key={`assign-vendor-row-no-${index}`}>
                                <StyledTableCell align="center">
                                    <Checkbox
                                        onChange={(event) => handleClick(event, row.lan_ip, row)}
                                        checked={isItemSelected}
                                        value={row.lan_ip}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {
                                        row.vm_os.toLowerCase().includes(('WINDOWS').toLowerCase()) ?
                                            <Icon color="primary" style={{ fontSize: "1rem" }}>
                                                <FaWindows />
                                            </Icon> : row.vm_os.toLowerCase().includes(('CENTOS').toLowerCase()) ?
                                                <Icon>
                                                    <img src={CentOS} alt="cent_os" style={{ width: "0.9em" }} />
                                                </Icon> : row.vm_os.toLowerCase().includes(('RHEL').toLowerCase()) ?
                                                    <Icon color="error">
                                                        <DiRedhat style={{ fontSize: "1rem" }} />
                                                    </Icon> :
                                                    <Icon color="error" style={{ fontSize: "1rem" }}><FaUbuntu /></Icon>
                                    }
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography variant="body2">
                                        {formatter.limitName(row.vm_hostname)}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell align="left" >
                                    <Typography variant="body2">{row.lan_ip}</Typography>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <Typography variant="body2">{row.wan_ip}</Typography>
                                </StyledTableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ASVTable;

// ASV - assigned vendor data