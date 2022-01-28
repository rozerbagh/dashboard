import React, { useState, useEffect, useRef, useMemo } from 'react';
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

const ChartBox = styled(({ staticContext, isSidebarOpen, children, ...rest }) => <div {...rest}>{children}</div>)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
    grid-template-rows: auto;
    gap: 10px;

    &:nth-child(1){
        background-color: #cccccc;
    }
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

    const { instanceSideBar, adminSidebar, osType, ...rest } = props;
    const [wrapperWidth, setWrapperWidth] = useState(window.innerWidth);

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
    const [hddGraphTime, sethddGraphTime] = useState([]);

    const [diskThroghputGraph, setDiskThroghputGraph] = useState({
        read: [],
        write: []
    });
    const [diskIOPSGraph, setDiskIOPSGraph] = useState({
        read: [], write: []
    });
    const [diskAvgTimeAwaitGraph, setDiskAvgTimeAwaitGraph] = useState({
        read: [], write: []
    });

    const [diskIOTime, setDiskIOTime] = useState([])

    const [interfaceGraph, setInterfaceGraph] = useState([]);
    const [interfaceGraphTime, setInterfaceGraphTime] = useState([]);

    const [threadsGraph, setThreadsGraph] = useState([]);
    const [tcpConnGraph, setTCPConnGraph] = useState({
        listen: [],
        time_await: [],
        established: [],
    });

    useEffect(() => {
        const cpuBoxWidth = document.getElementById('charts');
        // Array.from(cpuBoxWidth).map(e => {
        //     console.log(e.getClientRects()[0])
        // })

        if (cpuBoxWidth) {
            // Array.from(cpuBoxWidth).map(e => {
            //     setWrapperWidth(e.getClientRects()[0].width);
            //     console.log(e.getClientRects()[0]);
            // })
            if (instanceSideBar === true && adminSidebar === 60) {
                setWrapperWidth(cpuBoxWidth.getClientRects()[0].width);
            } else if (instanceSideBar === false && adminSidebar === 60) {
                setWrapperWidth(cpuBoxWidth.getClientRects()[0].width);
            } else if (instanceSideBar === true && adminSidebar === 240) {
                setWrapperWidth(cpuBoxWidth.getClientRects()[0].width);
            } else if (instanceSideBar === false && adminSidebar === 240) {
                setWrapperWidth(cpuBoxWidth.getClientRects()[0].width);
            }
        } else {
            setWrapperWidth(window.innerWidth / 2 - 200);
        }
    }, [instanceSideBar, adminSidebar])

    // Set State for CPU GRAPH
    useMemo(() => {
        setCpuGraph(props.cpu_data);
        setCpuGraphTime(props.cpu_time)
    }, [props.cpu_data, props.cpu_time]);

    // Set State for CPU LOAD GRAPH
    useMemo(() => {
        setCpuLoadGraph(props.cpu_load_data_total_15);
        setCpuLoadGraph5(props.cpu_load_data_total_5);
        setCpuLoadGraph1(props.cpu_load_data_total_1);
        setCpuLoadGraphTime(props.cpu_load_time);
        setCpuLoadCrit(props.cpu_load_data_crit);
        setCpuLoadWarn(props.cpu_load_data_warn);
        setCpuLoadCore(props.cpu_core);
    }, [props.cpu_load_data_total_15,
    props.cpu_load_data_total_5,
    props.cpu_load_data_total_1,
    props.cpu_load_time]);

    // Set State for RAM GRAPH
    useMemo(() => {
        setRamGraph(props.ram_data);
        setRamGraphTime(props.ram_time);
    }, [props.ram_data, props.ram_time]);

    // Set State for HDD GRAPH
    useMemo(() => {
        sethddGraph(props.hdd_data);
    }, [props.hdd_data]);

    // Set State for INTERFACES GRAPH
    useMemo(() => {
        setInterfaceGraph(props.interfaces_data)
    }, [props.interfaces_data])

    // Set State for THREADS GRAPH
    useMemo(() => {
        setThreadsGraph(props.threads_data);
    }, [props.threads_data])

    // Set State for TCP GRAPH
    useMemo(() => {
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



    useEffect(() => {
        setDiskThroghputGraph(prevState => ({
            ...prevState,
            read: props.disk_throughput_read,
            write: props.disk_throughput_write,
        }))
        setDiskIOTime(props.diskIO_time)
    }, [props.disk_throughput_read, props.disk_throughput_write])

    useEffect(() => {
        setDiskIOPSGraph(prevState => ({
            ...prevState,
            read: props.disk_iops_read,
            write: props.disk_iops_write,
        }))
    }, [props.disk_iops_read, props.disk_iops_write]);
    useEffect(() => {
        setDiskAvgTimeAwaitGraph(prevState => ({
            ...prevState,
            read: props.disk_avg_time_await_read,
            write: props.disk_avg_time_await_write,
        }))
    }, [props.disk_avg_time_await_read, props.disk_avg_time_await_write])

    return (
        <>
            <ChartBox>
                {/* ---------- CPU GRAPH --------- */}
                {props.cpuloader ? <div className={classes.loaderContainer}>
                    <Loader bigLoader style={{ margin: "0 auto" }} />
                </div> :
                    <div id="charts">
                        {cpuGraph === null || cpuGraph === undefined ?
                            <GraphImageBox>
                                <Typography variant="h6" style={{ zIndex: 2 }}>CPU Utilization</Typography>
                                <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
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
                                total={cpuLoadGraph}
                                total5={cpuLoadGraph5}
                                total1={cpuLoadGraph1}
                                crit={cpuLoadCrit}
                                warn={cpuLoadWarn}
                                cpuCore={cpuLoadCore}
                                time_str={cpuLoadGraphTime}
                                chartWidth={wrapperWidth}
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
                            <Typography variant="body1" style={{ zIndex: 2 }}>No details are found for the</Typography>
                            <Typography variant="h6" style={{ zIndex: 2 }}>RAM Performances</Typography>
                        </GraphImageBox> : ramGraph.length > 0 ?
                            <RAMGraphs
                                key="ram-performance"
                                ramdata={ramGraph}
                                warn={props.ram_warn}
                                crit={props.ram_crit}
                                time_str={ramGraphTime}
                                chartWidth={wrapperWidth}
                                onChangeSideBar={adminSidebar}
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
                                    onChangeSideBar={adminSidebar}
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
                    diskThroghputGraph.read === null || diskThroghputGraph.read === undefined ||
                        diskThroghputGraph.write === null || diskThroghputGraph.write === undefined ?
                        <GraphImageBox>
                            <Typography variant="h6" style={{ zIndex: 2 }}>Disk Throughput</Typography>
                            <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                        </GraphImageBox> :
                        diskThroghputGraph.read.length > 0 && diskThroghputGraph.write.length > 0 ?
                            <DiskThroughput DTPReadData={diskThroghputGraph.read}
                                DTPWriteData={diskThroghputGraph.write} time_str={diskIOTime}
                                chartWidth={wrapperWidth}
                                onChangeSideBar={adminSidebar}
                            /> : <GraphImageBox>
                                <Typography variant="h6" style={{ zIndex: 2 }}>Disk Throughput</Typography>
                                <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                            </GraphImageBox>
                }

                {/* Disk IOPS */}
                {props.diskloader ? <div className={classes.loaderContainer}>
                    <Loader bigLoader style={{ margin: "0 auto" }} />
                </div> :
                    diskIOPSGraph.read === null || diskIOPSGraph.read === undefined ||
                        diskIOPSGraph.write === null || diskIOPSGraph.write === undefined ?
                        <GraphImageBox>
                            <Typography variant="h6" style={{ zIndex: 2 }}>Disk IOPS</Typography>
                            <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                        </GraphImageBox> :
                        diskIOPSGraph.read.length > 0 && diskIOPSGraph.write.length > 0 ?
                            <DiskIOPS DIOPSReadData={diskIOPSGraph.read}
                                DIOPSWriteData={diskIOPSGraph.write} time_str={diskIOTime}
                                chartWidth={wrapperWidth}
                                onChangeSideBar={adminSidebar}
                            /> : <GraphImageBox>
                                <Typography variant="h6" style={{ zIndex: 2 }}>Disk IOPS</Typography>
                                <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                            </GraphImageBox>
                }

                {/* Disk Avg Time Await */}
                {props.diskloader ? <div className={classes.loaderContainer}>
                    <Loader bigLoader style={{ margin: "0 auto" }} />
                </div> :
                    diskAvgTimeAwaitGraph.read === null || diskAvgTimeAwaitGraph.read === undefined ||
                        diskAvgTimeAwaitGraph.write === null || diskAvgTimeAwaitGraph.write === undefined ?
                        <GraphImageBox>
                            <Typography variant="h6" style={{ zIndex: 2 }}>Disk Average Time Await</Typography>
                            <Typography variant="body1" style={{ zIndex: 2 }}>No data found</Typography>
                        </GraphImageBox> :
                        diskAvgTimeAwaitGraph.read.length > 0 && diskAvgTimeAwaitGraph.write.length > 0 ?
                            <DiskAverageTimeAwait DAWTReadData={diskAvgTimeAwaitGraph.read}
                                DAWTWriteData={diskAvgTimeAwaitGraph.write} time_str={diskIOTime}
                                chartWidth={wrapperWidth}
                                onChangeSideBar={adminSidebar}
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
                    </> : interfaceGraph.length > 0 ?
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
                    props.threads_data_length > 0 ?
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
                </div> : tcpConnGraph === null || tcpConnGraph === undefined ?
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
        time_num: state.customerZoomView.time_str,

        cpuloader: state.customerZoomView.cpuLoading,
        cpu_data: state.customerZoomView.cpu_data,
        cpu_time: state.customerZoomView.cpu_time,
        cpu_warn: state.customerZoomView.cpu_warn,
        cpu_crit: state.customerZoomView.cpu_crit,

        cpuLoadloader: state.customerZoomView.cpuLoadLoading,
        cpu_load_data_total_15: state.customerZoomView.cpuDataTotal15,
        cpu_load_data_total_5: state.customerZoomView.cpuDataTotal5,
        cpu_load_data_total_1: state.customerZoomView.cpuDataTotal1,
        cpu_load_data_crit: state.vendorZoomView.cpuLoadCrit,
        cpu_load_data_warn: state.vendorZoomView.cpuLoadWarn,
        cpu_core: state.customerZoomView.cpuCore,
        cpu_load_time: state.customerZoomView.cpuLoadTime,

        ramloader: state.customerZoomView.ramLoading,
        ram_data: state.customerZoomView.ramData,
        ram_time: state.customerZoomView.ram_time,
        ram_warn: state.customerZoomView.ramwarn,
        ram_crit: state.customerZoomView.ramcrit,

        hddloader: state.customerZoomView.hddLoading,
        hdd_data: state.customerZoomView.hddData,
        hdd_time: state.customerZoomView.hdd_time,

        interfacesloader: state.customerZoomView.interfacesLoading,
        interfaces_data: state.customerZoomView.interfacesData,
        interface_time: state.customerZoomView.interface_time,

        threadsloader: state.customerZoomView.threadsLoading,
        threads_time: state.customerZoomView.threads_time,
        threads_data: state.customerZoomView.noOfThreadsData,
        threads_data_length: state.customerZoomView.noOfThreadsDataLength,

        tcploader: state.customerZoomView.tcpLoading,
        tcpConn_time: state.customerZoomView.tcp_conn_time,
        tcpConn_Listen: state.customerZoomView.tcp_conn_listen,
        tcpConn_TimeWait: state.customerZoomView.tcp_conn_time_wait,
        tcpConn_Established: state.customerZoomView.tcp_conn_established,
        tcpConn_data_length: state.customerZoomView.tcpConnectionsDataLength,

        diskloader: state.customerZoomView.diskSummaryLoading,

        diskIO_time: state.customerZoomView.disk_io_time,
        disk_throughput_read: state.customerZoomView.diskThroughPutRead,
        disk_throughput_write: state.customerZoomView.diskThroughPutWrite,

        disk_iops_read: state.customerZoomView.diskIOPSRead,
        disk_iops_write: state.customerZoomView.diskIOPSWrite,

        disk_avg_time_await_read: state.customerZoomView.diskAvgTimeAwaitRead,
        disk_avg_time_await_write: state.customerZoomView.diskAvgTimeAwaitWrite,
    }
}


export default connect(mapStateToProps, null)(Graphs);