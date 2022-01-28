import React, { useState, useEffect } from 'react'
import { CSVLink } from "react-csv";
// @material/core components
import Grid from "@material-ui/core/grid";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Tabs from '@material-ui/core/Tabs';
import Tab from "@material-ui/core/Tab";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import DateTime from '../../../../components/UI/DateTimePicker/DateTime';
import * as formatter from '../../../../components/Functions/Formatter';
import Loader from "../../../../components/UI/Loader/Loader";
import CloudConnectGraph from '../../../../components/Monitor/CloudConnectGraph';
import * as Buttons from '../../../../components/CustomButtons/CustomButtons'
import { FaFileCsv } from "react-icons/fa";
import CloudConnectRow from './EachCloudConnectRow';
import CloudConnectInternalhostRow from './CloudConnectInternalhost'

function TabPanel(props) {
    const { children,
        value, index,
        ...rest } = props;

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
export default function CloudConnectsTAble(props) {
    const {
        staticContext,
        openCCForm,
        selectHostanme,
        ccdata,
        ccgraph,
        ccinternalhost,
        ccintext,
        sidebarSize,
        graphLoader,
        intextloader,
        fetchInternalToExternal,
        updateUsagePanel,
        graphTime,
        graphReceived,
        graphTransmitted,
        handleEditCloudConnects,
        ...rest
    } = props;

    const [macaddress, setMacAdress] = useState('');
    const [ipaddress, setIPAddress] = useState('');

    const [openDate, setOpenDate] = useState(false);
    const [timeInterval, setTimeInterval] = useState(60);

    const [selctedHostname, setSelectedHostname] = useState('');
    const [chartWidth, setchartWidth] = useState(window.innerWidth / 2)

    const [tabValue, setTabValue] = useState(0);
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const [currTooltipIndex, setCurrTooltipIndex] = useState(-1);
    const handleActionClick = (event, i) => {
        i === currTooltipIndex ? setCurrTooltipIndex(-1) : setCurrTooltipIndex(i);
    }
    const handleCloseTooltipAction = () => {
        setCurrTooltipIndex(-1);
    }

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

    const handleTimeIntervalChange = (event) => {
        const selectedTime = parseInt(event.target.value);
        if (selectedTime == 0) {
            const fro = formatter.getTodayFromTo().from
            const too = formatter.getTodayFromTo().to
            setOpenDate(false)
            submitTimespan(fro, too)
            setFromTime(fro)
            setToTime(too)
        } else if (selectedTime == 1) {
            const fro = formatter.getYesterdayFromTo().from
            const too = formatter.getYesterdayFromTo().to
            setOpenDate(false)
            setFromTime(fro)
            setToTime(too)
        } else if (selectedTime == -1) {
            const fro = fromTime
            const too = toTime
            setOpenDate(true)
            setFromTime(fro)
            setToTime(too)
        } else {
            const too = new Date().getTime();
            const fro = too - (selectedTime * 60 * 1000);
            setOpenDate(false)
            submitTimespan(fro, too)
            setFromTime(fro)
            setToTime(too)
        }
        setTimeInterval(parseInt(selectedTime));


    };

    const handleHostnameChange = (e) => {
        let selctedHostname = e.target.value;
        const mac_address = selctedHostname.split('-')[0];
        const ip_address = selctedHostname.split('-')[1];
        setSelectedHostname(e.target.value);
        setMacAdress(mac_address)
        setIPAddress(ip_address);

        updateUsagePanel(fromTime, toTime, mac_address, ip_address)
    }

    const submitTimespan = (from, to) => {
        updateUsagePanel(from, to, macaddress, ipaddress)
    }

    useEffect(() => {
        if (ccdata.length > 0) {
            setMacAdress(ccdata[0].mac_addr)
            setIPAddress(ccdata[0].ip_addr)
        } else {

        }
    }, [ccdata])


    useEffect(() => {
        if (ccgraph !== {} && ccgraph !== undefined && ccgraph !== null) {
            setchartWidth(document.getElementById('cc-chart').getBoundingClientRect().width - sidebarSize - 10);
        }
    }, [ccgraph, sidebarSize]);
    const [currInternalhostIndex, setCurrInternalhostIndex] = useState(-1)
    const handleInternalToExternal = (e, ip, i) => {
        if (i === currInternalhostIndex) {

        } else {
            fetchInternalToExternal(ip);
        }
        i === currInternalhostIndex ? setCurrInternalhostIndex(-1) : setCurrInternalhostIndex(i)
    }

    const handleEditCC = (e, rowData) => {
        handleEditCloudConnects(e, rowData);
    }

    return (
        <>
            <Tabs
                value={tabValue}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Configuration" fullWidth={false} />
                <Tab label="Usage" fullWidth={false} />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
                <div className="flex-width">
                    <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                        <Typography variant="caption">Cloud Connect</Typography>
                        <div>
                            <Buttons.MainPrimaryButton
                                onClick={openCCForm}
                            >
                                Add
                            </Buttons.MainPrimaryButton>
                            <CSVLink data={ccdata}
                                filename={`Cloud_connect.csv`}>
                                <IconButton color="primary" size="small">
                                    <FaFileCsv style={{ color: "#007bff", fontSize: "1.5em", }} />
                                </IconButton>
                            </CSVLink>
                        </div>
                    </div>
                    <div className="cloud_connect_row">
                        <div className="center-text font500">State</div>
                        <div className="font500">Label</div>
                        <div className="font500">CIDR</div>
                        <div className="font500">TAG</div>
                        <div className="font500">Router IP</div>
                        <div className="font500">Router MAC</div>
                        <div className="font500">VLAN</div>
                        <div className="center-text font500">Bandwidth Size</div>
                        <div className="font500">Location A</div>
                        <div className="font500">Location B</div>
                        <div className="font500">Circuit ID</div>
                        <div className="font500">Action</div>
                    </div>
                    {ccdata.map((row, index) => (
                        <CloudConnectRow
                            key={`cloud-connect-${index}`}
                            currTooltipIndex={currTooltipIndex}
                            row={row}
                            index={index}
                            handleActionClick={(e) => handleActionClick(e, index)}
                            handleCloseTooltipAction={handleCloseTooltipAction}
                            handleEdit={(e) => handleEditCC(e, row)}
                        />
                    ))}
                </div>

            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <Grid container>
                    <Grid item xs={12} sm={3} md={4}>
                        <FormControl variant="outlined">
                            {/* <InputLabel htmlFor="outlined-hostname">Hostname</InputLabel> */}
                            <Select
                                native
                                value={selctedHostname}
                                onChange={handleHostnameChange}
                                inputProps={{
                                    name: 'hostname',
                                    id: 'outlined-hostname',
                                }}
                            >
                                {ccdata.map(ele => {
                                    return ele.hostname === "FO NSE EX" ? <option defaultValue selectedkey={`hostname-opt-${ele.id}`}
                                        value={`${ele.mac_addr}-${ele.ip_addr}`}>
                                        {ele.hostname}</option> : <option disabled
                                            key={`hostname-opt-${ele.id}`}
                                            value={`${ele.mac_addr}-${ele.ip_addr}`}>
                                        {ele.hostname}
                                    </option>
                                })}

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}></Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        {openDate ? <div className="flex-display left-margin flex-center">
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
                            <div className="right-margin">
                                <Buttons.MainPrimaryButton
                                    onClick={() => submitTimespan(fromTime, toTime)}
                                >
                                    submit
                                </Buttons.MainPrimaryButton>
                            </div>
                        </div> : <Grid item xs={12} sm={3} md={6}></Grid>}
                        <FormControl variant="outlined">
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
                                <option value={15} disabled>15 min</option>
                                <option value={30} disabled>30 min</option>
                                <option value={60} defaultValue selected>1 hr</option>
                                <option value={120} disabled>2 hr</option>
                                <option value={0} disabled>Today</option>
                                <option value={1} disabled>Yesterady</option>
                                <option value={-1} disabled>Custom</option>

                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        {graphLoader ? <div className="loaderContainer">
                            <Loader bigLoader style={{ margin: "0 auto" }} />
                        </div> : <CloudConnectGraph
                            time_str={graphTime}
                            recived={graphReceived}
                            transmit={graphTransmitted}
                            chartWidth={chartWidth}
                        />}
                    </Grid>
                    <span className="padding-vert"></span>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className="flex-width">
                            <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                                <Typography variant="caption">Internal Host</Typography>
                                <div>
                                    <CSVLink data={ccinternalhost}
                                        filename={`Cloud_Connect_Internalhost.csv`}>
                                        <IconButton color="primary" size="small">
                                            <FaFileCsv style={{ color: "#007bff", fontSize: "1.5em", }} />
                                        </IconButton>
                                    </CSVLink>
                                </div>
                            </div>
                            <div className="four_row">
                                <div className="font500">IP</div>
                                <div className="font500">Transmitted</div>
                                <div className="font500">Received</div>
                                <div className="font500">Total</div>
                            </div>
                            {graphLoader ? <div>Loading..</div> :
                                ccinternalhost.map((row, index) => (
                                    <CloudConnectInternalhostRow
                                        key={index}
                                        row={row}
                                        index={index}
                                        currInternalhostIndex={currInternalhostIndex}
                                        handleClick={handleInternalToExternal}
                                        dropdowndata={ccintext}
                                        int_ext_loader={intextloader}
                                    />)
                                )
                            }
                        </div>
                    </Grid>
                </Grid>

            </TabPanel>

        </>)
}
