import React, { useState, useEffect } from 'react';

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
import styled from 'styled-components';
import {
    FiMail,
    FiUser,
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

function UserForm(props) {

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [nameValidated, setNameValidated] = useState(false);
    const [emailValidate, setEmailValidate] = useState(false);
    const [phoneValidate, setPhoneValidate] = useState(false);


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

    const submitHandler = (event) => {
        event.preventDefault();
        props.submitHandler(name, email, phone);
        setName('')
        setEmail('')
        setPhone('')
    }

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
            <DialogTitle id="form-dialog-title" className={classes.heading}>Add Users</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter your users details here.  * required  field in mandatory
                </DialogContentText>
                <form onSubmit={props.submitHandler}>
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
                            color="secondary"
                            value={name || ''}
                            onChange={handleNameChange}
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
                                        <FiMail />
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                            label="Email"
                            variant="outlined"
                            color="secondary"
                            value={email || ''}
                            onChange={handleEmailChange}
                            margin="normal"
                            error={emailValidate === true ? false : email === '' ? false : true}
                            required={true}
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
                            fullWidth
                            label="Phone"
                            variant="outlined"
                            color="secondary"
                            value={phone || ''}
                            onChange={handlePhoneChange}
                            type="number"
                            margin="normal"
                            error={phoneValidate === true ? false : phone === '' ? false : true}
                            required={true}
                        />
                    </div>
                    {phone === '' ? null : phoneValidate ?
                        <ValidatedText>Phone Format is correct !</ValidatedText> :
                        <ErrorText>Phone format is wrong, only 10 digits are allowed</ErrorText>}
                </form>
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
                    onClick={submitHandler}
                    endIcon={<ArrowRightAltIcon />}>
                    Invite
                </Button>
            </div>
        </Dialog >
    )
}

export default UserForm;
