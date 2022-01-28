import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styled from 'styled-components'
import { makeStyles, TextField, ClickAwayListener } from "@material-ui/core";
// core components
import Card from "../../../../components/Card/Card.js";
import * as CustomButtons from "../../../../components/CustomButtons/CustomButtons";
import Loader from "../../../../components/UI/Loader/Loader";
import Breadcrumbs from '../../../../components/UI/Breadscrumbs/Breadscrumbs'
import ErrorAlert from '../../../../components/Alerts/Error/Error';
import BandwidthTable from './BandwidthTable';
import DateTime from '../../../../components/UI/DateTimePicker/DateTime';
import Redirection from '../../../../components/Alerts/Alert/Modal';
import * as formatter from "../../../../components/Functions/Formatter";
import * as IO from 'react-icons/io';
import * as action from "../../../../store/actions/customer/index";
import WarningAlert from '../../../../components/Alerts/Warning/Warn';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';

const ReportButton = styled.div`
    max-height: 50px;
    padding: 0.5em;
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
    }
}));

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
        label: "Bandwidth",
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

function Bandwidth(props) {
    const classes = useStyles();

    const [ipList, setIpList] = useState([]);

    const [toDates, setToDate] = useState(new Date());
    const [fromDates, setFromDate] = useState(new Date(toDates.getTime() - (15 * 60 * 1000)));

    const [fromTime, setFromTime] = useState(fromDates.getTime());
    const [toTime, setToTime] = useState(toDates.getTime());

    const [total, setTotal] = useState(null)
    const [received, setRecieved] = useState(null)
    const [transmit, setTransmit] = useState(null)
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
        // if (fromTime > toTime) {
        //     setError(error + 1);
        //     setTimeout(() => setError(0), 5000)
        // } else {
        //     setError(0);
        //     props.onFetchingBandwidthData(props.token, parseInt(fromTime / 1000), parseInt(toTime / 1000));
        // }
        setDemoAlert(<WarningAlert message="Demo Account" />)
        setTimeout(() => setDemoAlert(null), 5000)
    }

    useEffect(() => {
        let toDate = new Date();

        let to = Math.floor(toDate.getTime() / 1000);
        to = to * 1000;

        let from = to - (15 * 60 * 1000);

        const fromT = parseInt(fromTime / 1000);
        const toT = parseInt(toTime / 1000);
        props.onFetchingBandwidthData(props.token, from / 1000, to / 1000);
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
        let total = 0;
        let total_recived = 0;
        let total_transmit = 0;
        props.ipDataList.map((listItem, index) => {
            let recieved_bandwidth = formatter.formatBytes(listItem.recived_bandwidth * 300);
            let transmit_bandwidth = formatter.formatBytes(listItem.transmit_bandwidth * 300);
            let bandwidth = formatter.formatBytes(listItem.bandwidth * 300);

            total = total + listItem.bandwidth
            total_recived = total_recived + listItem.recived_bandwidth
            total_transmit = total_transmit + listItem.transmit_bandwidth
            ipLists.push({
                id: Math.random().toString(),
                label: listItem.label,
                ip: listItem.ip,
                recived_bandwidth: recieved_bandwidth,
                transmit_bandwidth: transmit_bandwidth,
                bandwidth: bandwidth,
            })
        })
        setTotal(formatter.formatBytes(total * 300));
        setRecieved(formatter.formatBytes(total_recived * 300));
        setTransmit(formatter.formatBytes(total_transmit * 300));
        setIpList(ipLists)
    }, [props.ipDataList])

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

                    <ReportButton>
                        <CustomButtons.MainPrimaryButton
                            variant="contained" disableElevation onClick={RunReport}
                            startIcon={<ReceiptOutlinedIcon />}>
                            Run Report
                        </CustomButtons.MainPrimaryButton>
                    </ReportButton>
                </DateWrapper>
                {/* <Picker onSave={(date, time) => onSave(date, time)} enableSecond /> */}
                {/* <form>
                        <div>
                            <TextField
                                label="From Date & time"
                                variant="outlined"
                                size="small"
                                type="text"
                                value={mo.m.format('llll')}
                                readOnly
                                onClick={handleShowFromDateTime} />

                            <TextField
                                label="From Date & time"
                                variant="outlined"
                                size="small"
                                type="text"
                                value={mo.m.format('llll')}
                                readOnly
                                onClick={handleShowFromDateTime} />
                        </div>
                        {showFromDateTime ?
                            <ClickAwayListener onClickAway={() => setShowFromDateTime(false)}>
                                <InputMoment
                                    moment={mo.m}
                                    onChange={handleChange}
                                    minStep={1}
                                    onSave={handleSave}
                                    prevMonthIcon={<IO.IoIosArrowBack />}
                                    nextMonthIcon={<IO.IoIosArrowForward />}
                                />
                            </ClickAwayListener> : null}
                    </form> */}
                {props.loader ?
                    <div className={classes.loaderContainer}>
                        <Loader bigLoader style={{ margin: "0 auto" }} />
                    </div> :
                    <Card>
                        <BandwidthTable rows={ipList}
                            fromdate={new Date(fromDates)}
                            todate={new Date(toDates)}
                            total={total}
                            total_recieved={received}
                            total_transmit={transmit}
                            total={false}
                        />
                    </Card>}
                {demoAlert}
                {error > 0 ? <ErrorAlert message="From date can not be more than to date" /> : null}
            </>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        ipDataList: state.customerReports.ip_data_list,
        loader: state.customerReports.loading,
        error: state.customerReports.ip_data_error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchingBandwidthData: (token, from, to) => dispatch(action.fetchBandwidthData(token, from, to)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bandwidth);
