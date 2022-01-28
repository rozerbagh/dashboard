import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styled from 'styled-components'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"

// core components
import GridContainer from "../../../../components/Grid/GridContainer";
import Card from "../../../../components/Card/Card";
import Loader from "../../../../components/UI/Loader/Loader";
import Redirection from '../../../../components/Alerts/Alert/Modal';
import * as customButtons from '../../../../components/CustomButtons/CustomButtons'
import SuccessAlert from '../../../../components/Alerts/Success/success'
import ErrorAlert from '../../../../components/Alerts/Error/Error';
import WarningAlert from '../../../../components/Alerts/Warning/Warn';
import * as formatter from "../../../../components/Functions/Formatter";
// Icons
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import { FiCheck, FiX } from 'react-icons/fi'

import * as action from '../../../../store/actions/vendor/index';

import { primaryColor, successColor } from '../../../../assets/jss/variables';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        borderBottom: "1px solid #ccc",
        borderRadius: 0,
    },
    tab: {
        width: "50%"
    },
    loaderContainer: {
        position: "relative",
        margin: "0 auto",
        width: "500px",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    notifyBtn: {
        marginTop: "10px",
        width: "100%",
        display: "flex",
        flexDirection: "row-reverse"
    },
    AlignRight: {
        marginTop: "10px",
        alignItems: "right",
    },
    switch_label: {
        display: "flex",
        alignItems: "center",
    },
    ccs_row: {
        display: "grid",
        alignItems: "baseline",
        gridTemplateColumns: "1fr 1fr"
    },
    eachPadding: {
        padding: "10px",
        width: "100%",
    },
});

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

function TabPanel(props) {
    const { children, value, index, ...rest } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...rest}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const Settings = (props) => {

    const classes = useStyles();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const [cxoReport, setCxoReport] = useState(false);
    const [cxoReportValue, setCxoReportValue] = useState(0);
    const [techReport, setTechReport] = useState(false);
    const [techReportValue, setTechReportValue] = useState(0);

    const [demoAlert, setDemoAlert] = useState(null);

    const [inputCXOFields, setInputCXOFields] = useState([])
    const [inputTechFields, setInputTechFields] = useState([])


    const [cxoEmailsValidate, setCXOEmailsValidate] = useState(true);
    const [techEmailsValidate, setTechEmailsValidate] = useState(true);

    const handleChangeToggleCXOBtn = () => {
        setCxoReport(prevState => !prevState);
    };

    const handleChangeToggleTechBtn = () => {
        setTechReport(prevState => !prevState);
    };

    useEffect(() => {
        cxoReport == true ? setCxoReportValue(1) : setCxoReportValue(0);
        techReport == true ? setTechReportValue(1) : setTechReportValue(0);
    }, [cxoReport, techReport])

    const handleAddCXOFields = () => {
        setInputCXOFields([...inputCXOFields, { email: '' }]);
    }

    const handleAddTechFields = () => {
        setInputTechFields([...inputTechFields, { email: '' }]);
    }

    const handleRemoveCXOFields = id => {
        const values = [...inputCXOFields];
        values.splice(id, 1);
        setInputCXOFields(values);
    }

    const handleRemoveTechFields = id => {
        const values = [...inputTechFields];
        values.splice(id, 1);
        setInputTechFields(values);
    }

    const handleChangeCXOInput = (event, index) => {
        const values = [...inputCXOFields];
        values[index].email = event.target.value;
        setInputCXOFields(values);
        setCXOEmailsValidate(formatter.validateEmail(event.target.value))
    }
    const handleChangeTechInput = (event, index) => {
        const values = [...inputTechFields];
        values[index].email = event.target.value;
        setInputTechFields(values);
        setTechEmailsValidate(formatter.validateEmail(event.target.value))
    }

    const handleDailyReportSubmit = (event) => {
        setDemoAlert(<WarningAlert message="Demo Account" />)
        setTimeout(() => setDemoAlert(null), 5000)
        const toStringCXOMails = [];
        const toStringTechMails = [];
        event.preventDefault();
        inputCXOFields.map((mail, index) => {
            toStringCXOMails.push(mail.email)
        });
        inputTechFields.map((mail, index) => {
            toStringTechMails.push(mail.email)
        });

        const id = JSON.parse(localStorage.getItem('vuid'))
        props.onPostingDailyReport(
            props.token,
            id.vid,
            cxoReportValue,
            toStringCXOMails.toString(),
            techReportValue,
            toStringTechMails.toString(),
        )
        // props.updateReduxCXOTECHmails(toStringCXOMails, toStringTechMails, cxoReportValue, techReportValue);

    };

    useEffect(() => {
        const vuid = JSON.parse(localStorage.getItem('vuid'));
        const vname = JSON.parse(localStorage.getItem('vname'));
        const vemail = JSON.parse(localStorage.getItem('vemail'));
        props.onSettingCustomers(vemail.email, vuid.vid, vname.name, true);
        props.onFetchingDailyReport(props.token, vuid.vid);

    }, []);

    useEffect(() => {
        const newCXOMailArr = [];
        const newTechMailArr = [];

        props.cxoEmailList.map((mail, index) => {
            if (mail !== '') {
                if (!emailRegex.test(mail)) {
                    setCXOEmailsValidate(false)
                } else {
                    setCXOEmailsValidate(false)
                }
                newCXOMailArr.push({ email: mail })
            }
        })
        setInputCXOFields(newCXOMailArr);

        props.techEmailList.map((mail, index) => {
            if (mail !== '') {
                setTechEmailsValidate(formatter.validateEmail(mail))
                newTechMailArr.push({ email: mail })
            }
        })
        setInputTechFields(newTechMailArr);

        props.cxoSwitchValue === 1 ? setCxoReport(true) : setCxoReport(false)
        props.techSwitchValue === 1 ? setTechReport(true) : setTechReport(false)
    }, [props.cxoEmailList, props.techEmailList,
    props.cxoSwitchValue, props.techSwitchValue]);


    // for the cxo report input fields
    useEffect(() => {
        let valid = true;
        inputCXOFields.map(ele => {
            if (valid) {
                setCXOEmailsValidate(true)
                if (formatter.validateEmail(ele.email) === false) {
                    setCXOEmailsValidate(false)
                    valid = false
                }
            }

        })
    }, [inputCXOFields])

    // for the tech report input fields
    useEffect(() => {
        let valid = true;
        inputTechFields.map(ele => {
            if (valid) {
                setTechEmailsValidate(true)
                if (formatter.validateEmail(ele.email) === false) {
                    setTechEmailsValidate(false)
                }
            }

        })
    }, [inputTechFields])

    return (
        <>
            {props.settingError === 'logout' ? <Redirection
                linkRoute="/logout"
                bodyText="Other session is active and you are logged out. Please login again."
                btnText="Ok" /> :
                props.settingError === 'Your roles have been updated. Login again.' ? <Redirection
                    linkRoute="/logout"
                    bodyText="Your roles have been updated. Login again."
                    btnText="Ok" /> :
                    <GridContainer>
                        {props.getLoader ?
                            <div className={classes.loaderContainer}>
                                <Loader bigLoader style={{ margin: "0 auto" }} />
                            </div> :
                            <Card>
                                <span style={{ fontWeight: "500", fontSize: "1.2rem", marginBottom: "20px" }}>Daily Reports Notifications</span>
                                <span style={{ fontWeight: "500" }}>Add respective emails to send the daily reports</span>
                                <Grid container spacing={2}>
                                    {/* CXO functionalities and DOM */}
                                    <Grid item xs={12} sm={6} md={6}>
                                        <div className={classes.switch_label}>
                                            <IconButton
                                                size="small"
                                                onClick={handleChangeToggleCXOBtn}>
                                                {cxoReport ?
                                                    <ToggleOnIcon fontSize="large" style={{ color: primaryColor[1] }} /> :
                                                    <ToggleOffIcon fontSize="large" />
                                                }
                                            </IconButton>
                                            <Typography>CXO Report</Typography>
                                        </div>
                                        {inputCXOFields.map((input, index) => (
                                            <>
                                                <TextField
                                                    autoComplete="none"
                                                    margin="normal"
                                                    key={`cxo-recieveer-${index}`}
                                                    id={`cxo-reciever-${index}`}
                                                    label="Enter Email"
                                                    variant="outlined"
                                                    type="email"
                                                    value={input.email}
                                                    fullWidth
                                                    error={input.email == '' ? false : formatter.validateEmail(input.email) ? false : true}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                {input === '' ? <FiX /> : formatter.validateEmail(input.email) ? <FiCheck className="ok_text" /> :
                                                                    <FiX className="danger_text" />}
                                                            </InputAdornment>),
                                                        endAdornment: (
                                                            <InputAdornment position="start">
                                                                <customButtons.textDangerButton
                                                                    className={classes.button}
                                                                    onClick={() => handleRemoveCXOFields(index)} >
                                                                    Remove
                                                                </customButtons.textDangerButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    onChange={(event) => handleChangeCXOInput(event, index)} />
                                                {input.email === '' ? null : formatter.validateEmail(input.email) ? null :
                                                    <ErrorText>Email format is wrong eg: example@example.com</ErrorText>}
                                            </>
                                        ))}
                                        <Grid item xs={12} sm={12} md={12}>
                                            <customButtons.DashedLinePrimaryButton
                                                variant="outlined"
                                                color="primary"
                                                fullWidth
                                                className={classes.button}
                                                onClick={handleAddCXOFields}
                                                endIcon={<AddIcon />}
                                                margin="normal"
                                            >
                                                Add Emails
                                            </customButtons.DashedLinePrimaryButton>
                                        </Grid>
                                    </Grid>

                                    {/* Tech functionalities and DOM */}
                                    <Grid item xs={12} sm={6} md={6}>
                                        <div className={classes.switch_label}>
                                            <IconButton
                                                size="small"
                                                onClick={handleChangeToggleTechBtn}>
                                                {techReport ?
                                                    <ToggleOnIcon fontSize="large" style={{ color: primaryColor[1] }} /> :
                                                    <ToggleOffIcon fontSize="large" />
                                                }
                                            </IconButton>
                                            <Typography>Tech Report</Typography>
                                        </div>
                                        {inputTechFields.map((input, index) => (
                                            <>
                                                <TextField
                                                    autoComplete="none"
                                                    key={`tech-recieveer-${index}`}
                                                    margin="normal"
                                                    id={`tech-reciever-${index}`}
                                                    label="Enter Email"
                                                    variant="outlined"
                                                    value={input.email}
                                                    error={input.email == '' ? false : formatter.validateEmail(input.email) ? false : true}
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                {input === '' ? <FiX /> : formatter.validateEmail(input.email) ? <FiCheck className="ok_text" /> :
                                                                    <FiX className="danger_text" />}
                                                            </InputAdornment>),
                                                        endAdornment: (
                                                            <InputAdornment position="start">
                                                                <customButtons.textDangerButton
                                                                    className={classes.button}
                                                                    onClick={() => handleRemoveTechFields(index)} >
                                                                    Remove
                                                                </customButtons.textDangerButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    onChange={(event) => handleChangeTechInput(event, index)} />
                                                {input.email === '' ? null : formatter.validateEmail(input.email) ? null :
                                                    <ErrorText>Email format is wrong eg: example@example.com</ErrorText>}
                                            </>
                                        ))}
                                        <Grid item xs={12} sm={12} md={12}>
                                            <customButtons.DashedLinePrimaryButton
                                                variant="outlined"
                                                color="primary"
                                                fullWidth
                                                className={classes.button}
                                                onClick={handleAddTechFields}
                                                endIcon={<AddIcon />}
                                            >   Add Emails
                                            </customButtons.DashedLinePrimaryButton>
                                        </Grid>

                                    </Grid>



                                    <Grid item xs={12} sm={12} md={12}>
                                        <div className={classes.notifyBtn}>
                                            {props.postLoader ?
                                                <customButtons.MainSecondaryButton
                                                    disableElevation
                                                    variant="contained"
                                                    color="inherit"
                                                    className={classes.button}
                                                    endIcon={<SendIcon />}
                                                > <Loader smallLoader />
                                                </customButtons.MainSecondaryButton> :
                                                <customButtons.MainSecondaryButton
                                                    disabled={cxoEmailsValidate &&
                                                        techEmailsValidate ? false : true}
                                                    disableElevation
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.button}
                                                    endIcon={<SendIcon />}
                                                    onClick={(event) => handleDailyReportSubmit(event)}
                                                > Notify
                                                </customButtons.MainSecondaryButton>}
                                        </div>
                                    </Grid>

                                </Grid>


                            </Card>}
                        <input
                            type="text"
                            autoComplete="on"
                            value=""
                            style={{ display: 'none', opacity: 0, position: 'absolute' }}
                            readOnly={true}
                        />
                    </GridContainer>}
            {props.dailyReportSucMsg === 'Done' ? <SuccessAlert message={props.dailyReportSucMsg} /> : null}
            {props.dailyReportErrMsg !== null ? <ErrorAlert message={props.dailyReportErrMsg} /> : null}
            {demoAlert}
        </>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth_reducer.token,
        cxoEmailList: state.vendorSettings.cxo_email_lists,
        techEmailList: state.vendorSettings.tech_email_lists,
        notifyEmailList: state.vendorSettings.notify_email_lists,
        cxoSwitchValue: state.vendorSettings.cxo_switch_value,
        techSwitchValue: state.vendorSettings.tech_switch_value,
        getLoader: state.vendorSettings.getloading,
        postLoader: state.vendorSettings.postloading,

        settingError: state.vendorSettings.setting_error,

        dailyReportSucMsg: state.vendorSettings.dailyReportSent,
        dailyReportErrMsg: state.vendorSettings.dailyReportNotSent,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchingDailyReport: (token, id) => dispatch(action.fetchDailyReports(token, id)),
        onPostingDailyReport: (token, id, cxoValue, cxoMailList, techValue, techList) => dispatch(action.postDailyReports(token, id, cxoValue, cxoMailList, techValue, techList)),
        updateReduxCXOTECHmails: (cxoEmails, techEmails, cxoswitch, techswitch) => dispatch(action.daily_reports_success(cxoEmails, techEmails, cxoswitch, techswitch)),
        onSettingCustomers: (email, id, name, bool) => dispatch(action.set_customers(email, id, name, bool)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
