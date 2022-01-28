import React, { memo, useState, useRef, useEffect } from 'react';

import { connect } from 'react-redux';

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import CloseIcon from '@material-ui/icons/Close';
import {
    FiMail,
    FiUser,
    FiPhone,
} from "react-icons/fi";

import Loader from "../UI/Loader/Loader";
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';
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
        margin: theme.spacing(0),
        padding: theme.spacing(1),
        [theme.breakpoints.up("md")]: {
            width: "400px"
        }
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
    inputBox: {
        padding: "5px 0px",
        margin: "5px 0px",
    },
    heading: {
        width: "100%",
        textAlign: "center",
        fontWeight: 600,
    }
}));

const EditForm = memo((props) => {

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [name, setName] = useState('')
    const [phone, setPhone] = useState(0)
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(0);

    const [nameValidated, setNameValidated] = useState(false);
    const [emailValidate, setEmailValidate] = useState(false);
    const [phoneValidate, setPhoneValidate] = useState(false);

    const [buttonState, setButtonState] = useState('Update');

    const handleNameChange = (e) => {
        setName(e.target.value);
        setNameValidated(false)
        if (e.target.value.length >= 3) {
            setNameValidated(true)
        } else {
            setNameValidated(false)
        }
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setEmailValidate(false)
        if (emailRegex.test(e.target.value)) {
            setEmailValidate(true)
        } else {
            setEmailValidate(false)
        }

    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
        setPhoneValidate(false)
        if (e.target.value.length == 10) {
            setPhoneValidate(true)
        } else {
            setPhoneValidate(false)
        }

    }

    useEffect(() => {
        const data = props.editData;
        props.vendor === true ? setName(data.vendor_name) : setName(data.user_name)
        props.vendor === true ? setPhone(data.vendor_phone) : setPhone(data.user_phone)
        props.vendor === true ? setEmail(data.vendor_email) : setEmail(data.user_email)
        props.vendor === true ?
            data.status === undefined || data.status === null ?
                setStatus(0) : setStatus(data.status) : setStatus(data.status);
        setNameValidated(true);
        setEmailValidate(true);
        setPhoneValidate(true);

    }, [props.editData]);

    let form = (<div>
        <div className={classes.inputBox}>
            <TextField
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FiUser />
                        </InputAdornment>
                    ),
                }}
                error={nameValidated === true ? false : name === '' ? false : true}
                fullWidth
                label="Name"
                variant="outlined"
                value={name || ''}
                onChange={handleNameChange}
            />
            {name === '' ? null : nameValidated ?
                <ValidatedText>Enter Name is correct !</ValidatedText> :
                <ErrorText>Name should be at least three characters</ErrorText>}
        </div>

        <div className={classes.inputBox}>
            <TextField
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FiMail />
                        </InputAdornment>
                    ),
                }}
                error={emailValidate === true ? false : email === '' ? false : true}
                fullWidth
                label="Email"
                variant="outlined"
                value={email || ''}
                onChange={handleEmailChange}
            />
            {email === '' ? null : emailValidate ?
                <ValidatedText>Email Format is correct !</ValidatedText> :
                <ErrorText>Email format is wrong eg: abc@example.com</ErrorText>}
        </div>

        <div className={classes.inputBox}>
            <TextField
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FiPhone />
                        </InputAdornment>
                    ),
                }}
                error={phoneValidate === true ? false : phone === '' ? false : true}
                fullWidth
                label="Phone"
                variant="outlined"
                value={phone || 0}
                onChange={handlePhoneChange}
                type="number"
            />
            {phone === '' ? null : phoneValidate ?
                <ValidatedText>Phone Format is correct !</ValidatedText> :
                <ErrorText>Phone format is wrong, only 10 digits are allowed</ErrorText>}
        </div>

    </div>)

    const handleSelectChange = (event) => {
        setStatus(event.target.value);
    };

    useEffect(() => {
        props.sucmsg !== null ? setButtonState(<Loader whiteSmallLoader />) : setButtonState('Update')
    }, [props.sucmsg])

    const handleSubmit = (event) => {
        event.preventDefault();
        const sub_name = name;
        const sub_email = email;
        const sub_phone = phone;
        props.submitHandler(sub_name, sub_email, sub_phone, status)
    }

    return (
        <Dialog
            open={props.open}
            fullScreen={fullScreen}
            onClose={props.handleEditClose}
            aria-labelledby="form-dialog-title">

            {props.loader ?
                <Loader bigLoader style={{ margin: "150px" }} /> :
                <div>
                    <div className={classes.closeIcon}>
                        <IconButton onClick={props.handleEditClose} color="inherit" size="small">
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <DialogTitle className={classes.heading}>
                        Edit User Details
                    </DialogTitle>
                    <DialogContent>
                        <div className={classes.pageContent}>
                            <form onSubmit={handleSubmit}>
                                {form}
                                {props.vendor === true ? null : <FormControl variant="outlined" fullWidth>
                                    {props.status == 1 ? (
                                        <Select
                                            fullWidth
                                            native
                                            value={status || props.status}
                                            onChange={handleSelectChange}
                                        >
                                            <option value={1} defaultChecked>Active</option>
                                            <option value={-2}>Lock</option>
                                            <option value={-1}>Delete</option>
                                        </Select>
                                    ) : props.status == 0 ? (
                                        <Select
                                            native
                                            value={status || props.status}
                                            onChange={handleSelectChange}
                                        >
                                            <option value={0} defaultChecked>In Active</option>
                                            <option value={-1}>Delete</option>
                                        </Select>
                                    ) : props.status == -2 ? (
                                        <Select
                                            native
                                            value={status || props.status}
                                            onChange={handleSelectChange}
                                        >
                                            <option value={1}>Active</option>
                                            <option value={-2} defaultChecked>Lock</option>
                                            <option value={-1}>Delete</option>
                                        </Select>
                                    ) : <Select
                                        native
                                        value={status || props.status}
                                        onChange={handleSelectChange}
                                    >
                                        <option value={0}>In Active</option>
                                        <option value={-1} defaultChecked>Delete</option>
                                    </Select>
                                    }
                                </FormControl>}
                            </form>

                        </div>
                    </DialogContent>
                    <div className={classes.submitButton}>
                        <Button
                            disabled={nameValidated === true &&
                                emailValidate === true &&
                                phoneValidate === true ?
                                false : true}
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={handleSubmit}
                            endIcon={<EditIcon />}>
                            Update
                        </Button>
                    </div>
                </div>}
        </Dialog >
    )
})

export default EditForm;