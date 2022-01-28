import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styled from 'styled-components'

// import Picker from 'react-datetime-slider-picker';
// import '../../../../components/UI/DateTimePicker/styles.css';
// import InputMoment from '../../../../components/UI/DateTimePicker/InputMoment';
// import moment from 'moment';

// @material-ui/core components
import { makeStyles, TextField, ClickAwayListener } from "@material-ui/core";
// core components
import Card from "../../../../components/Card/Card.js";
import * as CustomButtons from "../../../../components/CustomButtons/CustomButtons";
import Breadcrumbs from '../../../../components/UI/Breadscrumbs/Breadscrumbs'
import Loader from "../../../../components/UI/Loader/Loader";
import ErrorAlert from '../../../../components/Alerts/Error/Error';
import BandwidthTable from '../Bandwidth/BandwidthTable';
import IPTrackingTable from '../IP Tracking/IPTrackingTable';
import TopAppsTable from '../Top Apps/TopAppsTable';
import GeoTrafficTable from '../Geo Traffic/GeoTrafficTable';
import Redirection from '../../../../components/Alerts/Alert/Modal';
import DateTime from '../../../../components/UI/DateTimePicker/DateTime';
import SelectInput from '../../../../components/UI/SelectInput/SelectInput';
import * as formatter from "../../../../components/Functions/Formatter";
import * as IO from 'react-icons/io';
import * as action from "../../../../store/actions/customer/index";
import WarningAlert from '../../../../components/Alerts/Warning/Warn'
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';


const useStyles = makeStyles(theme => ({
    loaderContainer: {
        position: "relative",
        margin: "0 auto",
        width: "500px",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    runReport: {
        maxHeight: "50px"
    }
}));

const DateWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.3rem;
`;

const ReportButton = styled.div`
    max-height: 50px;
    padding: 0.5em;
`;

const subroutes = [
    {
        label: "Home",
        link: "/coc/dashboard",
        subroutes: [],
    },
    {
        label: "Report",
        link: "/coc/reports/bandwidth",
        subroutes: [
            { label: 'Bandwidth', link: "/coc/reports/bandwidth" },
            { label: 'IP Tracking', link: "/coc/reports/ip_tracking" },
            { label: 'Top Apps', link: "/coc/reports/top_apps" },
            { label: 'Geo Traffic', link: "/coc/reports/geo_traffic" },
            { label: 'Summary Report', link: "/coc/reports/ip_report" },
        ]
    },
    {
        label: "IP Report",
        link: null,
        subroutes: [],
    }
]

function BandwidthReport(props) {
    const classes = useStyles();

    const [ipList, setIpList] = useState([]);
    const [ipReportList, setIpReportList] = useState([]);

    const [toDates, setToDate] = useState(new Date());
    const [fromDates, setFromDate] = useState(new Date(toDates.getTime() - (15 * 60 * 1000)));

    const [fromTime, setFromTime] = useState(fromDates.getTime());
    const [toTime, setToTime] = useState(toDates.getTime());

    const [ips, setIps] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [defaultValue, setDefaultValue] = useState('');
    const [defaultName, setDefaultName] = useState('All');

    const handleDateTime = (date, type) => {
        if (type === "from") {
            setFromDate(date)
            setFromTime(date.getTime())
        } else {
            setToDate(date);
            setToTime(date.getTime());
        }
    }

    const [error, setError] = useState(0);
    const [demoAlert, setDemoAlert] = useState(null);
    const RunReport = () => {
        setDemoAlert(<WarningAlert message="Demo Account" />)
        setTimeout(() => setDemoAlert(null), 5000)
        if (fromTime > toTime) {
            setError(error + 1);
            setTimeout(() => setError(0), 5000)
        } else {
            setError(0);
            // props.onFetchingIPReportData(props.token, parseInt(fromTime / 1000), parseInt(toTime / 1000));
        }
    }

    useEffect(() => {
        let toDate = new Date();

        let to = Math.floor(toDate.getTime() / 1000);
        to = to * 1000;

        let from = to - (15 * 60 * 1000);

        const fromT = parseInt(fromTime / 1000);
        const toT = parseInt(toTime / 1000);
        props.onFetchingIPReportData(props.token, from / 1000, to / 1000);
    }, []);

    useEffect(() => {
        let ipLists = [];

        for (var index in props.ipDataList) {
            var nxt_i = index + 1;
            for (nxt_i in props.ipDataList) {
                if (props.ipDataList[index].bandwidth > props.ipDataList[nxt_i].bandwidth) {
                    let temp = props.ipDataList[index];
                    props.ipDataList[index] = props.ipDataList[nxt_i];
                    props.ipDataList[nxt_i] = temp;
                }
            }
        }
        props.ipDataList.map((listItem, index) => {
            let recieved_bandwidth = formatter.formatBytes(listItem.recived_bandwidth * 300);
            let transmit_bandwidth = formatter.formatBytes(listItem.transmit_bandwidth * 300);
            let bandwidth = formatter.formatBytes(listItem.bandwidth * 300);
            ipLists.push({
                id: Math.random().toString(),
                label: listItem.label,
                ip: listItem.ip,
                recived_bandwidth: recieved_bandwidth,
                transmit_bandwidth: transmit_bandwidth,
                bandwidth: bandwidth,
            })
        })
        setIpList(ipLists)
    }, [props.ipDataList])

    useEffect(() => {
        const arr = [];
        let wanips = [];
        props.ipReportDataList.map((listItem, index) => {

            for (var index in listItem.external_ip_report) {
                var nxt_i = index + 1;
                for (nxt_i in listItem.external_ip_report) {
                    if (listItem.external_ip_report[index].bandwidth > listItem.external_ip_report[nxt_i].bandwidth) {
                        let temp = listItem.external_ip_report[index];
                        listItem.external_ip_report[index] = listItem.external_ip_report[nxt_i];
                        listItem.external_ip_report[nxt_i] = temp;
                    }
                }
            }

            for (var index in listItem.app_report) {
                var nxt_i = index + 1;
                for (nxt_i in listItem.app_report) {
                    if (listItem.app_report[index].bandwidth > listItem.app_report[nxt_i].bandwidth) {
                        let temp = listItem.app_report[index];
                        listItem.app_report[index] = listItem.app_report[nxt_i];
                        listItem.app_report[nxt_i] = temp;
                    }
                }
            }


            for (var index in listItem.geo_report) {
                var nxt_i = index + 1;
                for (nxt_i in listItem.geo_report) {
                    if (listItem.geo_report[index].bandwidth > listItem.geo_report[nxt_i].bandwidth) {
                        let temp = listItem.geo_report[index];
                        listItem.geo_report[index] = listItem.geo_report[nxt_i];
                        listItem.geo_report[nxt_i] = temp;
                    }
                }
            }

            arr.push({
                wan_ip: listItem.wan_ip,
                external_ip: listItem.external_ip_report,
                ip_apps: listItem.app_report,
                ip_cities: listItem.geo_report,
            });
        });
        let ips = JSON.parse(sessionStorage.getItem('wanips'));
        if (selectedValue != '') {
            wanips.push('All');
            ips.map(ele => {
                if (ele != '') {
                    if (selectedValue != ele) {
                        wanips.push(ele)
                    }
                }

            });
            setIps(wanips);
        } else {
            ips.map(ele => {
                if (ele != '') {
                    wanips.push(ele)
                }
            });
            setIps(wanips);
        }
        setIpReportList(arr);
        setSelectedValue('')
    }, [props.ipReportDataList]);

    const handleSelectChange = (event) => {
        let ip = event.target.value;
        setSelectedValue(ip);
        setDefaultValue(ip)
        setDefaultName(ip);
        setDemoAlert(<WarningAlert message="Demo Account ip not applicable" />)
        setTimeout(() => setDemoAlert(null), 5000)
        if (event.target.value == '' || event.target.value == 'All') {
            // props.onFetchingIPReportData(props.token, parseInt(fromTime / 1000), parseInt(toTime / 1000))
        } else {
            // props.onFetchingIPReportDataWithIP(props.token, parseInt(fromTime / 1000), parseInt(toTime / 1000), ip)
        }

        const wanips = [];
        let ips = JSON.parse(sessionStorage.getItem('wanips'));
        if (selectedValue != '') {
            wanips.push('All');
            ips.map(ele => {
                if (ele != '') {
                    if (selectedValue != ele) {
                        wanips.push(ele)
                    }
                }

            });
            setIps(wanips);
        } else {
            ips.map(ele => {
                if (ele != '') {
                    wanips.push(ele)
                }
            });
            setIps(wanips);
        }
    }


    return (
        <>
            <Breadcrumbs links={subroutes} />
            {props.error === 'logout' ? <Redirection
                linkRoute="/logout"
                bodyText="Other session is active and you are logged out. Please login again."
                btnText="Ok" /> :
                props.error === 'Your roles have been updated. Login again.' ? <Redirection
                    linkRoute="/logout"
                    bodyText="Your roles have been updated. Login again."
                    btnText="Ok" /> :
                    props.error !== null ||
                        props.error !== 'Your roles have been updated. Login again.' ||
                        props.error !== 'logout' ? null :
                        <ErrorAlert message={props.error} />
            }<>
                {demoAlert}
                <br />
                <DateWrapper>
                    <div className="flex-display left-margin">
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
                    </div>
                    <SelectInput
                        label="Public IP"
                        selectName="Public IP"
                        handleChange={(event) => handleSelectChange(event)}
                        valuesArr={ips}
                        defaultValue={defaultValue}
                        defaultNameValue={defaultName}
                        value={selectedValue} />

                    <ReportButton>
                        <CustomButtons.MainPrimaryButton
                            variant="contained" disableElevation onClick={RunReport}
                            startIcon={<ReceiptOutlinedIcon />}>
                            Run Report
                        </CustomButtons.MainPrimaryButton>
                    </ReportButton>
                </DateWrapper>
                {props.loader ?
                    <div className={classes.loaderContainer}>
                        <Loader bigLoader style={{ margin: "0 auto" }} />
                    </div> :
                    <Card>
                        <BandwidthTable rows={ipList}
                            fromdate={new Date(fromDates)}
                            todate={new Date(toDates)}
                            total={false}
                            key="bandwidthh-data"
                        />
                    </Card>}
                {props.loader ?
                    <div className={classes.loaderContainer}>
                        <Loader bigLoader style={{ margin: "0 auto" }} />
                    </div> : ipReportList.map((list, i) => {
                        let externalIP = [];
                        let ipApps = [];
                        let ipCities = [];
                        return <>
                            <Card key={`${list.wan_ip}-external_ip-table-${i}`}>
                                {list.external_ip.map((ele, index) => {
                                    let recieved_bandwidth = formatter.formatBytes(ele.recived_bandwidth * 300);
                                    let transmit_bandwidth = formatter.formatBytes(ele.transmit_bandwidth * 300);
                                    let bandwidth = formatter.formatBytes(ele.bandwidth * 300);
                                    externalIP.push({
                                        id: Math.random().toString(),
                                        internal_ip: ele.internal_ip,
                                        external_ip: ele.external_ip,
                                        recived_bandwidth: recieved_bandwidth,
                                        transmit_bandwidth: transmit_bandwidth,
                                        bandwidth: bandwidth,
                                    })
                                })}
                                <IPTrackingTable
                                    wan_ip={list.wan_ip}
                                    rows={externalIP}
                                    csvNo={i}
                                    fromdate={new Date(fromDates)}
                                    todate={new Date(toDates)}
                                    total={false}
                                />

                            </Card>
                            <Card key={`${list.wan_ip}-top_apps-table-${i}`}>
                                {list.ip_apps.map((ele, index) => {
                                    let recieved_bandwidth = formatter.formatBytes(ele.recived_bandwidth * 300);
                                    let transmit_bandwidth = formatter.formatBytes(ele.transmit_bandwidth * 300);
                                    let bandwidth = formatter.formatBytes(ele.bandwidth * 300);
                                    ipApps.push({
                                        id: Math.random().toString(),
                                        app: ele.label,
                                        active_conn: ele.active_conn_count,
                                        total_conn: ele.conn_count,
                                        recived_bandwidth: recieved_bandwidth,
                                        transmit_bandwidth: transmit_bandwidth,
                                        bandwidth: bandwidth,
                                    })
                                })}
                                <TopAppsTable wan_ip={list.wan_ip}
                                    rows={ipApps}
                                    csvNo={i + 1}
                                    fromdate={new Date(fromDates)}
                                    todate={new Date(toDates)}
                                    total={false}
                                />
                            </Card>
                            <Card key={`${list.wan_ip}-ip_city-table-${i}`}>
                                {list.ip_cities.map((ele, index) => {
                                    let recieved_bandwidth = formatter.formatBytes(ele.recived_bandwidth * 300);
                                    let transmit_bandwidth = formatter.formatBytes(ele.transmit_bandwidth * 300);
                                    let bandwidth = formatter.formatBytes(ele.bandwidth * 300);
                                    ipCities.push({
                                        id: Math.random().toString(),
                                        label: ele.label,
                                        public_ip: ele.ip,
                                        country: ele.countryStr,
                                        state: ele.stateStr,
                                        city: ele.cityStr,
                                        recived_bandwidth: recieved_bandwidth,
                                        transmit_bandwidth: transmit_bandwidth,
                                        bandwidth: bandwidth,
                                    })
                                })}
                                <GeoTrafficTable wan_ip={list.wan_ip}
                                    rows={ipCities}
                                    csvNo={i}
                                    fromdate={new Date(fromDates)}
                                    todate={new Date(toDates)}
                                    total={false}
                                />
                            </Card>
                        </>
                    })}
                {error > 0 ? <ErrorAlert message="From date can not be more than to date" /> : null}
            </>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        ipDataList: state.customerReports.ip_data_list,
        ipReportDataList: state.customerReports.ip_report_data_list,
        loader: state.customerReports.loading,
        error: state.customerReports.ip_report_data_error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchingIPReportData: (token, from, to) => dispatch(action.fetchIPReportData(token, from, to)),
        onFetchingIPReportDataWithIP: (token, from, to, ip) => dispatch(action.fetchIPReportDataWithIP(token, from, to, ip)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BandwidthReport);
