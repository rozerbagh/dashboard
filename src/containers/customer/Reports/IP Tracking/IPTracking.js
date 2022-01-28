import React, { useState, useEffect, useMemo } from 'react';

import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// ui components
import * as CustomButtons from "../../../../components/CustomButtons/CustomButtons";
import Breadcrumbs from '../../../../components/UI/Breadscrumbs/Breadscrumbs'
import Card from "../../../../components/Card/Card";
import Loader from "../../../../components/UI/Loader/Loader";
import ErrorAlert from '../../../../components/Alerts/Error/Error';
import Redirection from '../../../../components/Alerts/Alert/Modal';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import WarningAlert from '../../../../components/Alerts/Warning/Warn'
import IPTrackingTable from './IPTrackingTable';
import DateTime from '../../../../components/UI/DateTimePicker/DateTime';
import SelectInput from '../../../../components/UI/SelectInput/SelectInput';
import * as formatter from "../../../../components/Functions/Formatter";
// redux actions
import * as action from "../../../../store/actions/customer/index";

const DateWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.3rem;
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
        label: "IP Tracking",
        link: null,
        subroutes: [],
    }
]

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
    },
    marginTop10: {
        marginTop: "10px"
    }
}))
const IpTracking = React.memo((props) => {
    const classes = useStyles();

    const [externalIpList, setExternalIpList] = useState([]);
    const [ips, setIps] = useState([]);
    const [firstRun, setFirstRun] = useState(true);

    const [toDates, setToDate] = useState(new Date());
    const [fromDates, setFromDate] = useState(new Date(toDates.getTime() - (15 * 60 * 1000)));

    const [fromTime, setFromTime] = useState(fromDates.getTime());
    const [toTime, setToTime] = useState(toDates.getTime());

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
    const fetchDataWithTiming = () => {
        setDemoAlert(<WarningAlert message="Demo Account" />)
        setTimeout(() => setDemoAlert(null), 5000)
        let ip = selectedValue;
        if (fromTime > toTime) {
            setError(error + 1);
            setTimeout(() => setError(0), 5000)
        } else {
            setError(0);
            if (selectedValue == '') {
                // props.onFetchingIPTrackingData(props.token, parseInt(fromTime / 1000), parseInt(toTime / 1000))
            } else {
                // props.onFetchingIPTrackingDataWithIP(props.token, parseInt(fromTime / 1000), parseInt(toTime / 1000), ip)
            }
        }
    }

    const handleSelectChange = (event) => {
        let ip = event.target.value;
        setSelectedValue(ip);
        setDefaultValue(ip)
        setDefaultName(ip);
        if (event.target.value == '' || event.target.value == 'All') {
            // props.onFetchingIPTrackingData(props.token, parseInt(fromTime / 1000), parseInt(toTime / 1000))
        } else {
            // props.onFetchingIPTrackingDataWithIP(props.token, parseInt(fromTime / 1000), parseInt(toTime / 1000), ip)
        }
        setDemoAlert(<WarningAlert message="Demo Account ip not applicable" />)
        setTimeout(() => setDemoAlert(null), 5000)

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

    useEffect(() => {
        let toDate = new Date();
        let to = Math.floor(toDate.getTime() / 1000);
        to = to * 1000;
        let from = to - (15 * 60 * 1000);
        props.onFetchingIPTrackingData(props.token, from / 1000, to / 1000);
        setFirstRun(true);
    }, []);

    useEffect(() => {
        const arr = [];
        let wanips = [];
        props.ipExternalIpList.map((listItem, index) => {

            for (var index in listItem.ip_data) {
                var nxt_i = index + 1;
                for (nxt_i in listItem.ip_data) {
                    if (listItem.ip_data[index].bandwidth > listItem.ip_data[nxt_i].bandwidth) {
                        let temp = listItem.ip_data[index];
                        listItem.ip_data[index] = listItem.ip_data[nxt_i];
                        listItem.ip_data[nxt_i] = temp;
                    }
                }
            }


            arr.push({
                wan_ip: listItem.wan_ip,
                ip_data: listItem.ip_data,
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
        setExternalIpList(arr);

    }, [props.ipExternalIpList]);

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
            }
            {demoAlert}
            <div className={classes.marginTop10}>
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
                    <div className={classes.runReport}>
                        <CustomButtons.MainPrimaryButton
                            variant="contained" disableElevation onClick={fetchDataWithTiming}
                            startIcon={<ReceiptOutlinedIcon />}>
                            Run Report
                        </CustomButtons.MainPrimaryButton>
                    </div>
                </DateWrapper>
                {props.loader ?
                    <div className={classes.loaderContainer}>
                        <Loader bigLoader style={{ margin: "0 auto" }} />
                    </div> : <div>
                        {externalIpList.map((list, i) => {
                            let ipTrackArr = [];
                            let total = 0;
                            let total_recived = 0;
                            let total_transmit = 0;
                            return <Card key={`${list.wan_ip}-external_ip-table-${i}`}>
                                {list.ip_data.map((ele, index) => {
                                    let recieved_bandwidth = formatter.formatBytes(ele.recived_bandwidth * 300);
                                    let transmit_bandwidth = formatter.formatBytes(ele.transmit_bandwidth * 300);
                                    let bandwidth = formatter.formatBytes(ele.bandwidth * 300);
                                    total = total + ele.bandwidth
                                    total_recived = total_recived + ele.recived_bandwidth
                                    total_transmit = total_transmit + ele.transmit_bandwidth
                                    ipTrackArr.push({
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
                                    rows={ipTrackArr}
                                    csvNo={i}
                                    fromdate={new Date(fromDates)}
                                    todate={new Date(toDates)}
                                    total={formatter.formatBytes(total * 300)}
                                    total_recieved={formatter.formatBytes(total_recived * 300)}
                                    total_transmit={formatter.formatBytes(total_transmit * 300)}
                                    total={false}
                                />

                            </Card>
                        })}
                        {error > 0 ? <ErrorAlert message="From date can not be more than to date" /> : null}
                    </div>}
            </div>
        </>
    )
})

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        ipExternalIpList: state.customerReports.ip_external_list,
        loader: state.customerReports.loading,
        error: state.customerReports.ip_external_error,

        lanIps: state.customerDashboard.userLANIPArr,
        wanIps: state.customerDashboard.userWANIPArr,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchingIPTrackingData: (token, from, to) => dispatch(action.fetchIPTrackingData(token, from, to)),
        onFetchingIPTrackingDataWithIP: (token, from, to, ip) => dispatch(action.fetchIPTrackingDataWithIP(token, from, to, ip)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IpTracking);


// index, i, ele.internal_ip, ele.external_ip, recieved_bandwidth, transmit_bandwidth, bandwidth