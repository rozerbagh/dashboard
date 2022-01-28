import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { Typography, InputLabel } from '@material-ui/core';
// core components
import Redirection from '../../../../components/Alerts/Alert/Modal';
import Card from "../../../../components/Card/Card";
import Loader from "../../../../components/UI/Loader/Loader";
import ErrorAlert from '../../../../components/Alerts/Error/Error';
import * as CustomButtons from "../../../../components/CustomButtons/CustomButtons";
import Breadcrumbs from '../../../../components/UI/Breadscrumbs/Breadscrumbs'
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import TopAppsTable from './TopAppsTable';

import SelectInput from '../../../../components/UI/SelectInput/SelectInput';
import DateTime from '../../../../components/UI/DateTimePicker/DateTime';
import * as formatter from "../../../../components/Functions/Formatter";
import WarningAlert from '../../../../components/Alerts/Warning/Warn'
import * as action from "../../../../store/actions/customer/index";

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
        label: "Top Apps",
        link: null,
        subroutes: [],
    }
]
const DateWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.3rem;
`;

const SuccessBtn = styled.button`
    outline: none;
    border: none;
    background-color: #31E8A9;
    padding: 0.3rem 0.9rem;;
    font-size: 1rem;
    color:#ffffff;
    margin: 0.1rem 0.5rem;
    border-radius: 5px;
    cursor: pointer;
`;

const ConfirmButtons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
`;

const ConfirmAlertText = styled.p`
    font-size: 1rem;
    text-align: center;
`;

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


function TopApps(props) {
    const classes = useStyles();

    const [firstRun, setFirstRun] = useState(true);
    const [ipAppData, setIpAppData] = useState([]);
    const [ips, setIps] = useState([]);

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
            // console.log('from:', date.getTime());
        } else {
            setToDate(date);
            setToTime(date.getTime());
            // console.log('to:', date);
        }
    }

    const [error, setError] = useState(0);
    const [demoAlert, setDemoAlert] = useState(null);
    const fetchDataWithTiming = () => {
        setDemoAlert(<WarningAlert message="Demo Account ip not applicable" />)
        setTimeout(() => setDemoAlert(null), 5000)
        let ip = selectedValue;
        if (fromTime > toTime) {
            setError(error + 1);
            setTimeout(() => setError(0), 5000)
        } else {
            setError(0);
            if (selectedValue == '') {
                // props.onFetchingTopAppsData(props.token, parseInt(fromTime / 1000), parseInt(toTime / 1000))
            } else {
                // props.onFetchingTopAppsDataWithIP(props.token, parseInt(fromTime / 1000), parseInt(toTime / 1000), ip)
            }
        }
    }

    const handleSelectChange = (event) => {
        setDemoAlert(<WarningAlert message="Demo Account ip not applicable" />)
        setTimeout(() => setDemoAlert(null), 5000)
        let ip = event.target.value;
        setSelectedValue(ip);
        setDefaultValue(ip)
        setDefaultName(ip)
        if (event.target.value == '' || event.target.value == 'All') {
            // props.onFetchingTopAppsData(props.token, parseInt(fromTime / 1000), parseInt(toTime / 1000))
        } else {
            // props.onFetchingTopAppsDataWithIP(props.token, parseInt(fromTime / 1000), parseInt(toTime / 1000), ip)
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

    useEffect(() => {
        let toDate = new Date();
        let to = Math.floor(toDate.getTime() / 1000);
        to = to * 1000;
        let from = to - (15 * 60 * 1000);
        props.onFetchingTopAppsData(props.token, from / 1000, to / 1000);
        setFirstRun(true);
    }, []);

    useEffect(() => {
        const arr = [];
        let wanips = [];
        props.ipAppsList.map((listItem, index) => {

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

        // for (var k = 0; k < arr.length; k++) {
        //     for (var j = k + 1; j < arr.length; j++) {
        //         if (arr[k].bandwidth < arr[j].bandwidth) {
        //             let tempObj = arr[k];
        //             arr[k] = arr[j];
        //             arr[j] = tempObj;
        //         }
        //     }
        // }
        setIpAppData(arr);

    }, [props.ipAppsList]);


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
                        {
                            ipAppData.map((list, i) => {
                                let ipTrackArr = [];
                                let total = 0;
                                let total_recived = 0;
                                let total_transmit = 0;
                                return <Card key={`${list.wan_ip}-top_apps-table-${i}`}>
                                    {list.ip_data.map((ele, index) => {
                                        let recieved_bandwidth = formatter.formatBytes(ele.recived_bandwidth * 300);
                                        let transmit_bandwidth = formatter.formatBytes(ele.transmit_bandwidth * 300);
                                        let bandwidth = formatter.formatBytes(ele.bandwidth * 300);
                                        total = total + ele.bandwidth
                                        total_recived = total_recived + ele.recived_bandwidth
                                        total_transmit = total_transmit + ele.transmit_bandwidth
                                        ipTrackArr.push({
                                            id: Math.random().toString(),
                                            app: ele.label,
                                            active_conn: ele.active_conn_count,
                                            total_conn: ele.conn_count,
                                            recived_bandwidth: recieved_bandwidth,
                                            transmit_bandwidth: transmit_bandwidth,
                                            bandwidth: bandwidth,
                                        })
                                    })}
                                    <TopAppsTable wan_ip={list.wan_ip} rows={ipTrackArr}
                                        csvNo={i + 1}
                                        fromdate={new Date(fromDates)}
                                        todate={new Date(toDates)}
                                        total={formatter.formatBytes(total * 300)}
                                        total_recieved={formatter.formatBytes(total_recived * 300)}
                                        total_transmit={formatter.formatBytes(total_transmit * 300)}
                                        total={false}
                                    />
                                </Card>
                            })
                        }
                        {error > 0 ? <ErrorAlert message="From date can not be more than to date" /> : null}
                    </div>}
            </div>
        </>
    )

}

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        ipAppsList: state.customerReports.ip_apps_list,
        loader: state.customerReports.loading,
        error: state.customerReports.ip_app_error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchingTopAppsData: (token, from, to) => dispatch(action.fetchTopAppsData(token, from, to)),
        onFetchingTopAppsDataWithIP: (token, from, to, ip) => dispatch(action.fetchTopAppsDataWithIP(token, from, to, ip)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopApps);
