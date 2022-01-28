import React, { memo, useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import useTheme from "@material-ui/core/styles/useTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@material-ui/icons/Close';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import Loader from "../../../../components/UI/Loader/Loader";
import EditIcon from '@material-ui/icons/Edit';
import * as action from '../../../../store/actions/customer/index';
import {
    FiMail,
    FiUser,
    FiPhone,
    FiMapPin
} from "react-icons/fi";
import { MdLocationCity } from 'react-icons/md'
import { RiBuildingLine } from 'react-icons/ri'
import { Typography } from '@material-ui/core';

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

const CountrySelect = styled(CountryDropdown)`
    width: 100%;
    padding: 10px 0;
    margin: 8px 0;
    border-radius: 3px;
    border-color: #cccccc;
`;
const RegionSelect = styled(RegionDropdown)`
    width: 100%;
    padding: 10px 0;
    margin: 8px 0;
    border-radius:3px;
    border-color: #cccccc;
`;

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(0),
        padding: theme.spacing(0),
        minWidth: "500px",
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

const FormModal = memo((props) => {

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [companyName, setCompanyName] = useState('');
    const [validCompany, setValidCompany] = useState(false);
    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [address, setAddress] = useState('');
    const [validAddress, setValidAddress] = useState(false);
    const [zipcode, setZipcode] = useState('');
    const [validZipcode, setValidZipcode] = useState(false);

    const [country, setCountry] = useState('');
    const [validCountry, setValidCountry] = useState(false);
    const [state, setState] = useState('');
    const [validState, setValidState] = useState(false);
    const [city, setCity] = useState('');


    const handleInputChange = (e, type) => {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const zipcodeRegx = /^\d{6}(?:[-\s]\d{4})?$/;
        const phoneRegx = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

        if (type === 'company') {
            setCompanyName(e.target.value)
            if (e.target.value.length >= 3) {
                setValidCompany(true)
            } else {
                setValidCompany(false)
            }
        } else if (type === 'name') {
            setName(e.target.value)
            if (e.target.value.length >= 3) {
                setValidName(true)
            } else {
                setValidName(false)
            }

        } else if (type === 'email') {
            setEmail(e.target.value)
            if (emailRegex.test(e.target.value)) {
                setValidEmail(true)
            } else {
                setValidEmail(false)
            }
        } else if (type === 'phone') {
            setPhone(e.target.value)
            if (e.target.value.length == 10) {
                setValidPhone(true)
            } else {
                setValidPhone(false)
            }
        } else if (type === 'city') {
            setCity(e.target.value)

        } else if (type === 'address') {
            setAddress(e.target.value)

        } else if (type === 'zipcode') {
            if (zipcodeRegx.test(e.target.value)) {
                setValidZipcode(true)
            } else {
                setValidZipcode(false)
            }
            setZipcode(e.target.value)

        }

    }
    let form = (<div>
        <div className={classes.inputBox}>
            <TextField
                required
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <RiBuildingLine />
                        </InputAdornment>
                    ),
                }}
                fullWidth
                label="Company Name"
                variant="outlined"
                value={companyName || ''}
                onChange={(e) => handleInputChange(e, 'company')}
            />
            {companyName === '' ? null : validCompany ?
                <ValidatedText>Company Name is correct</ValidatedText> :
                <ErrorText>Name should be at least three characters</ErrorText>}
        </div>
        <div className={classes.inputBox}>
            <TextField
                required
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FiUser />
                        </InputAdornment>
                    ),
                }}
                fullWidth
                label="Name"
                variant="outlined"
                value={name || ''}
                onChange={(e) => handleInputChange(e, 'name')}
            />
            {name === '' ? null : validName ?
                <ValidatedText>Name is correct</ValidatedText> :
                <ErrorText>Name should be at least three characters</ErrorText>}
        </div>

        <div className={classes.inputBox}>
            <TextField
                required
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
                value={email || ''}
                onChange={(e) => handleInputChange(e, 'email')}
            />
            {email === '' ? null : validEmail ?
                <ValidatedText>Email format is correct</ValidatedText> :
                <ErrorText>Email format is wrong eg: abc@example.com</ErrorText>}
        </div>

        <div className={classes.inputBox}>
            <TextField
                required
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
                value={phone || ''}
                onChange={(e) => handleInputChange(e, 'phone')}
                type="number"
            />
            {phone === '' ? null : validPhone ?
                <ValidatedText>Phone Format is correct !</ValidatedText> :
                <ErrorText>Phone format is wrong, only 10 digits are allowed</ErrorText>}
        </div>

        <div>
            <CountrySelect
                value={country}
                onChange={(val) => setCountry(val)} />
            <RegionSelect
                country={country}
                value={state}
                onChange={(val) => setState(val)} />
        </div>

        <div className={classes.inputBox}>
            <TextField
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <MdLocationCity />
                        </InputAdornment>
                    ),
                }}
                fullWidth
                label="City"
                variant="outlined"
                value={city || ''}
                onChange={(e) => handleInputChange(e, 'city')}
                type="text"
            />
        </div>

        <div className={classes.inputBox}>
            <TextField
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FiMapPin />
                        </InputAdornment>
                    ),
                }}
                fullWidth
                label="Address"
                variant="outlined"
                value={address || ''}
                onChange={(e) => handleInputChange(e, 'address')}
                type="text"
            />
        </div>

        <div className={classes.inputBox}>
            <TextField
                required
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FiPhone />
                        </InputAdornment>
                    ),
                }}
                fullWidth
                label="Zipcode*"
                variant="outlined"
                value={zipcode || ''}
                onChange={(e) => handleInputChange(e, 'zipcode')}
                type="text"
            />
            {zipcode === '' ? null : validZipcode ?
                <ValidatedText>Zipcode Format is correct !</ValidatedText> :
                <ErrorText>Zipcode format is wrong, eg: 123451234, 12345 1234</ErrorText>}
        </div>

    </div>)

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAddingVendor(props.token,
            companyName,
            name,
            email,
            phone,
            country,
            state,
            city,
            zipcode);
        props.handleClose();
    }


    return (
        <Dialog
            open={props.open}
            fullScreen={fullScreen}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title">

            {props.loader ?
                <Loader bigLoader style={{ margin: "150px" }} /> :
                <div style={{ minWidth: "400px" }}>
                    <div className={classes.closeIcon}>
                        <IconButton onClick={props.handleClose} color="inherit" size="small">
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <DialogTitle id="form-dialog-title">
                        <div className={classes.heading}>Add Vendor</div>
                    </DialogTitle>
                    <DialogContent>
                        <div className={classes.pageContent}>
                            <form onSubmit={props.submitEditHandler}>
                                {form}
                            </form>

                        </div>
                    </DialogContent>
                    <div className={classes.submitButton}>
                        <Button
                            disabled={validCompany &&
                                validName &&
                                validEmail &&
                                validPhone &&
                                validZipcode ? false : true}
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={submitHandler}
                            endIcon={<EditIcon />}>
                            Invite
                        </Button>
                    </div>
                </div>}
        </Dialog >
    )
})

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddingVendor: (token, cn, name, mail, ph, country, state, city, zipcode) => dispatch(),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormModal);