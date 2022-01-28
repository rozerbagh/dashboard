import React, { useState, useMemo, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styled from 'styled-components'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Box from "@material-ui/core/Box"
import Paper from "@material-ui/core/Paper"
import Icon from "@material-ui/core/Icon"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import Grid from "@material-ui/core/Grid";
import Tooltip from '@material-ui/core/Tooltip'

// core components
import GridItem from "../../../../components/Grid/GridItem";
import GridContainer from "../../../../components/Grid/GridContainer";
import DateTime from '../../../../components/UI/DateTimePicker/DateTime';
import * as CustomButton from '../../../../components/CustomButtons/CustomButtons';
// components
import ErrorAlert from '../../../../components/Alerts/Error/Error';
import WarningAlert from '../../../../components/Alerts/Warning/Warn';
import Loader from '../../../../components/UI/Loader/Loader'
import Breadcrumbs from "../../../../components/UI/Breadscrumbs/Breadscrumbs";
import ZoomViewInstances from './ZoomViewInstances';
import Services from './Services';
import Graphs from './Graph';
import Internet from './Internet';
import Tasks from './Tasks';
import Backup from './Backup';
import VmHeader from './HeaderVm'

// material icon
import MenuIcon from '@material-ui/icons/Menu';

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
        label: "Zoom View",
        link: null,
        subroutes: [],
    }
]

const useTabPanelStyles = makeStyles({
    root: {
        flexGrow: 1,
        borderRadius: 0,
        backgroundColor: "#ffffff",
        borderBottomLeftRadius: "0.8em",
        borderBottomRightRadius: "0.8em",
    },
});


function TabPanel(props) {

    const classes = useTabPanelStyles();

    const { children, value, index, ...rest } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...rest}
            className={classes.root}
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

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        borderRadius: 0,
        backgroundColor: "#f4f4f4",
        borderTopLeftRadius: "0.8em",
        borderTopRightRadius: "0.8em",
    },
    tab: {
        textTransform: "initial",
    },
    activeTab: {
        backgroundColor: "#fff"
    },
    zoomViewDetailsBox: {
        boxShadow: "0 0 0.5em #d6f0fd",
        borderRadius: "0.8em",
        backgroundColor: "#fffff",
        width: "100%",
        marginRight: "10px",
        marginTop: "10px",
    },
    tabPanel: {
        backgroundColor: '#ffffff'
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
    instanceMenuIcon: {
        position: "absolute",
        top: "-5px",
        left: "-5px",
        zIndex: 10,
        cursor: "pointer",
    },
    instanceSidebarOpen: {
        display: "block",
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    instanceSidebarClose: {
        display: "none",
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
}))

const SideCard = styled.div`
    margin:1em;
    padding:1em;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    background-color: #fff;
    box-shadow: 0 0 0.5em #d6f0fd;
    font-size: 0.8rem;
    height: calc(100vh - 6rem);
`;

function ZoomView(props) {
    const classes = useStyles();
    const [mainLoader, setMainLoader] = useState(true)
    const { mainSidebar, ...rest } = props
    const [routedLanIP, setRoutedLanIP] = useState('')
    const [routedWanIP, setRoutedWanIP] = useState('')
    const [routedTab, setRoutedTab] = useState('');

    const [demoAlert, setDemoAlert] = useState(null);

    const [lan_ip, setLanip] = useState('');
    const [wan_ip, setWanip] = useState('');


    const [value, setValue] = useState(0);
    const [vminfo, setVmInfo] = useState([]);

    const [InstanceSideBar, setInstanceSideBar] = useState(false);
    const [zoomViewBox, setZoomViewBox] = useState(500);

    const [openDate, setOpenDate] = useState(false);

    const [ipArr, setIpArr] = useState([]);
    const [currentLanIp, setCurrentLanIP] = useState('');

    useEffect(() => {
        // console.log(props.location.state);
        if (props.location.state !== null && props.location.state !== undefined) {
            sessionStorage.setItem('curr_selected_lip', props.location.state.lip)
            sessionStorage.setItem('curr_selected_wip', props.location.state.wip)
            setRoutedLanIP(props.location.state.lip);
            setRoutedWanIP(props.location.state.wip);
            setRoutedTab(props.location.state.tab);
            setTimeout(() =>
                props.onFetchingZVInstances(props.token, fromTime, toTime,
                    props.location.state.lip,
                    props.location.state.wip),
                1000)
        } else if (props.location.search !== '') {
            const lip = sessionStorage.getItem('curr_selected_lip')
            const wip = sessionStorage.getItem('curr_selected_wip')
            setRoutedLanIP(lip);
            setRoutedWanIP(wip);
            setRoutedTab('');
            setTimeout(() => props.onFetchingZVInstances(props.token, fromTime, toTime, lip, wip), 200)
        } else {
            setRoutedLanIP('');
            setRoutedWanIP('');
            setRoutedTab('');
            setTimeout(() => props.onFetchingZVInstances(props.token, fromTime, toTime, '', ''), 200)
        }
        setTimeout(() => setMainLoader(false), 4000)
    }, [props.location.state, props.location.search]);

    useEffect(() => {
        if (routedTab == 'backup') {
            setValue(4)
        } else if (routedTab == 'graph') {
            setTimeout(() => setValue(1), 0)
        } else if (routedTab == 'internet') {
            setValue(2)
        } else {
            setValue(0)
        }

        // if (tabIndex == 'internet') {
        //     setTimeout(() => setValue(), 0)
        // }
    }, [routedTab]);

    const toggleInstanceSideBar = () => {
        setInstanceSideBar(!InstanceSideBar);
        setZoomViewBox(document.getElementById("zoom_view").clientWidth)
    };


    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };


    const [toDates, setToDate] = useState(new Date());
    const [fromDates, setFromDate] = useState(new Date(toDates.getTime() - (15 * 60 * 1000)));

    const [fromTime, setFromTime] = useState(fromDates.getTime());
    const [toTime, setToTime] = useState(toDates.getTime());

    const handleDateTime = (date, type) => {
        if (type === "from") {
            setFromDate(date)
            setFromTime(date.getTime())
            console.log('from:', date.getTime());
        } else {
            setToDate(date);
            setToTime(date.getTime());
            console.log('to:', date);
        }
    }

    const submitTimespan = (from, to) => {
        setFromDate(new Date(from))
        setToDate(new Date(to))
        setFromTime(from)
        setToTime(to);
        const lanip = sessionStorage.getItem('curr_selected_lip')
        const wanip = sessionStorage.getItem('curr_selected_wip')
        setDemoAlert(<WarningAlert message="Demo Account" />)
        setTimeout(() => setDemoAlert(null), 5000)
        props.onUpdatingZoomView(props.token, from, to, lanip, wanip)
    }
    useEffect(() => {
        setCurrentLanIP(props.lanip)
    }, [props.lanip])

    const [ostype, setOSType] = useState('')
    useEffect(() => {
        setVmInfo(props.vmInfo)
        props.vmInfo.map(e => {
            setLanip(e.lan_ip)
            setWanip(e.wan_ip)
            setOSType(e.vm_os)
        })
    }, [props.vmInfo])

    const [timeInterval, setTimeInterval] = React.useState(15);

    const handleTimeIntervalChange = (event) => {
        const selectedTime = parseInt(event.target.value)

        setTimeInterval(parseInt(event.target.value));

        if (selectedTime == 0) {
            const fro = getTodayFromTo().from
            const too = getTodayFromTo().to
            setOpenDate(false)
            submitTimespan(fro, too)
        } else if (selectedTime == 1) {
            const fro = getYesterdayFromTo().from
            const too = getYesterdayFromTo().to
            setOpenDate(false)
            submitTimespan(fro, too)
        } else if (selectedTime == -1) {
            const fro = fromTime
            const too = toTime
            setOpenDate(true)
        } else {
            const too = new Date().getTime();
            const fro = too - (selectedTime * 60 * 1000);
            setOpenDate(false)
            submitTimespan(fro, too)
        }
    };



    const getYesterdayFromTo = () => {
        const todayDateObj = new Date();
        todayDateObj.setDate(todayDateObj.getDate() - 1);

        const firstDate = todayDateObj.getFullYear() + '-' + (parseInt(todayDateObj.getMonth()) + 1) + '-' + parseInt(todayDateObj.getDate()) + ' 00:00';
        const todayDate = todayDateObj.getFullYear() + '-' + (parseInt(todayDateObj.getMonth()) + 1) + '-' + parseInt(todayDateObj.getDate()) + ' 23:59';

        const from = Math.floor(new Date(firstDate).getTime() / 1000) * 1000;
        const to = Math.floor(new Date(todayDate).getTime() / 1000) * 1000;
        return { from, to };
    }

    const getTodayFromTo = () => {
        const todayDateObj = new Date();

        const firstDate = todayDateObj.getFullYear() + '-' + (parseInt(todayDateObj.getMonth()) + 1) + '-' + parseInt(todayDateObj.getDate()) + ' 00:00';
        const todayDate = todayDateObj.getFullYear() + '-' + (parseInt(todayDateObj.getMonth()) + 1) + '-' + parseInt(todayDateObj.getDate()) + ' ' + todayDateObj.getHours() + ':' + todayDateObj.getMinutes();

        const from = Math.floor(new Date(firstDate).getTime() / 1000) * 1000;
        const to = Math.floor(new Date(todayDate).getTime() / 1000) * 1000;
        return { from, to };
    }

    const updateHandler = (lanip, wanip) => {
        setDemoAlert(<WarningAlert message="Demo Account" />)
        setTimeout(() => setDemoAlert(null), 5000)
        // props.onUpdatingZoomView(props.token, fromTime, toTime, lanip, wanip);
    }


    return (
        <>
            <Breadcrumbs links={subroutes} />
            <div>
                <Tooltip title="Instances Panel">
                    <Icon aria-label="Instances Panel" className={classes.instanceMenuIcon} onClick={toggleInstanceSideBar}>
                        <MenuIcon />
                    </Icon>
                </Tooltip>

                <GridContainer alignItems="baseline">
                    {/* <div className={clsx(classes.sidebar, {
                                [classes.sidebarOpen]: props.sidebarOpen,
                                [classes.sidebarClose]: !props.sidebarOpen,
                            })}>

                            </div> */}
                    <Grid item xs={12} sm={4} md={3}
                        className={clsx({
                            [classes.instanceSidebarOpen]: InstanceSideBar === true,
                            [classes.instanceSidebarClose]: InstanceSideBar === false,
                        })}
                    >
                        <SideCard className="overall_scroller">
                            <ZoomViewInstances from={fromTime}
                                lan_ip={lan_ip}
                                to={toTime}
                                updateZoomView={updateHandler}
                                instancesList={props.instancesList}
                            />
                        </SideCard>
                    </Grid>
                    <GridItem
                        id="zoom_view"
                        xs={12}
                        sm={InstanceSideBar === false ? 8 : 12}
                        md={InstanceSideBar === false ? 12 : 9}>
                        <div className={classes.zoomViewDetailsBox}
                            style={{ marginLeft: InstanceSideBar === false ? "10px" : "0px", }}>
                            <Paper className={classes.root} elevation={0}>
                                <Tabs
                                    value={value}
                                    onChange={handleTabChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="fullWidth"
                                >
                                    <Tab label="Services" fullWidth={true} className={classes.tab} />
                                    <Tab label="Graphs" fullWidth={true} className={classes.tab} />
                                    <Tab label="Internet" fullWidth={true} className={classes.tab} />
                                    <Tab label="Tasks" fullWidth={true} className={classes.tab} />
                                    <Tab label="Backup" fullWidth={true} className={classes.tab} />
                                </Tabs>
                            </Paper>
                            <TabPanel value={value} index={0}>
                                {vminfo.map((ele, key) =>
                                    <VmHeader row={ele} key={`instance-header-${key}`}
                                        loading={props.graphloader} />)
                                }
                                <Services id="zoomview-services" />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                {vminfo.map((ele, key) =>
                                    <VmHeader row={ele} key={`instance-header-${key}`}
                                        loading={props.graphloader} />)
                                }
                                <GridItem xs={12} sm={12} md={12}>
                                    {openDate ? <div className="flex-display left-margin">
                                        <DateTime
                                            exportDate={handleDateTime}
                                            label="From"
                                            propsDate={fromDates}
                                            dateTypes="from" />
                                        <DateTime
                                            exportDate={handleDateTime}
                                            label="To"
                                            propsDate={toDates}
                                            dateTypes="to"
                                        />
                                    </div> : <GridItem xs={12} sm={3} md={6}></GridItem>}

                                    <GridItem xs={12} sm={3} md={4}>
                                        {openDate ? <CustomButton.MainPrimaryButton
                                            onClick={() => submitTimespan(fromTime, toTime)}
                                        >
                                            submit
                                        </CustomButton.MainPrimaryButton> : null}
                                    </GridItem>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel htmlFor="outlined-age-native-simple">Interval</InputLabel>
                                        <Select
                                            native
                                            value={timeInterval}
                                            onChange={handleTimeIntervalChange}
                                            label="Interval"
                                            inputProps={{
                                                name: 'Interval',
                                                id: 'outlined-age-native-simple',
                                            }}
                                        >
                                            <option value={15} defaultValue>15 min</option>
                                            <option value={30} disabled>30 min</option>
                                            <option value={60} disabled>1 hr</option>
                                            <option value={120} disabled>2 hr</option>
                                            <option value={0} disabled>Today</option>
                                            <option value={1} disabled>Yesterady</option>
                                            <option value={-1} disabled>Custom</option>

                                        </Select>
                                    </FormControl>
                                </GridItem>
                                {props.graphloader ?
                                    null :
                                    <Graphs
                                        instanceSideBar={InstanceSideBar}
                                        adminSidebar={mainSidebar}
                                        osType={ostype}
                                    />}
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                {vminfo.map((ele, key) =>
                                    <VmHeader row={ele} key={`instance-header-${key}`}
                                        loading={props.graphloader} />)
                                }
                                <GridItem xs={12} sm={12} md={12}>
                                    {openDate ? <div className="flex-display left-margin">
                                        <DateTime
                                            exportDate={handleDateTime}
                                            label="From"
                                            propsDate={fromDates}
                                            dateTypes="from" />
                                        <DateTime
                                            exportDate={handleDateTime}
                                            label="To"
                                            propsDate={toDates}
                                            dateTypes="to"
                                        />
                                    </div> : <GridItem xs={12} sm={3} md={6}></GridItem>}

                                    <GridItem xs={12} sm={3} md={4}>
                                        {openDate ? <CustomButton.MainPrimaryButton
                                            onClick={() => submitTimespan(fromTime, toTime)}
                                        >
                                            submit
                                        </CustomButton.MainPrimaryButton> : null}
                                    </GridItem>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel htmlFor="outlined-age-native-simple">Interval</InputLabel>
                                        <Select
                                            native
                                            value={timeInterval}
                                            onChange={handleTimeIntervalChange}
                                            label="Interval"
                                            inputProps={{
                                                name: 'Interval',
                                                id: 'outlined-age-native-simple',
                                            }}
                                        >
                                            <option value={15} defaultValue>15 min</option>
                                            <option value={30} disabled>30 min</option>
                                            <option value={60} disabled>1 hr</option>
                                            <option value={120} disabled>2 hr</option>
                                            <option value={0} disabled>Today</option>
                                            <option value={1} disabled>Yesterady</option>
                                            <option value={-1} disabled>Custom</option>
                                        </Select>
                                    </FormControl>
                                </GridItem>
                                <Internet
                                    widthChanged={zoomViewBox}
                                    val={value}
                                    instanceSideBar={InstanceSideBar}
                                    adminSidebar={mainSidebar} />
                            </TabPanel>

                            <TabPanel value={value} index={3}>
                                {vminfo.map((ele, key) =>
                                    <VmHeader row={ele} key={`instance-header-${key}`}
                                        loading={props.graphloader} />)
                                }
                                <Tasks public_ip={wan_ip} />
                            </TabPanel>

                            <TabPanel value={value} index={4}>
                                {vminfo.map((ele, key) =>
                                    <VmHeader row={ele} key={`instance-header-${key}`}
                                        loading={props.graphloader} />)
                                }
                                <Backup public_ip={wan_ip} />
                            </TabPanel>
                        </div>
                    </GridItem>
                </GridContainer>
            </div>
            {demoAlert}
            {props.internetError !== null ? <ErrorAlert message={props.internetError} /> : null}
            {props.ipTrackingError !== null ? <ErrorAlert message={props.ipTrackingError} /> : null}
            {props.geoTrafficError !== null ? <ErrorAlert message={props.geoTrafficError} /> : null}
            {props.ipsContributorError !== null ? <ErrorAlert message={props.ipsContributorError} /> : null}
        </>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth_reducer.token,
        instancesList: state.customerZoomView.intances_list,
        vmInfo: state.customerZoomView.vm_infos,
        lanIps: state.customerZoomView.lan_ips,
        loader: state.customerZoomView.loading,
        lanip: state.customerZoomView.lan_ip,
        zoomViewError: state.customerZoomView.zoom_view_error,
        graphloader: state.customerZoomView.graphsLoading,

        internetError: state.customerZoomView.internetChartError,
        ipTrackingError: state.customerZoomView.exernalIp_error,
        topAppError: state.customerZoomView.ipApp_error,
        geoTrafficError: state.customerZoomView.ipCity_error,
        ipsContributorError: state.customerZoomView.ispCont_error,


        notificationsError: state.customerCommon.notifications_error_msg,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdatingZoomView: (token, from, to, lanip, wanip) => dispatch(action.fetchWithTimeSpan(token, from, to, lanip, wanip)),
        onFetchingZVInstances: (token, from, to, lip, wip) => dispatch(action.fetchZoomViewInstances(token, from, to, lip, wip)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ZoomView);
