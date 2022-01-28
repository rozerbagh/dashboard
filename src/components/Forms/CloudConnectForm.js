import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import CloseIcon from '@material-ui/icons/Close';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import * as formatter from "../Functions/Formatter"
import {
    FiMail,
    FiSquare,
    FiPhone,

} from "react-icons/fi";
const ValidatedText = styled.span`
    color: #1cc88a;
    font-size: 0.7rem;
    font-weight: 400;
`;

const ErrorText = styled.span`
    color: #e74a3b;
    font-size: 0.7rem;
    font-weight: 400;
`;

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        width: "70%",
    },
    submitButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginBottom: "10px",
        paddingBottom: "10px",
    },
    closeIcon: {
        position: "absolute",
        top: "0px",
        right: 0,
    },
    heading: {
        width: "100%",
        textAlign: "center",
        fontWeight: 600,
    }
}));
const host_name = 'hostname';
const ip_addr = 'ipaddress';
const net_mask = 'netmask';
const mac_addr = 'macaddress';
const v_lan = 'vlan';
const bandwidth_size = "bandwidth_size";
const circuit_id = 'circuit_id';
const location_a = 'location_a';
const location_b = 'location_b';
const pair = 'pair'
function ClouConnectForm(props) {

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [name, setName] = useState('')
    const [ip, setIP] = useState('');
    const [netmask, setNetmask] = useState('');
    const [mac, setMac] = useState('')
    const [vlan, setVlan] = useState('');
    const [bandwidth, setBandwidth] = useState('');
    const [locationA, setLoactionA] = useState('')
    const [locationB, setLocationB] = useState('');
    const [circuitID, setCircuitID] = useState('');
    const [pairing, setPairing] = useState('');

    const [nameValidated, setNameValidated] = useState(false);
    const [ipValidate, setIPValidate] = useState(false);
    const [netmaskValidate, setnetmaskValidate] = useState(false);
    const [macValidate, setMacValidate] = useState(false);

    const handleInputChange = (e, type) => {
        const inputval = e.target.value
        if (type === host_name) {

            setName(inputval);
            setNameValidated(formatter.validateName(inputval));

        } else if (type === ip_addr) {

            setIP(inputval)
            setIPValidate(formatter.ValidateIPaddress(inputval))

        } else if (type === net_mask) {

            setNetmask(inputval);

        } else if (type === mac_addr) {

            setMac(inputval)
            setMacValidate(formatter.ValidateMACaddress(inputval));

        } else if (type === v_lan) {

            setVlan(inputval)

        } else if (type === bandwidth_size) {

            setBandwidth(inputval)

        } else if (type === circuit_id) {

            setCircuitID(inputval)

        } else if (type === location_a) {

            setLoactionA(inputval)

        } else if (type === location_b) {

            setLocationB(inputval)

        } else if (type === pair) {

            setPairing(inputval)

        }

    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.submitHandler(name,
            ip,
            netmask,
            mac,
            vlan,
            bandwidth,
            circuitID,
            locationA,
            locationB,
            pairing);
    }

    useEffect(() => {
        console.log(props.editData)
        if (props.editing === true) {
            setName(props.editData.hostname);
            setIP(props.editData.ip_addr)
            setNetmask(props.editData.net_mask);
            setMac(props.editData.mac_addr)
            setVlan(props.editData.vlan)
            setBandwidth(props.editData.bandwidth_size)
            setCircuitID(props.editData.circuit_id)
            setLoactionA(props.editData.location_a)
            setLocationB(props.editData.location_b)
            setPairing('');


            setNameValidated(true)
            setIPValidate(true)
            setMacValidate(true)
        } else {
            // console.log(props.editData)
        }
    }, [props.editing, props.editData])

    return (
        <Dialog
            open={props.open}
            fullScreen={fullScreen}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title">
            <div className={classes.closeIcon}>
                <IconButton onClick={props.handleClose} color="inherit" size="small">
                    <CloseIcon />
                </IconButton>
            </div>
            <DialogTitle id="form-dialog-title" className={classes.heading}>{props.editing ? 'Edits Connects' : 'Inserts new Connects'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter your users details here.  * required  field in mandatory
                </DialogContentText>
                <form onSubmit={submitHandler}>
                    <div className={classes.inputBox}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FiSquare />
                                    </InputAdornment>
                                ),
                            }}
                            error={nameValidated === true ? false : name === '' ? false : true}
                            fullWidth
                            label="Hostname"
                            variant="outlined"
                            color="secondary"
                            value={name || ''}
                            onChange={(e) => handleInputChange(e, host_name)}
                            autoFocus
                            margin="normal"
                            required={true}
                        />
                        {name === '' ? null : nameValidated ?
                            <ValidatedText>Enter Name is correct</ValidatedText> :
                            <ErrorText>Name should be at least three characters</ErrorText>}
                    </div>

                    <div className={classes.inputBox}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FiSquare />
                                    </InputAdornment>
                                ),
                            }}
                            error={ipValidate === true ? false : ip === '' ? false : true}
                            fullWidth
                            label="IP Address XXX.XXX.XXX.XXX"
                            variant="outlined"
                            color="secondary"
                            value={ip || ''}
                            onChange={(e) => handleInputChange(e, ip_addr)}
                            margin="normal"
                            required={true}
                        />
                        {ip === '' ? null : ipValidate ?
                            <ValidatedText>IP is correct</ValidatedText> :
                            <ErrorText>IP Format xxx.xxx.xxx.xxx</ErrorText>}
                    </div>

                    <div className={classes.inputBox}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FiSquare />
                                    </InputAdornment>
                                ),
                            }}
                            // error={netmaskValidate === true ? false : name === '' ? false : true}
                            fullWidth
                            label="Net Mask XXX.XXX.XXX.XXX"
                            variant="outlined"
                            color="secondary"
                            value={netmask || ''}
                            onChange={(e) => handleInputChange(e, net_mask)}
                            margin="normal"
                            required={true}
                        />
                        {/* {name === '' ? null : netmaskValidate ?
                    <ValidatedText>Enter Name is correct</ValidatedText> :
                    <ErrorText>Name should be at least three characters</ErrorText>} */}
                    </div>

                    <div className={classes.inputBox}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FiSquare />
                                    </InputAdornment>
                                ),
                            }}
                            error={macValidate === true ? false : mac === '' ? false : true}
                            fullWidth
                            label="MAC Address XX:XX:XX:XX:XX:XX"
                            variant="outlined"
                            color="secondary"
                            value={mac || ''}
                            onChange={(e) => handleInputChange(e, mac_addr)}
                            margin="normal"
                            required={true}
                        />
                        {mac === '' ? null : macValidate ?
                            <ValidatedText>MAC Address is correct</ValidatedText> :
                            <ErrorText>MAC Address XX:XX:XX:XX:XX:XX</ErrorText>}
                    </div>

                    <div className={classes.inputBox}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FiSquare />
                                    </InputAdornment>
                                ),
                            }}
                            // error={nameValidated === true ? false : name === '' ? false : true}
                            fullWidth
                            label="VLAN ID"
                            variant="outlined"
                            color="secondary"
                            value={vlan || ''}
                            onChange={(e) => handleInputChange(e, v_lan)}
                            margin="normal"
                            required={true}
                            type="number"
                        />
                        {/* {name === '' ? null : nameValidated ?
                    <ValidatedText>Enter Name is correct</ValidatedText> :
                    <ErrorText>Name should be at least three characters</ErrorText>} */}
                    </div>

                    <div className={classes.inputBox}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FiSquare />
                                    </InputAdornment>
                                ),
                            }}
                            // error={nameValidated === true ? false : name === '' ? false : true}
                            fullWidth
                            label="Bandwidth Size"
                            variant="outlined"
                            color="secondary"
                            value={bandwidth || ''}
                            onChange={(e) => handleInputChange(e, bandwidth_size)}
                            margin="normal"
                            required={true}
                            type="number"
                        />
                        {/* {name === '' ? null : nameValidated ?
                    <ValidatedText>Enter Name is correct</ValidatedText> :
                    <ErrorText>Name should be at least three characters</ErrorText>} */}
                    </div>

                    <div className={classes.inputBox}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FiSquare />
                                    </InputAdornment>
                                ),
                            }}
                            // error={nameValidated === true ? false : name === '' ? false : true}
                            fullWidth
                            label="Circuit ID"
                            variant="outlined"
                            color="secondary"
                            value={circuitID || ''}
                            onChange={(e) => handleInputChange(e, circuit_id)}
                            margin="normal"
                            required={true}
                        />
                        {/* {name === '' ? null : nameValidated ?
                    <ValidatedText>Enter Name is correct</ValidatedText> :
                    <ErrorText>Name should be at least three characters</ErrorText>} */}
                    </div>

                    <div className={classes.inputBox}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FiSquare />
                                    </InputAdornment>
                                ),
                            }}
                            // error={nameValidated === true ? false : name === '' ? false : true}
                            fullWidth
                            label="Location A"
                            variant="outlined"
                            color="secondary"
                            value={locationA || ''}
                            onChange={(e) => handleInputChange(e, location_a)}
                            margin="normal"
                            required={true}
                        />
                        {/* {name === '' ? null : nameValidated ?
                    <ValidatedText>Enter Name is correct</ValidatedText> :
                    <ErrorText>Name should be at least three characters</ErrorText>} */}
                    </div>

                    <div className={classes.inputBox}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FiSquare />
                                    </InputAdornment>
                                ),
                            }}
                            // error={nameValidated === true ? false : name === '' ? false : true}
                            fullWidth
                            label="Location B"
                            variant="outlined"
                            color="secondary"
                            value={locationB || ''}
                            onChange={(e) => handleInputChange(e, location_b)}
                            margin="normal"
                            required={true}
                        />
                        {/* {name === '' ? null : nameValidated ?
                    <ValidatedText>Enter Name is correct</ValidatedText> :
                    <ErrorText>Name should be at least three characters</ErrorText>} */}
                    </div>

                    <div className={classes.inputBox}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FiSquare />
                                    </InputAdornment>
                                ),
                            }}
                            // error={nameValidated === true ? false : name === '' ? false : true}
                            fullWidth
                            label="Pair"
                            variant="outlined"
                            color="secondary"
                            value={pairing || ''}
                            onChange={(e) => handleInputChange(e, pair)}
                            margin="normal"
                            required={true}
                        />
                        {/* {name === '' ? null : nameValidated ?
                    <ValidatedText>Enter Name is correct</ValidatedText> :
                    <ErrorText>Name should be at least three characters</ErrorText>} */}
                    </div>
                </form>
            </DialogContent>
            <div className={classes.submitButton}>
                <Button
                    disabled={nameValidated === true &&
                        ipValidate === true &&
                        macValidate === true ?
                        false : true}
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={submitHandler}
                    endIcon={<ArrowRightAltIcon />}>
                    Submit
                </Button>
            </div>
        </Dialog >
    )
}

export default ClouConnectForm;
