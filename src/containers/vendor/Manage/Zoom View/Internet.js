import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import InternetLineGraph from '../../../../components/Monitor/Internet/InternetGraph';
import IPTrackingTable from '../../../../components/Monitor/Internet/ExternalIPTable';
import TopApps from '../../../../components/Monitor/Internet/IpAppsTable';
import GeoTraffic from '../../../../components/Monitor/Internet/IpCitiesTable';
import ISPContTable from '../../../../components/Monitor/Internet/ISPContTable';
import Loader from "../../../../components/UI/Loader/Loader";
import Card from "../../../../components/Card/Card";
import * as formatter from "../../../../components/Functions/Formatter";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        borderBottom: "1px solid #ccc",
        borderRadius: 0,
    },
    loaderContainer: {
        position: "relative",
        margin: "0 auto",
        width: "500px",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
});

const GraphImageBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 350px;
    width: 100%;
    justify-content: center;
    align-content: center;
    text-align: center;
`;

const BandwidthLabel = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0.5em 2rem;
    & p{
        margin: 0 1rem;
    }
`;
function createExtIpData(i, tn, internal_ip, external_ip, recived_bandwidth, transmit_bandwidth, bandwidth) {
    return { i, tn, internal_ip, external_ip, recived_bandwidth, transmit_bandwidth, bandwidth };
}

function createIpAppData(i, tn, app, active_conn, total_conn, recived_bandwidth, transmit_bandwidth, bandwidth) {
    return { i, tn, app, active_conn, total_conn, recived_bandwidth, transmit_bandwidth, bandwidth };
}

function createIpCityData(i, tn, label, public_ip, country, state, city, recived_bandwidth, transmit_bandwidth, bandwidth) {
    return { i, tn, label, public_ip, country, state, city, recived_bandwidth, transmit_bandwidth, bandwidth };
}

function createISPData(i, tn, label, total) {
    return { i, tn, label, total };
}

const Internet = (props) => {
    const classes = useStyles();

    const { instanceSideBar, adminSidebar, ...rest } = props;
    const [wrapperWidth, setWrapperWidth] = useState(window.innerWidth - 500);
    useEffect(() => {
        const adminSidebarSize = parseInt(sessionStorage.getItem('for_vendor_sidebar_size'))
        const cpuBoxWidth = document.getElementById('internet-details');
        if (cpuBoxWidth) {
            if (instanceSideBar === false && adminSidebarSize === 60) {
                setWrapperWidth(650);
            } else {
                setWrapperWidth(cpuBoxWidth.getBoundingClientRect().width - 30);
            }
        } else {
            setWrapperWidth(window.innerWidth - 500)
        }
    }, [instanceSideBar, adminSidebar])

    const [wanIP, setWanIP] = useState('')
    const [extIpState, setExtIPData] = useState([]);
    const [ipAppState, setIpAppData] = useState([]);
    const [ipCitiesState, setIpCitiesState] = useState([]);
    const [ispState, setISPState] = useState([]);

    useEffect(() => {
        const data = [];
        if (props.ipExternalIpList.length > 0) {
            props.ipExternalIpList.map((ele, index) => {
                let recieved_bandwidth = formatter.formatBytes(ele.recived_bandwidth * 300);
                let transmit_bandwidth = formatter.formatBytes(ele.transmit_bandwidth * 300);
                let bandwidth = formatter.formatBytes(ele.bandwidth * 300);
                return data.push(createExtIpData(index + 1, index + 1, ele.internal_ip, ele.external_ip, recieved_bandwidth, transmit_bandwidth, bandwidth))
            });
        } else {
            setExtIPData([]);
        }
        setExtIPData(data)
    }, [props.ipExternalIpList]);

    useEffect(() => {
        const data = [];
        if (props.ipAppsList.length > 0) {
            props.ipAppsList.map((ele, index) => {
                let recieved_bandwidth = formatter.formatBytes(ele.recived_bandwidth * 300);
                let transmit_bandwidth = formatter.formatBytes(ele.transmit_bandwidth * 300);
                let bandwidth = formatter.formatBytes(ele.bandwidth * 300);
                return data.push(createIpAppData(index + 1, index + 1, ele.label, ele.active_conn_count, ele.conn_count, recieved_bandwidth, transmit_bandwidth, bandwidth))
            });
        } else {
            setIpAppData([])
        }
        setIpAppData(data);
    }, [props.ipAppsList]);

    useEffect(() => {
        const data = [];
        if (props.ipCitiesList.length > 0) {
            props.ipCitiesList.map((ele, index) => {
                let recieved_bandwidth = formatter.formatBytes(ele.recived_bandwidth * 300);
                let transmit_bandwidth = formatter.formatBytes(ele.transmit_bandwidth * 300);
                let bandwidth = formatter.formatBytes(ele.bandwidth * 300);
                return data.push(createIpCityData(index + 1,
                    index + 1,
                    ele.label,
                    ele.ip,
                    ele.countryStr,
                    ele.stateStr,
                    ele.cityStr,
                    recieved_bandwidth,
                    transmit_bandwidth,
                    bandwidth))
            });
        } else {
            setIpCitiesState([])
        }
        setIpCitiesState(data)
    }, [props.ipCitiesList]);

    useEffect(() => {
        const data = [];
        if (props.ispCont.length > 0) {
            props.ispCont.map((ele, index) => {
                let total = formatter.formatBytes(ele.metric * 300);
                return data.push(createISPData(index + 1,
                    index + 1,
                    ele.label,
                    total))
            });
        } else {
            setISPState([]);
        }
        setISPState(data)
    }, [props.ispCont]);

    const [totalBandwidth, setTotalBandwidth] = useState([]);
    const [recivedBandwidth, setRecivedBandwidth] = useState([]);
    const [transmitBandwidth, setTransmitBandwidth] = useState([]);

    const [recivedMin, setRecivedMin] = useState('')
    const [recivedMax, setRecivedMax] = useState('')

    const [transmitMin, setTransmitMin] = useState('')
    const [transmitMMax, setTransmitMMax] = useState('')

    const [recivedAvg, setRecivedAvg] = useState('')
    const [transmitAvg, setTransmitAvg] = useState('')

    React.useMemo(() => {
        setRecivedMin(Math.min(...props.internet_recived));
        setRecivedMax(Math.max(...props.internet_recived));
        setTransmitMin(Math.min(...props.internet_transmit));
        setTransmitMMax(Math.max(...props.internet_transmit));

        var rSum = 0, tSum = 0;
        for (var i = 0; i < props.internet_recived.length; i++) {
            rSum += props.internet_recived[i];
        }
        for (var i = 0; i < props.internet_transmit.length; i++) {
            tSum += props.internet_transmit[i];
        }
        setRecivedAvg(rSum / props.internet_recived.length);
        setTransmitAvg(tSum / props.internet_transmit.length);


        setTotalBandwidth(props.internet_total)
        setRecivedBandwidth(props.internet_recived)
        setTransmitBandwidth(props.internet_transmit)
    }, [props.internet_total, props.internet_recived, props.internet_transmit]);

    useEffect(() => {
        setWanIP(props.wanip)
    }, [props.wanip])

    return (
        <div>
            {props.loader ? <div className={classes.loaderContainer}>
                <Loader bigLoader style={{ margin: "0 auto" }} />
            </div> :
                <div id="internet-details">
                    {totalBandwidth.length > 0 ?
                        <div style={{ marginLeft: "2rem", }}>
                            <InternetLineGraph
                                total={totalBandwidth}
                                recived={recivedBandwidth}
                                transmit={transmitBandwidth}
                                key={`internet-line-graph`}
                                time_str={props.time}
                                fullWidthChart={props.widthChanged}
                                tabValue={props.val}
                                chartWidth={wrapperWidth}
                            />
                            <BandwidthLabel>
                                <p>
                                    <strong>Tx Min: </strong>{formatter.formatBits(transmitMin)}
                                    <strong> Max: </strong>{formatter.formatBits(transmitMMax)}
                                    <strong> Avg: </strong>{formatter.formatBits(transmitAvg)}
                                </p>
                                <p>
                                    <strong>Rx Min: </strong>{formatter.formatBits(recivedMin)}
                                    <strong> Max: </strong>{formatter.formatBits(recivedMax)}
                                    <strong> Avg: </strong>{formatter.formatBits(recivedAvg)}
                                </p>
                            </BandwidthLabel>
                        </div> : <GraphImageBox>
                            <Typography variant="h6" style={{ zIndex: 2 }}>Internet bandwidth</Typography>
                            <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                        </GraphImageBox>
                    }

                    <Card key={`ext-ip-table`}>
                        <IPTrackingTable
                            rows={extIpState}
                            wan_ip={wanIP}
                        />
                    </Card>


                    <Card key={`ip-apps-table`}>
                        <TopApps
                            rows={ipAppState}
                            wan_ip={wanIP}
                        />
                    </Card>



                    <Card key={`ip-cities-table`}>
                        <GeoTraffic
                            rows={ipCitiesState}
                            wan_ip={wanIP}
                        />
                    </Card>


                    <Card key={`isp-conn-table`}>
                        <ISPContTable
                            rows={ispState}
                            wan_ip={wanIP}
                        />
                    </Card>
                </div>}
        </div>

    )
}

const mapStateToProps = state => {
    return {
        token: state.auth_reducer.token,

        loader: state.vendorZoomView.internetLoading,

        ipExternalIpList: state.vendorZoomView.externalIPData,
        ipAppsList: state.vendorZoomView.ipAppsData,
        ipCitiesList: state.vendorZoomView.ipCityData,
        ispCont: state.vendorZoomView.ispContData,
        wanip: state.vendorZoomView.wan_ip,

        time: state.vendorZoomView.internetTime,
        internet_total: state.vendorZoomView.internetTotal,
        internet_recived: state.vendorZoomView.internetRecived,
        internet_transmit: state.vendorZoomView.internetTransmitted,

        internetError: state.vendorZoomView.internetChartError,
        ipTrackingError: state.vendorZoomView.exernalIp_error,
        topAppError: state.vendorZoomView.ipApp_error,
        geoTrafficError: state.vendorZoomView.ipCity_error,
        ipsContributorError: state.vendorZoomView.ispCont_error,
    }
}


export default connect(mapStateToProps, null)(Internet);