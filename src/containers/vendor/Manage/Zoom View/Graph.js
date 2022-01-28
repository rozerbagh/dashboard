import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CPUGraphs from '../../../../components/Monitor/Graphs/CPUGraph';
import CPULoadGraphs from '../../../../components/Monitor/Graphs/CPULoadGraph';
import RAMGraphs from '../../../../components/Monitor/Graphs/RAMGraphs';
import HDDGraphs from '../../../../components/Monitor/Graphs/HDDGraph';
import DiskThroughput from '../../../../components/Monitor/Graphs/DiskThroughput';
import DiskIOPS from '../../../../components/Monitor/Graphs/DiskIOPS';
import DiskAverageTimeAwait from '../../../../components/Monitor/Graphs/DiskAverageTimeAwaitGraph';
import Interfaces from '../../../../components/Monitor/Graphs/InterfacesGraphs';
import InterfacesBandwidth from '../../../../components/Monitor/Graphs/InterfacesBandwidthGraph';
import NoOfThreads from '../../../../components/Monitor/Graphs/ThreadsGraph';
import TCPConnections from '../../../../components/Monitor/Graphs/TCPConnGraph';
import Loader from "../../../../components/UI/Loader/Loader";
import GraphImg from '../../../../assets/img/DemoGraph.svg'

// @material-ui/core components
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from '@material-ui/core/Typography';

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
    },

});

const ChartBox = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40em, 1fr));
    grid-template-rows: auto;
    gap: 10px;
`;

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

const GraphImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
    opacity: 0.4;
`

const Graphs = (props) => {
    const classes = useStyles();

    const { instanceSideBar, osType, ...rest } = props;

    const [wrapperWidth, setWrapperWidth] = useState(window.innerWidth / 2 - 200);
    const [adminSidebar, setAdminSideBar] = useState(60)
    const [cpuGraph, setCpuGraph] = useState([]);
    const [cpuGraphTime, setCpuGraphTime] = useState([]);

    const [cpuLoadGraph, setCpuLoadGraph] = useState([]);
    const [cpuLoadGraph5, setCpuLoadGraph5] = useState([]);
    const [cpuLoadGraph1, setCpuLoadGraph1] = useState([]);
    const [cpuLoadGraphTime, setCpuLoadGraphTime] = useState([]);
    const [cpuLoadCore, setCpuLoadCore] = useState([]);
    const [cpuLoadCrit, setCpuLoadCrit] = useState([]);
    const [cpuLoadWarn, setCpuLoadWarn] = useState([])


    const [ramGraph, setRamGraph] = useState([]);
    const [ramGraphTime, setRamGraphTime] = useState([]);

    const [hddGraph, sethddGraph] = useState([]);

    const [diskThroghputGraph, setDiskThroghputGraph] = useState([]);
    const [diskIOPSGraph, setDiskIOPSGraph] = useState([]);
    const [diskAvgTimeAwaitGraph, setDiskAvgTimeAwaitGraph] = useState([]);

    const [interfaceGraph, setInterfaceGraph] = useState([]);
    const [interfaceGraphTime, setInterfaceGraphTime] = useState([]);

    const [threadsGraph, setThreadsGraph] = useState([]);
    const [tcpConnGraph, setTCPConnGraph] = useState({
        listen: [],
        time_await: [],
        established: [],
    });

    useEffect(() => {
        const adminSidebarSize = parseInt(sessionStorage.getItem('for_vendor_sidebar_size'))
        setAdminSideBar(adminSidebarSize)
        const cpuBoxWidth = document.getElementById('cpu-chart');
        if (cpuBoxWidth) {
            if (instanceSideBar === true && adminSidebarSize === 60) {
                setWrapperWidth(450);
            } else if (instanceSideBar === false && adminSidebarSize === 60) {
                setWrapperWidth(cpuBoxWidth.getBoundingClientRect().width - 10);
            } else if (instanceSideBar === true && adminSidebarSize === 240) {
                setWrapperWidth(cpuBoxWidth.getBoundingClientRect().width - 10);
            } else if (instanceSideBar === false && adminSidebarSize === 240) {
                setWrapperWidth(cpuBoxWidth.getBoundingClientRect().width - 10);
            }
        } else {
            setWrapperWidth(window.innerWidth / 2 - 200);
        }
    }, [instanceSideBar])

    // Set State for CPU GRAPH
    useEffect(() => {
        setCpuGraph(props.cpu_data);
        setCpuGraphTime(props.cpu_time)
    }, [props.cpu_data, props.cpu_time]);

    // Set State for CPU LOAD GRAPH
    useEffect(() => {
        setCpuLoadGraph(props.cpu_load_data_total_15);
        setCpuLoadGraph5(props.cpu_load_data_total_5);
        setCpuLoadGraph1(props.cpu_load_data_total_1);
        setCpuLoadGraphTime(props.cpu_load_time);
        setCpuLoadCore(props.cpu_core);
        setCpuLoadCrit(props.cpu_load_data_crit);
        setCpuLoadWarn(props.cpu_load_data_warn);
    }, [props.cpu_load_data_total_15,
    props.cpu_load_data_total_5,
    props.cpu_load_data_total_1,
    props.cpu_load_time]);

    // Set State for RAM GRAPH
    useEffect(() => {
        setRamGraph(props.ram_data);
        setRamGraphTime(props.ram_time);
    }, [props.ram_data, props.ram_time]);

    // Set State for HDD GRAPH
    useEffect(() => {
        sethddGraph(props.hdd_data);
    }, [props.hdd_data]);

    // Set State for INTERFACES GRAPH
    useEffect(() => {
        setInterfaceGraph(props.interfaces_data)
    }, [props.interfaces_data])

    // Set State for THREADS GRAPH
    useEffect(() => {
        setThreadsGraph(props.threads_data);
    }, [props.threads_data])

    // Set State for TCP GRAPH
    useEffect(() => {
        const allData = [];
        props.tcpConn_Listen.map(ele => allData.push(ele))
        props.tcpConn_TimeWait.map(ele => allData.push(ele))
        props.tcpConn_Established.map(ele => allData.push(ele))
        setTCPConnGraph({
            listen: props.tcpConn_Listen,
            time_await: props.tcpConn_TimeWait,
            established: props.tcpConn_Established,
            maxValue: allData,
        })
    }, [props.tcpConn_Listen, props.tcpConn_TimeWait, props.tcpConn_Established])

    return (
        <>
            <ChartBox id="charts-box" >
                {/* ---------- CPU GRAPH --------- */}
                {props.cpuloader ? <div className={classes.loaderContainer}>
                    <Loader bigLoader style={{ margin: "0 auto" }} />
                </div> :
                    <div id="cpu-chart">
                        {cpuGraph === null || cpuGraph === undefined ?
                            <GraphImageBox>
                                <Typography variant="h6">CPU Utilization</Typography>
                                <Typography variant="body1">No data found</Typography>
                            </GraphImageBox> :
                            cpuGraph.length > 0 ?
                                <CPUGraphs
                                    key="cpu-performance"
                                    cpudata={cpuGraph}
                                    warn={props.cpu_warn}
                                    crit={props.cpu_crit}
                                    time_str={cpuGraphTime}
                                    chartWidth={wrapperWidth}
                                    onChangeSideBar={adminSidebar}
                                /> : <GraphImageBox>
                                    <Typography variant="h6" style={{ zIndex: 2 }}>CPU Utilization</Typography>
                                    <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                                </GraphImageBox>}
                    </div>

                }

                {/* ---------- CPU LOAD GRAPH --------- */}
                {props.cpuLoadloader ? <div className={classes.loaderContainer}>
                    <Loader bigLoader style={{ margin: "0 auto" }} />
                </div> :
                    cpuLoadGraph === null || cpuLoadGraph === undefined ||
                        cpuLoadGraph5 === null || cpuLoadGraph5 === undefined ||
                        cpuLoadGraph1 === null || cpuLoadGraph1 === undefined ?
                        <GraphImageBox>
                            <Typography variant="h6" style={{ zIndex: 2 }}>CPU Cores</Typography>
                            <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                        </GraphImageBox> :
                        cpuLoadGraph.length > 0 &&
                            cpuLoadGraph5.length > 0 &&
                            cpuLoadGraph1.length > 0 ?
                            <CPULoadGraphs
                                key="cpu-load-performance"
                                time_str={cpuLoadGraphTime}
                                chartWidth={wrapperWidth}
                                total={cpuLoadGraph}
                                total5={cpuLoadGraph5}
                                total1={cpuLoadGraph1}
                                crit={cpuLoadCrit}
                                warn={cpuLoadWarn}
                                cpuCore={cpuLoadCore}
                            /> : (osType.toLowerCase().includes('window')) ? null : <GraphImageBox>
                                <Typography variant="h6" style={{ zIndex: 2 }}>CPU Cores</Typography>
                                <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                            </GraphImageBox>
                }

                {props.ramloader ? <div className={classes.loaderContainer}>
                    <Loader bigLoader style={{ margin: "0 auto" }} />
                </div> :
                    ramGraph === null || ramGraph === undefined ?
                        <GraphImageBox>
                            <Typography variant="h6" style={{ zIndex: 2 }}>RAM Performances</Typography>
                            <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                        </GraphImageBox> : ramGraph.length > 0 ?
                            <RAMGraphs
                                key="ram-performance"
                                ramdata={ramGraph}
                                warn={props.ram_warn}
                                crit={props.ram_crit}
                                time_str={ramGraphTime}
                                chartWidth={wrapperWidth}
                            /> : <GraphImageBox>
                                <Typography variant="h6" style={{ zIndex: 2 }}>RAM Performances</Typography>
                                <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                            </GraphImageBox>
                }

                {props.hddloader ? <div className={classes.loaderContainer}>
                    <Loader bigLoader style={{ margin: "0 auto" }} />
                </div> :
                    hddGraph === null || hddGraph === undefined ?
                        <GraphImageBox>
                            <Typography variant="h6" style={{ zIndex: 2 }}>Filesystems</Typography>
                            <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                        </GraphImageBox> :
                        hddGraph.length > 0 ?
                            hddGraph.map((hdd, index) => {
                                const used = [];
                                const crit = [];
                                const warn = [];
                                const timeSpan = [];
                                var path = '';
                                hdd.map(ele => {
                                    used.push(parseFloat(((ele.used / ele.total) * 100).toFixed(2)));
                                    warn.push(parseFloat(((ele.warn / ele.total) * 100).toFixed(2)));
                                    crit.push(parseFloat(((ele.crit / ele.total) * 100).toFixed(2)));
                                    timeSpan.push(ele.time_str);
                                    path = ele.path
                                })
                                return <HDDGraphs
                                    hddData={used}
                                    warn={warn}
                                    crit={crit}
                                    key={`hdd-graph-no-${index}`}
                                    pathname={path}
                                    time_str={timeSpan}
                                    i={index}
                                    chartWidth={wrapperWidth}
                                />
                            }) :
                            <GraphImageBox>
                                <Typography variant="h6" style={{ zIndex: 2 }}>Filesystems</Typography>
                                <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                            </GraphImageBox>
                }
                {/* Disk through put */}
                {props.diskloader ? <div className={classes.loaderContainer}>
                    <Loader bigLoader style={{ margin: "0 auto" }} />
                </div> :
                    props.disk_throughput_read === null || props.disk_throughput_read === undefined ||
                        props.disk_throughput_write === null || props.disk_throughput_write === undefined ?
                        <GraphImageBox>
                            <Typography variant="h6" style={{ zIndex: 2 }}>Disk Throughput</Typography>
                            <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                        </GraphImageBox> :
                        props.disk_throughput_read.length > 0 && props.disk_throughput_write.length > 0 ?
                            <DiskThroughput DTPReadData={props.disk_throughput_read}
                                DTPWriteData={props.disk_throughput_write} time_str={props.diskIO_time}
                                chartWidth={wrapperWidth}
                            /> : <GraphImageBox>
                                <Typography variant="h6" style={{ zIndex: 2 }}>Disk Throughput</Typography>
                                <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                            </GraphImageBox>
                }

                {/* Disk IOPS */}
                {props.diskloader ? <div className={classes.loaderContainer}>
                    <Loader bigLoader style={{ margin: "0 auto" }} />
                </div> :
                    props.disk_iops_read === null || props.disk_iops_read === undefined ||
                        props.disk_iops_write === null || props.disk_iops_write === undefined ?
                        <GraphImageBox>
                            <Typography variant="h6" style={{ zIndex: 2 }}>Disk IOPS</Typography>
                            <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                        </GraphImageBox> :
                        props.disk_iops_read.length > 0 && props.disk_iops_write.length > 0 ?
                            <DiskIOPS DIOPSReadData={props.disk_iops_read}
                                DIOPSWriteData={props.disk_iops_write} time_str={props.diskIO_time}
                                chartWidth={wrapperWidth}
                            /> : <GraphImageBox>
                                <Typography variant="h6" style={{ zIndex: 2 }}>Disk IOPS</Typography>
                                <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                            </GraphImageBox>

                }

                {/* Disk Avg Time Await */}
                {props.diskloader ? <div className={classes.loaderContainer}>
                    <Loader bigLoader style={{ margin: "0 auto" }} />
                </div> :
                    props.disk_avg_time_await_read === null || props.disk_avg_time_await_read === undefined ||
                        props.disk_avg_time_await_write === null || props.disk_avg_time_await_write === undefined ?
                        <GraphImageBox>
                            <Typography variant="h6" style={{ zIndex: 2 }}>Disk Average Time Await</Typography>
                            <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                        </GraphImageBox> :
                        props.disk_avg_time_await_read.length > 0 &&
                            props.disk_avg_time_await_write.length > 0 ?
                            <DiskAverageTimeAwait DAWTReadData={props.disk_avg_time_await_read}
                                DAWTWriteData={props.disk_avg_time_await_write} time_str={props.diskIO_time}
                                chartWidth={wrapperWidth}
                            /> : <GraphImageBox>
                                <Typography variant="h6" style={{ zIndex: 2 }}>Disk Average Time Await</Typography>
                                <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                            </GraphImageBox>
                }
            </ChartBox>
            {/* Interafces and interfaces bandwidth */}
            <ChartBox id="inter-band-graph">
                {props.interfacesloader ? <div className={classes.loaderContainer}>
                    <Loader bigLoader style={{ margin: "0 auto" }} />
                </div> : interfaceGraph === null || interfaceGraph === undefined ?
                    <>
                        <GraphImageBox>
                            <Typography variant="h6" style={{ zIndex: 2 }}>Interfaces Packets</Typography>
                            <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                        </GraphImageBox>
                        <GraphImageBox>
                            <Typography variant="h6" style={{ zIndex: 2 }}>Interfaces Bandwidth</Typography>
                            <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                        </GraphImageBox>
                    </> :
                    interfaceGraph.length > 0 ?
                        interfaceGraph.map((interf, index) => {
                            let time = [];
                            let inunicast = [];
                            let outunicast = [];
                            let inMulticast = [];
                            let outMulticast = [];

                            let inBandwidth = [];
                            let outBandwidth = [];

                            let banwidthUnit = 'B/s';
                            let axesUnit = 'B/s';
                            const maxvalue = [];
                            const maxbandwidth = [];
                            const interfaceName = interf[0].interfaceName
                            interf.map(elements => {
                                let inunicastThread = parseFloat(elements.inunicast)
                                let outunicastThread = parseFloat(elements.outunicast)
                                let inMulticastThread = parseFloat(elements.inMulticast)
                                let outMulticastThread = parseFloat(elements.outMulticast);

                                let inBandwidthThread;
                                let outBandwidthThread;
                                if (elements.in_bandwidth == null) {
                                    inBandwidthThread = 0
                                } else {
                                    inBandwidthThread = parseFloat(elements.in_bandwidth)
                                }
                                if (elements.out_bandwidth == null) {
                                    outBandwidthThread = 0
                                } else {
                                    outBandwidthThread = parseFloat(elements.out_bandwidth)
                                }

                                inunicastThread = Math.floor(inunicastThread);
                                outunicastThread = Math.floor(outunicastThread)
                                inMulticastThread = Math.floor(inMulticastThread);
                                outMulticastThread = Math.floor(outMulticastThread);

                                inBandwidthThread = Math.floor(inBandwidthThread);
                                outBandwidthThread = Math.floor(outBandwidthThread);
                                if (outBandwidthThread >= 1000000 || inBandwidthThread >= 1000000) {
                                    inBandwidthThread = (inBandwidthThread / 1000000).toFixed(2);
                                    outBandwidthThread = (outBandwidthThread / 1000000).toFixed(2);
                                    banwidthUnit = 'MB/s';
                                    axesUnit = 'M/s';
                                } else if (outBandwidthThread >= 1000 || inBandwidthThread >= 1000) {
                                    inBandwidthThread = (inBandwidthThread / 1000).toFixed(2);
                                    outBandwidthThread = (outBandwidthThread / 1000).toFixed(2);
                                    banwidthUnit = 'KB/s';
                                    axesUnit = 'K/s'
                                }
                                else {
                                    inBandwidthThread = inBandwidthThread
                                    outBandwidthThread = outBandwidthThread;
                                    banwidthUnit = banwidthUnit
                                }
                                time.push(elements.time_str)
                                inunicast.push(parseFloat(inunicastThread))
                                outunicast.push(parseFloat(outunicastThread))
                                inMulticast.push(parseFloat(inMulticastThread))
                                outMulticast.push(parseFloat(outMulticastThread))

                                inBandwidth.push(parseFloat(inBandwidthThread))
                                outBandwidth.push(parseFloat(outBandwidthThread));

                                maxvalue.push(parseFloat(inunicastThread))
                                maxvalue.push(parseFloat(outunicastThread))
                                maxvalue.push(parseFloat(inMulticastThread))
                                maxvalue.push(parseFloat(outMulticastThread));

                                maxbandwidth.push(parseFloat(inBandwidthThread))
                                maxbandwidth.push(parseFloat(outBandwidthThread))

                            })

                            return <React.Fragment key={`inter-band-${index}`}>
                                <Interfaces
                                    inunicast={inunicast}
                                    outunicast={outunicast}
                                    inMulticast={inMulticast}
                                    outMulticast={outMulticast}
                                    maxvalue={maxvalue}
                                    key={`interfaces-graph-no-${index}`}
                                    time_str={time}
                                    i={index}
                                    interfaceName={interfaceName}
                                    chartWidth={wrapperWidth}
                                />
                                <InterfacesBandwidth
                                    interfaceName={interfaceName}
                                    inBandwidth={inBandwidth}
                                    outBandwidth={outBandwidth}
                                    maxbandwidth={maxbandwidth}
                                    time_str={time}
                                    key={`interfaces-bandwidth-graph-no-${index}`}
                                    i={index}
                                    banwidthUnit={banwidthUnit}
                                    axesUnit={axesUnit}
                                    chartWidth={wrapperWidth}
                                />
                            </React.Fragment>
                        }) :
                        <>
                            <GraphImageBox>
                                <Typography variant="h6" style={{ zIndex: 2 }}>Interfaces Packets</Typography>
                                <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                            </GraphImageBox>
                            <GraphImageBox>
                                <Typography variant="h6" style={{ zIndex: 2 }}>Interfaces Bandwidth</Typography>
                                <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                            </GraphImageBox>
                        </>
                }
            </ChartBox>
            <ChartBox>
                {/* no of threads */}
                {props.threadsloader ? <div className={classes.loaderContainer}>
                    <Loader bigLoader style={{ margin: "0 auto" }} />
                </div> : threadsGraph === null || threadsGraph === undefined ?
                    <GraphImageBox>
                        <Typography variant="h6" style={{ zIndex: 2 }}>Threads</Typography>
                        <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                    </GraphImageBox> :
                    threadsGraph.length > 0 ?
                        <NoOfThreads
                            threadsData={threadsGraph}
                            key={`thread-graph`}
                            time_str={props.threads_time}
                            chartWidth={wrapperWidth}
                        /> : (osType.toLowerCase().includes('window')) ? null : <GraphImageBox>
                            <Typography variant="h6" style={{ zIndex: 2 }}>Threads</Typography>
                            <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                        </GraphImageBox>
                }

                {/* tcp connections */}
                {props.tcploader ? <div className={classes.loaderContainer}>
                    <Loader bigLoader style={{ margin: "0 auto" }} />
                </div> :
                    tcpConnGraph === null || tcpConnGraph === undefined ?
                        <GraphImageBox>
                            <Typography variant="h6" style={{ zIndex: 2 }}>TCP Connections</Typography>
                            <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                        </GraphImageBox> :
                        tcpConnGraph.listen.length > 0 &&
                            tcpConnGraph.time_await.length > 0 &&
                            tcpConnGraph.established.length > 0 ?
                            <TCPConnections
                                tcpConn_Listen={tcpConnGraph.listen}
                                tcpConn_TimeWait={tcpConnGraph.time_await}
                                tcpConn_Established={tcpConnGraph.established}
                                maxvalue={tcpConnGraph.maxValue}
                                key={`tcp-conn-graph`}
                                time_str={props.tcpConn_time}
                                chartWidth={wrapperWidth}
                            /> : (osType.toLowerCase().includes('window')) ? null : <GraphImageBox>
                                <Typography variant="h6" style={{ zIndex: 2 }}>TCP Connections</Typography>
                                <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                            </GraphImageBox>
                }

            </ChartBox>
        </>

    )
}

const mapStateToProps = state => {
    return {
        token: state.auth_reducer.token,
        time_num: state.vendorZoomView.time_str,
        time: state.vendorZoomView.graphTimeSpan,
        cpu_data: state.vendorZoomView.cpuData,
        cpu_time: state.vendorZoomView.cpu_time,

        cpu_load_data_total_15: state.vendorZoomView.cpuDataTotal15,
        cpu_load_data_total_5: state.vendorZoomView.cpuDataTotal5,
        cpu_load_data_total_1: state.vendorZoomView.cpuDataTotal1,
        cpu_load_data_crit: state.vendorZoomView.cpuLoadCrit,
        cpu_load_data_warn: state.vendorZoomView.cpuLoadWarn,
        cpu_core: state.vendorZoomView.cpuCore,
        cpu_load_time: state.vendorZoomView.cpuLoadTime,
        cpu_warn: state.vendorZoomView.cpu_warn,
        cpu_crit: state.vendorZoomView.cpu_crit,

        ram_data: state.vendorZoomView.ramData,
        ram_time: state.vendorZoomView.ram_time,
        ram_warn: state.vendorZoomView.ramwarn,
        ram_crit: state.vendorZoomView.ramcrit,

        hdd_data: state.vendorZoomView.hddData,
        hdd_time: state.vendorZoomView.hdd_time,

        interfaces_data: state.vendorZoomView.interfacesData,
        interface_time: state.vendorZoomView.interface_time,

        threads_time: state.vendorZoomView.threads_time,
        threads_data: state.vendorZoomView.noOfThreadsData,
        threads_data_length: state.vendorZoomView.noOfThreadsDataLength,

        tcpConn_time: state.vendorZoomView.tcp_conn_time,
        tcpConn_Listen: state.vendorZoomView.tcp_conn_listen,
        tcpConn_TimeWait: state.vendorZoomView.tcp_conn_time_wait,
        tcpConn_Established: state.vendorZoomView.tcp_conn_established,
        tcpConn_data_length: state.vendorZoomView.tcpConnectionsDataLength,

        loader: state.vendorZoomView.graphsLoading,

        diskIO_time: state.vendorZoomView.disk_io_time,
        disk_throughput_read: state.vendorZoomView.diskThroughPutRead,
        disk_throughput_write: state.vendorZoomView.diskThroughPutWrite,

        disk_iops_read: state.vendorZoomView.diskIOPSRead,
        disk_iops_write: state.vendorZoomView.diskIOPSWrite,

        disk_avg_time_await_read: state.vendorZoomView.diskAvgTimeAwaitRead,
        disk_avg_time_await_write: state.vendorZoomView.diskAvgTimeAwaitWrite,
    }
}

// const mapDispatchToProps = dispatch => {
//     return {

//     }
// }

export default connect(mapStateToProps, null)(Graphs);