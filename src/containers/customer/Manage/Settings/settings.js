
import React, { useState, useEffect, useRef, useMemo } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styled from 'styled-components';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"

// core components
import GridItem from "../../../../components/Grid/GridItem";
import GridContainer from "../../../../components/Grid/GridContainer";
import Card from "../../../../components/Card/Card";
import Loader from "../../../../components/UI/Loader/Loader";
import Redirection from '../../../../components/Alerts/Alert/Modal';
import * as customButtons from '../../../../components/CustomButtons/CustomButtons'
import SuccessAlert from '../../../../components/Alerts/Success/success';
import ErrorAlert from '../../../../components/Alerts/Error/Error';
import WarningAlert from '../../../../components/Alerts/Warning/Warn';
import * as formatter from "../../../../components/Functions/Formatter";
// Icons
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import { FiCheck, FiX } from 'react-icons/fi'

import * as action from '../../../../store/actions/customer/index';
import { primaryColor } from '../../../../assets/jss/variables';
import Breadcrumbs from "../../../../components/UI/Breadscrumbs/Breadscrumbs";

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
        label: "Setting",
        link: null,
        subroutes: [],
    }
]

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
    const [demoAlert, setDemoAlert] = useState(null);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [cxoReport, setCxoReport] = useState(true);
    const [cxoReportValue, setCxoReportValue] = useState(1);
    const [techReport, setTechReport] = useState(true);
    const [techReportValue, setTechReportValue] = useState(1);

    const [inputCXOFields, setInputCXOFields] = useState([{ email: '' }])
    const [inputTechFields, setInputTechFields] = useState([{ email: '' }])
    const [inputNotifyFields, setInputNotifyFields] = useState([{ email: '' }]);

    const [cxoEmailsValidate, setCXOEmailsValidate] = useState(true);
    const [techEmailsValidate, setTechEmailsValidate] = useState(true);
    const [notifyEmailsValidate, setNotifyEmailsValidate] = useState(true);

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
        setInputCXOFields([...inputCXOFields, { email: '' }])
    }

    const handleAddTechFields = () => {
        setInputTechFields([...inputTechFields, { email: '' }])
    }

    const handleAddNotifyFields = () => {
        setInputNotifyFields([...inputNotifyFields, { email: '' }])
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

    const handleRemoveNotifyFields = id => {
        const values = [...inputNotifyFields];
        values.splice(id, 1);
        setInputNotifyFields(values);
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
    const handleChangeNotifyInput = (event, index) => {
        const values = [...inputNotifyFields];
        values[index].email = event.target.value;
        setInputNotifyFields(values);
        setNotifyEmailsValidate(formatter.validateEmail(event.target.value))
    }


    const handleDailyReportSubmit = (event) => {
        setDemoAlert(<WarningAlert message="Demo Account" />)
        setTimeout(() => setDemoAlert(null), 5000)
        const toStringCXOMails = [];
        const toStringTechMails = [];
        event.preventDefault();
        inputCXOFields.map((mail, index) => {
            toStringCXOMails.push(mail.email)
        })
        inputTechFields.map((mail, index) => {
            toStringTechMails.push(mail.email)
        });

        props.onPostingDailyReport(
            props.token,
            cxoReportValue,
            toStringCXOMails.toString(),
            techReportValue,
            toStringTechMails.toString(),
        )
    };

    const handleNotifyReportSubmit = (e) => {
        setDemoAlert(<WarningAlert message="Demo Account" />)
        setTimeout(() => setDemoAlert(null), 5000)
        const toStringNotifyMails = [];
        e.preventDefault();
        inputNotifyFields.map((mail, index) => {
            toStringNotifyMails.push(mail.email)
        })

        props.onPostingNotifyReport(props.token, toStringNotifyMails.toString(),)
    };

    useEffect(() => {
        props.onFetchingDailyReport(props.token);
    }, []);

    useEffect(() => {
        const newCXOMailArr = [];
        const newTechMailArr = [];
        const newNotifyMailArr = [];

        props.cxoEmailList.map((mail, index) => {
            if (mail !== '') {
                setCXOEmailsValidate(formatter.validateEmail(mail))
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

        props.notifyEmailList.map((mail, index) => {
            if (mail !== '') {
                setNotifyEmailsValidate(formatter.validateEmail(mail))
                newNotifyMailArr.push({ email: mail })
            }
        })
        setInputNotifyFields(newNotifyMailArr);

        props.cxoSwitchValue === 1 ? setCxoReport(true) : setCxoReport(false)
        props.techSwitchValue === 1 ? setTechReport(true) : setTechReport(false)

    }, [props.cxoEmailList, props.techEmailList, props.notifyEmailList,
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

    // for the notify input fields
    useEffect(() => {
        let valid = true;
        inputNotifyFields.map(ele => {
            if (valid) {
                setNotifyEmailsValidate(true)
                if (formatter.validateEmail(ele.email) === false) {
                    setNotifyEmailsValidate(false)
                }
            }

        })
    }, [inputNotifyFields])

    return (
        <>
            <Breadcrumbs links={subroutes} />
            {props.settingError === 'logout' ? <Redirection
                linkRoute="/logout"
                bodyText="Other session is active and you are logged out. Please login again."
                btnText="Ok" /> :
                props.settingError === 'Your roles have been updated. Login again.' ? <Redirection
                    linkRoute="/logout"
                    bodyText="Your roles have been updated. Login again."
                    btnText="Ok" /> : props.settingError !== null ?
                    null :
                    null
            }
            <GridContainer>
                {props.getLoader ?
                    <div className={classes.loaderContainer}>
                        <Loader bigLoader style={{ margin: "0 auto" }} />
                    </div> :
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <Tab label="Daily Reports" fullWidth={true} className={classes.tab} />
                                <Tab label="Notifications" fullWidth={true} className={classes.tab} />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                {/* <FormControlLabel
                                            control={<Switch checked={cxoReport} onChange={handleChangeToggleCXOBtn} />}
                                        /> */}
                                <span style={{ fontWeight: "500" }}>Add respective emails to send the daily reports</span>
                                <form onSubmit={(event) => handleDailyReportSubmit(event)}>
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
                                                        error={input.email == '' ? false : formatter.validateEmail(input.email) ? false : true}
                                                        margin="normal"
                                                        key={`cxo-reciever-${index}`}
                                                        id={`cxo-reciever-${index}`}
                                                        label="Enter Email"
                                                        variant="outlined"
                                                        type="email"
                                                        value={input.email}
                                                        fullWidth
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    {input.email === '' ? <FiX /> : formatter.validateEmail(input.email) ? <FiCheck className="ok_text" /> :
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
                                                        onChange={(event) => handleChangeCXOInput(event, index)}
                                                    />
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
                                                <Typography>Technician Report</Typography>
                                            </div>
                                            {inputTechFields.map((input, index) => (
                                                <>
                                                    <TextField
                                                        autoComplete="none"
                                                        error={input.email == '' ? false : formatter.validateEmail(input.email) ? false : true}
                                                        type="email"
                                                        key={`tech-reciever-${index}`}
                                                        margin="normal"
                                                        id={`tech-reciever-${index}`}
                                                        label="Enter Email"
                                                        variant="outlined"
                                                        value={input.email}
                                                        fullWidth
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    {input.email === '' ? <FiX /> : formatter.validateEmail(input.email) ? <FiCheck className="ok_text" /> :
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
                                                        disabled={cxoEmailsValidate && techEmailsValidate ? false : true}
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
                                </form>

                            </TabPanel>

                            <TabPanel value={value} index={1}>
                                <form onSubmit={handleNotifyReportSubmit}>
                                    <Grid container>
                                        <Grid item xs={12} sm={6} md={6}>
                                            {inputNotifyFields.map((input, index) => (
                                                <>
                                                    <TextField
                                                        autoComplete="none"
                                                        error={input.email == '' ? false : formatter.validateEmail(input.email) ? false : true}
                                                        key={`notify-reciever-${index}`}
                                                        id={`notify-reciever-${index}`}
                                                        label="Enter Email"
                                                        variant="outlined"
                                                        name="email"
                                                        type="email"
                                                        value={input.email}
                                                        fullWidth
                                                        margin="normal"
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    {input.email === '' ?
                                                                        <FiX /> : formatter.validateEmail(input.email) ? <FiCheck className="ok_text" /> :
                                                                            <FiX className="danger_text" />}
                                                                </InputAdornment>),
                                                            endAdornment: (
                                                                <InputAdornment position="start">
                                                                    <customButtons.textDangerButton
                                                                        className={classes.button}
                                                                        onClick={() => handleRemoveNotifyFields(index)} >
                                                                        Remove
                                                                    </customButtons.textDangerButton>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        onChange={(event) => handleChangeNotifyInput(event, index)} />
                                                    {input.email === '' ? null : formatter.validateEmail(input.email) ? null :
                                                        <ErrorText>Email format is wrong eg: example@example.com</ErrorText>}
                                                </>
                                            ))}
                                            <customButtons.DashedLinePrimaryButton
                                                variant="outlined"
                                                color="primary"
                                                fullWidth
                                                className={classes.button}
                                                onClick={handleAddNotifyFields}
                                                endIcon={<AddIcon />}
                                            >
                                                Add Emails
                                            </customButtons.DashedLinePrimaryButton>
                                            <div className={classes.notifyBtn}>
                                                <customButtons.MainPrimaryButton
                                                    disabled={notifyEmailsValidate ? false : true}
                                                    disableElevation
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.button}
                                                    onClick={handleNotifyReportSubmit}
                                                    endIcon={<SendIcon />}
                                                >
                                                    Notify
                                                </customButtons.MainPrimaryButton>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </form>
                            </TabPanel>
                        </Card>
                    </GridItem>}
                <input
                    type="text"
                    autoComplete="on"
                    value=""
                    style={{ display: 'none', opacity: 0, position: 'absolute' }}
                    readOnly={true}
                />
            </GridContainer>

            {props.dailyReportSucMsg === 'Done' ? <SuccessAlert message={props.dailyReportSucMsg} /> : null}
            {props.dailyReportErrMsg !== null ? <ErrorAlert message={props.dailyReportErrMsg} /> : null}

            {props.notificationsSucMsg === 'Done' ? <SuccessAlert message={props.notificationsSucMsg} /> : null}
            {props.notificationsErrMsg !== null ? <ErrorAlert message={props.notificationsErrMsg} /> : null}
            {demoAlert}
        </>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth_reducer.token,
        cxoEmailList: state.customerSettings.cxo_email_lists,
        techEmailList: state.customerSettings.tech_email_lists,
        notifyEmailList: state.customerSettings.notify_email_lists,
        cxoSwitchValue: state.customerSettings.cxo_switch_value,
        techSwitchValue: state.customerSettings.tech_switch_value,
        getLoader: state.customerSettings.getloading,
        postLoader: state.customerSettings.postloading,

        settingError: state.customerSettings.setting_error,

        postingDailyReport: state.customerSettings.postingDR,
        dailyReportSucMsg: state.customerSettings.dailyReportSent,
        dailyReportErrMsg: state.customerSettings.dailyReportNotSent,

        postingNotifications: state.customerSettings.postingNoti,
        notificationsSucMsg: state.customerSettings.notificationSent,
        notificationsErrMsg: state.customerSettings.notificationNotSent,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchingDailyReport: (token) => dispatch(action.fetchDailyReports(token)),
        onPostingDailyReport: (token, cxoValue, cxoMailList, techValue, techList) => dispatch(action.postDailyReports(token, cxoValue, cxoMailList, techValue, techList)),
        onPostingNotifyReport: (token, notifyList) => dispatch(action.postNotifyReports(token, notifyList)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
