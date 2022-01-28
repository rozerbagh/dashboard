import vm_info from '../../JSON/ZoomViewHeader.json';
import instnaces from '../../JSON/ZoomViewInstances.json';
import services from '../../JSON/ZoomViewServices.json';
import cpu_graph from '../../JSON/ZoomViewCPUGraph.json';
import cpu_load_graph from '../../JSON/ZoomViewCPULoad.json';
import ram_graph from '../../JSON/ZoomViewRAM.json';
import hdd_graph from '../../JSON/ZoomVviewHDD.json';
import disk_summary_graph from '../../JSON/ZoomViewDiskSummary.json';
import interfaces_graph from '../../JSON/ZoomViewInterfaces.json';
import threads_graph from '../../JSON/ZoomViewThreads.json';
import tcp_conn_graph from '../../JSON/ZoomViewTCP.json';
import internet_graph from '../../JSON/ZoomViewCounterItem.json';
import external_ip from '../../JSON/ZoomViewExternalIP.json';
import ip_apps from '../../JSON/ZoomViewIPApps.json';
import ip_cities from '../../JSON/ZoomViewIPCities.json';
import isp_contributor from '../../JSON/ZoomViewISPContributer.json';
import tasks from '../../JSON/ZoomViewTasks.json';
import zoom_view_backup from '../../JSON/ZoomViewBackup.json'
import * as actionType from './actionTypes';

const lan_ips = [];

// fecthing vm info
export const fetch_header_vm_start = () => {
    return {
        type: actionType.MONITOR_INSTANCES_VM_INFO_START
    }
}
export const fetch_header_vm_success = (data) => {
    return {
        type: actionType.MONITOR_INSTANCES_VM_INFO_SUCCESS,
        details: data,
    }
}

export const fetch_header_vm_fail = (error) => {
    return {
        type: actionType.MONITOR_INSTANCES_VM_INFO_FAIL,
        error: error,
    }
}

export const fetchInstanceVmInfo = (token, ip) => {
    return dispatch => {
        dispatch(fetch_header_vm_start());
        dispatch(fetch_header_vm_success(vm_info.message));
        // dispatch(fetch_header_vm_fail(error.response.data.message))

    }
}

// fecthing services
export const fetch_zoomview_services_start = () => {
    return {
        type: actionType.MONITOR_SERVICES_START
    }
}
export const fetch_zoomview_services_success = (data) => {
    return {
        type: actionType.MONITOR_SERVICES_SUCCESS,
        services: data,
    }
}

export const fetch_zoomview_services_fail = (error) => {
    return {
        type: actionType.MONITOR_SERVICES_FAIL,
        error: error,
    }
}

export const fetchZoomViewServices = (token, ip) => {
    let servicesArr = []
    return dispatch => {
        dispatch(fetch_zoomview_services_start());
        services.message.map(ele => {
            servicesArr = ele.srvices
        })
        dispatch(fetch_zoomview_services_success(servicesArr));
        // dispatch(fetch_zoomview_services_fail(error.response.data.message))

    }
}

// fecthing graphs
// -----------cpu-------------- //
export const fetch_cpu_graph_start = () => {
    return {
        type: actionType.MONITOR_CPU_GRAPHS_START
    }
}
export const fetch_cpu_graph_success = (used, warn, crit, timeStr) => {
    return {
        type: actionType.MONITOR_CPU_GRAPHS_SUCCESS,
        time: timeStr,
        cpudata: used,
        warn: warn,
        crit: crit,
    }
}

export const fetch_cpu_graph_fail = (error) => {
    return {
        type: actionType.MONITOR_CPU_GRAPHS_FAIL,
        error: error,
    }
}

export const fetchCpuChartDetails = (token, ip, from, to) => {
    // console.log('cpu', from, to)
    return dispatch => {
        dispatch(fetch_cpu_graph_start());
        dispatch(fetch_cpu_graph_success(cpu_graph.message.used,
            cpu_graph.message.warn,
            cpu_graph.message.crit,
            cpu_graph.message.time_str));
        // dispatch(fetch_cpu_graph_fail(error.response.data.message))

    }
}

// -----------ram-------------- //
export const fetch_ram_graph_start = () => {
    return {
        type: actionType.MONITOR_RAM_GRAPHS_START
    }
}
export const fetch_ram_graph_success = (used, warn, crit, time) => {
    return {
        type: actionType.MONITOR_RAM_GRAPHS_SUCCESS,
        time: time,
        ramdata: used,
        warn: warn,
        crit: crit,
    }
}

export const fetch_ram_graph_fail = (error) => {
    return {
        type: actionType.MONITOR_RAM_GRAPHS_FAIL,
        error: error,
    }
}

export const fetchRAMChartDetails = (token, ip, from, to) => {
    return dispatch => {
        dispatch(fetch_ram_graph_start());
        let usedPercent = [];
        const warn = [];
        const crit = [];
        ram_graph.message.percent_used.map(used => {
            let d = (parseFloat(used));
            usedPercent.push(parseFloat(d.toFixed(1)));
        })
        ram_graph.message.warn.map(ele => {
            let d = (parseFloat(ele));
            warn.push(parseFloat(d.toFixed(1)));
        })
        ram_graph.message.crit.map(ele => {
            let d = (parseFloat(ele));
            crit.push(parseFloat(d.toFixed(1)));
        })
        dispatch(fetch_ram_graph_success(usedPercent, warn, crit, ram_graph.message.time_str))
        // dispatch(fetch_ram_graph_fail(error.response.data.message));

    }
}

// -----------cpuload-------------- //
export const fetch_cpu_load_graph_start = () => {
    return {
        type: actionType.MONITOR_CPU_LOAD_GRAPHS_START
    }
}
export const fetch_cpu_load_graph_success = (data, time) => {
    return {
        type: actionType.MONITOR_CPU_LOAD_GRAPHS_SUCCESS,
        total: data.total,
        total5: data.total5,
        total1: data.total1,
        crit: data.crit,
        warn: data.warn,
        coreArr: data.cpuArray,
        time: time
    }
}

export const fetch_cpu_load_graph_fail = (error) => {
    return {
        type: actionType.MONITOR_CPU_LOAD_GRAPHS_FAIL,
        error: error,
    }
}

export const fetchCPULoadChartDetails = (token, ip, from, to) => {
    return dispatch => {
        dispatch(fetch_cpu_load_graph_start());
        const total = cpu_load_graph.message.total;
        const total5 = cpu_load_graph.message.total5;
        const total1 = cpu_load_graph.message.total1;
        const cpuArr = cpu_load_graph.message.cpuArr;
        const critArr = cpu_load_graph.message.crit;
        const warnArr = cpu_load_graph.message.warn
        const t15 = [];
        const t5 = [];
        const t1 = [];
        const crit = [];
        const warn = [];
        total.map(ele => t15.push(parseFloat(ele)))
        total5.map(ele => t5.push(parseFloat(ele)))
        total1.map(ele => t1.push(parseFloat(ele)))
        critArr.map(ele => crit.push(parseFloat(ele)))
        warnArr.map(ele => warn.push(parseFloat(ele)))
        dispatch(fetch_cpu_load_graph_success({
            total: t15,
            total5: t5,
            total1: t1,
            cpuArray: cpuArr,
            warn: warn,
            crit: crit,
        }, cpu_load_graph.message.time_str));
        // dispatch(fetch_cpu_load_graph_fail(error.response.data.message));
    }
}


// -----------hdd disk-------------- //
export const fetch_hdd_graph_start = () => {
    return {
        type: actionType.MONITOR_HDD_GRAPHS_START
    }
}
export const fetch_hdd_graph_success = (data, time) => {
    return {
        type: actionType.MONITOR_HDD_GRAPHS_SUCCESS,
        hddData: data,
        time: time,
    }
}

export const fetch_hdd_graph_fail = (error) => {
    return {
        type: actionType.MONITOR_HDD_GRAPHS_FAIL,
        error: error,
    }
}

export const fetchHDDChartDetails = (token, ip, from, to) => {
    return dispatch => {
        dispatch(fetch_hdd_graph_start());
        dispatch(fetch_hdd_graph_success(hdd_graph.message, hdd_graph.message.time_str));
        // dispatch(fetch_hdd_graph_fail(error.response.data.message));

    }
}

// -----------disk io summary-------------- //
export const fetch_diskIOSummary_graph_start = () => {
    return {
        type: actionType.MONITOR_DISK_IO_GRAPHS_START
    }
}
export const fetch_diskIOSummary_graph_success = (data, time) => {
    return {
        type: actionType.MONITOR_DISK_IO_GRAPHS_SUCCESS,
        dtpR: data.diskThroughtPut.read,
        dtpW: data.diskThroughtPut.write,
        diosR: data.diskIops.read,
        diosW: data.diskIops.write,
        datwR: data.diskAvgTimeAwait.read,
        datwW: data.diskAvgTimeAwait.write,
        time: time,
    }
}

export const fetch_diskIOSummary_graph_fail = (error) => {
    return {
        type: actionType.MONITOR_DISK_IO_GRAPHS_FAIL,
        error: error,
    }
}

export const fetchDiskIOSummaryDetails = (token, ip, from, to) => {
    return dispatch => {
        dispatch(fetch_diskIOSummary_graph_start());
        const DTPread = disk_summary_graph.message.throughput_data.read_data;
        const DTPwrite = disk_summary_graph.message.throughput_data.write_data;
        const DTPreadData = [];
        const DTPwriteData = [];

        let DTPmegabyte = 0;
        for (var i = 0; i < DTPread.length; i++) {
            DTPmegabyte = (parseFloat(DTPread[i]) / 1000000).toFixed(2);
            DTPreadData.push(parseFloat(DTPmegabyte));
        }
        for (var i = 0; i < DTPwrite.length; i++) {
            DTPmegabyte = (parseFloat(DTPwrite[i]) / 1000000).toFixed(2);
            DTPwriteData.push(parseFloat(DTPmegabyte));
        }

        const DIOPSread = disk_summary_graph.message.io_operations_data.read_data;
        const DIOPSwrite = disk_summary_graph.message.io_operations_data.write_data;
        const DIOPSreadData = [];
        const DIOPSwriteData = [];
        let DIOPSmegabyte = 0;

        for (var i = 0; i < DIOPSread.length; i++) {
            DIOPSmegabyte = (parseFloat(DIOPSread[i])).toFixed(2);
            DIOPSreadData.push(parseFloat(DIOPSmegabyte));
        }
        for (var i = 0; i < DIOPSwrite.length; i++) {
            DIOPSmegabyte = (parseFloat(DIOPSwrite[i])).toFixed(2);
            DIOPSwriteData.push(parseFloat(DIOPSmegabyte));
        }

        const DAWTread = disk_summary_graph.message.disk_average_wait_data.read_data;
        const DAWTwrite = disk_summary_graph.message.disk_average_wait_data.write_data;
        const DAWTreadData = [];
        const DAWTwriteData = [];
        var nanoseconds = 0;
        for (var i = 0; i < DAWTread.length; i++) {
            nanoseconds = (parseFloat(DAWTread[i]) * 1000).toFixed(2);
            DAWTreadData.push(parseFloat(nanoseconds));
        }
        for (var i = 0; i < DAWTwrite.length; i++) {
            nanoseconds = (parseFloat(DAWTwrite[i]) * 1000).toFixed(2);
            DAWTwriteData.push(parseFloat(nanoseconds));
        }

        dispatch(fetch_diskIOSummary_graph_success({
            diskThroughtPut: {
                read: DTPreadData,
                write: DTPwriteData,
            },
            diskIops: {
                read: DIOPSreadData,
                write: DIOPSwriteData,
            },
            diskAvgTimeAwait: {
                read: DAWTreadData,
                write: DAWTwriteData,
            }
        }, disk_summary_graph.message.throughput_data.time_str));
        // dispatch(fetch_diskIOSummary_graph_fail(error.response.data.message));

    }
}

// -----------interfaces-------------- //
export const fetch_interfaces_graph_start = () => {
    return {
        type: actionType.MONITOR_INTERFACES_GRAPHS_START,
    }
}
export const fetch_interfaces_graph_success = (data, time) => {
    return {
        type: actionType.MONITOR_INTERFACES_GRAPHS_SUCCESS,
        interfacedata: data,
        time: time,
    }
}

export const fetch_interfaces_graph_fail = (error) => {
    return {
        type: actionType.MONITOR_INTERFACES_GRAPHS_FAIL,
        error: error,
    }
}

export const fetchInterfacesDetails = (token, ip, from, to) => {
    return dispatch => {
        dispatch(fetch_interfaces_graph_start());
        dispatch(fetch_interfaces_graph_success(interfaces_graph.message, interfaces_graph.message.time_str));
        // dispatch(fetch_interfaces_graph_fail(error.response.data.message));
    }
}

// -----------No Of Threads-------------- //
export const fetch_no_of_threads_graph_start = () => {
    return {
        type: actionType.MONITOR_NO_OF_THREADS_GRAPHS_START,
    }
}
export const fetch_no_of_threads_graph_success = (data, time, length) => {
    return {
        type: actionType.MONITOR_NO_OF_THREADS_GRAPHS_SUCCESS,
        noofThreads: data,
        length: length,
        time: time,
    }
}

export const fetch_no_of_threads_graph_fail = (error) => {
    return {
        type: actionType.MONITOR_NO_OF_THREADS_GRAPHS_FAIL,
        error: error,
    }
}

export const fetchNoOfThreadsDetails = (token, ip, from, to) => {
    return dispatch => {
        dispatch(fetch_no_of_threads_graph_start());
        let thread_data = threads_graph.message.thread_data;
        const arr = [];
        thread_data.map(ele => arr.push(parseFloat(ele)))
        dispatch(fetch_no_of_threads_graph_success(
            arr,
            threads_graph.message.time_str,
            threads_graph.message.thread_data.length));
        // dispatch(fetch_no_of_threads_graph_fail(error.response.data.message));

    }
}


// -----------TCP Connections-------------- //
export const fetch_tcp_conn_graph_start = () => {
    return {
        type: actionType.MONITOR_TCP_CONNECTIONS_GRAPHS_START,
    }
}
export const fetch_tcp_conn_graph_success = (data, time, length) => {
    return {
        type: actionType.MONITOR_TCP_CONNECTIONS_GRAPHS_SUCCESS,
        tcpConnListen: data.listen,
        tcpConnTimeWait: data.timeWait,
        tcpConnEstb: data.estb,
        length: length,
        time: time,
    }
}

export const fetch_tcp_conn_graph_fail = (error) => {
    return {
        type: actionType.MONITOR_TCP_CONNECTIONS_GRAPHS_FAIL,
        error: error,
    }
}

export const fetchTCPConnectionsDetails = (token, ip, from, to) => {
    return dispatch => {
        dispatch(fetch_tcp_conn_graph_start());
        let l = [];
        let t = [];
        let e = [];
        const listen = tcp_conn_graph.message.tcp_connection.listen;
        const time_wait = tcp_conn_graph.message.tcp_connection.time_wait;
        const established = tcp_conn_graph.message.tcp_connection.established;
        listen.map(ele => l.push(parseFloat(ele)))
        time_wait.map(ele => t.push(parseFloat(ele)))
        established.map(ele => e.push(parseFloat(ele)))
        dispatch(fetch_tcp_conn_graph_success({
            listen: l,
            timeWait: t,
            estb: e,
        },
            tcp_conn_graph.message.tcp_connection.time_str,
            tcp_conn_graph.message.tcp_connection.established.length));
        // dispatch(fetch_tcp_conn_graph_fail(error.resposnse.data.message));
    }
}



// ------------ Internet -------------- //
export const fetch_internet_graph_start = () => {
    return {
        type: actionType.MONITOR_INTERNET_LINE_GRAPHS_START,
    }
}
export const fetch_internet_graph_success = (data, ip, time) => {
    return {
        type: actionType.MONITOR_INTERNET_LINE_GRAPHS_SUCCESS,
        internetTotal: data.total,
        internetRecived: data.recived,
        internetTransmitted: data.transmited,
        time: time,
        wanip: ip
    }
}

export const fetch_internet_graph_fail = (error) => {
    return {
        type: actionType.MONITOR_INTERNET_LINE_GRAPHS_FAIL,
        error: error,
    }
}

export const nullifyInternetGraphFail = () => {
    return {
        type: actionType.MONITOR_INTERNET_LINE_GRAPHS_FAIL,
        error: null,
    }
}

export const fetchInternetDetails = (token, ip, from, to) => {
    return dispatch => {
        dispatch(fetch_internet_graph_start());
        const config = {
            headers: { authorization: `bearer ${token}` }
        }
        const total = internet_graph.message.total;
        const recived = internet_graph.message.recived;
        const transmit = internet_graph.message.transmited;
        const tot = [];
        const reci = [];
        const trans = [];

        total.map(ele => tot.push(parseFloat(ele)))
        recived.map(ele => reci.push(parseFloat(ele)));
        transmit.map(ele => trans.push(parseFloat(ele)));
        dispatch(fetch_internet_graph_success({
            total: tot,
            recived: reci,
            transmited: trans,
        }, ip, internet_graph.message.time_str));
        // dispatch(fetch_internet_graph_fail(error.response.data.message));

    }
}

// ------------ IP  Tracking -------------- //
export const fetch_ext_ip_table_start = () => {
    return {
        type: actionType.MONITOR_EXTERNAL_IP_START,
    }
}
export const fetch_ext_ip_table_success = (data) => {
    return {
        type: actionType.MONITOR_EXTERNAL_IP_SUCCESS,
        extIPData: data,
    }
}

export const fetch_ext_ip_table_fail = (error) => {
    return {
        type: actionType.MONITOR_EXTERNAL_IP_FAIL,
        error: error,
    }
}

export const nullifyexternalIpFail = () => {
    return {
        type: actionType.MONITOR_EXTERNAL_IP_FAIL,
        error: null,
    }
}

export const fetchExternalIPDetails = (token, ip, from, to) => {
    return dispatch => {
        dispatch(fetch_ext_ip_table_start());
        dispatch(fetch_ext_ip_table_success(external_ip.message));
        // dispatch(fetch_ext_ip_table_fail(error.response.data.message));
    }
}

// ------------ Top Apps -------------- / /
export const fetch_ip_app_table_start = () => {
    return {
        type: actionType.MONITOR_TOP_APPS_START,
    }
}
export const fetch_ip_app_table_success = (data) => {
    return {
        type: actionType.MONITOR_TOP_APPS_SUCCESS,
        topAppsData: data,
    }
}

export const fetch_ip_app_table_fail = (error) => {
    return {
        type: actionType.MONITOR_TOP_APPS_FAIL,
        error: error,
    }
}

export const nullifyIpAppFail = () => {
    return {
        type: actionType.MONITOR_TOP_APPS_FAIL,
        error: null,
    }
}

export const fetchIpAppsDetails = (token, ip, from, to) => {

    return dispatch => {
        dispatch(fetch_ip_app_table_start());

        dispatch(fetch_ip_app_table_success(ip_apps.message));
        // dispatch(fetch_ip_app_table_fail(error.response.data.message));
    }
}

// ------------ Geo Traffic -------------- //
export const fetch_ip_city_table_start = () => {
    return {
        type: actionType.MONITOR_GEO_TRAFFIC_START,
    }
}
export const fetch_ip_city_table_success = (data) => {
    return {
        type: actionType.MONITOR_GEO_TRAFFIC_SUCCESS,
        geoTrafficData: data,
    }
}

export const fetch_ip_city_table_fail = (error) => {
    return {
        type: actionType.MONITOR_GEO_TRAFFIC_FAIL,
        error: error,
    }
}

export const nullifyIPCitiesError = () => {
    return {
        type: actionType.MONITOR_GEO_TRAFFIC_FAIL,
        error: null,
    }
}

export const fetchIpCitiesDetails = (token, ip, from, to) => {

    return dispatch => {

        dispatch(fetch_ip_city_table_start());
        dispatch(fetch_ip_city_table_success(ip_cities.message));
        // dispatch(fetch_ip_city_table_fail(error.response.data.message));

    }
}

// ------------ Isp Contributor -------------- //
export const fetch_isp_cont_graph_start = () => {
    return {
        type: actionType.MONITOR_ISP_CONTRIBUTOR_START,
    }
}
export const fetch_isp_cont_graph_success = (data) => {
    return {
        type: actionType.MONITOR_ISP_CONTRIBUTOR_SUCCESS,
        ispContributor: data,
    }
}

export const fetch_isp_cont_graph_fail = (error) => {
    return {
        type: actionType.MONITOR_ISP_CONTRIBUTOR_FAIL,
        error: error,
    }
}

export const nullifyISPContributorError = () => {
    return {
        type: actionType.MONITOR_ISP_CONTRIBUTOR_FAIL,
        error: null,
    }
}
export const fetchISPContDetails = (token, ip) => {
    return dispatch => {
        dispatch(fetch_isp_cont_graph_start());
        dispatch(fetch_isp_cont_graph_success(isp_contributor.message));
        // dispatch(fetch_isp_cont_graph_fail(error.response.data.message));

    }

}


// fecthing task
export const fetch_zoomview_task_start = () => {
    return {
        type: actionType.MONITOR_TASKS_START
    }
}
export const fetch_zoomview_task_success = (data) => {
    return {
        type: actionType.MONITOR_TASKS_SUCCESS,
        tasks: data,
    }
}

export const fetch_zoomview_task_fail = (error) => {
    return {
        type: actionType.MONITOR_TASKS_FAIL,
        error: error,
    }
}

export const nullifyTaskError = () => {
    return {
        type: actionType.MONITOR_TASKS_FAIL,
        error: null,
    }
}

export const fetchZoomViewTask = (token, ip) => {
    return dispatch => {
        dispatch(fetch_zoomview_task_start());
        dispatch(fetch_zoomview_task_success(tasks.message));
        // dispatch(fetch_zoomview_task_fail(error.response.data.message))

    }
}

// fecthing backup
export const fetch_zoomview_backup_start = () => {
    return {
        type: actionType.MONITOR_BACKUP_START
    }
}
export const fetch_zoomview_backup_success = (data) => {
    return {
        type: actionType.MONITOR_BACKUP_SUCCESS,
        backups: data,
    }
}

export const fetch_zoomview_backup_fail = (error) => {
    return {
        type: actionType.MONITOR_BACKUP_FAIL,
        error: error,
    }
}

export const nullifyBackupError = () => {
    return {
        type: actionType.MONITOR_BACKUP_FAIL,
        error: null,
    }
}

export const fetchZoomViewBackup = (token, ip) => {
    return dispatch => {
        dispatch(fetch_zoomview_backup_start());
        dispatch(fetch_zoomview_backup_success(zoom_view_backup.message));
        // dispatch(fetch_zoomview_backup_fail(error.response.data.message));
    }
}

// fecthing instances
export const fetch_zoomview_instances_start = () => {
    return {
        type: actionType.MONITOR_INSTANCES_START
    }
}
export const fetch_zoomview_instances_success = (data, ipArr) => {
    return {
        type: actionType.MONITOR_INSTANCES_SUCCESS,
        intancesList: data,
        ips: ipArr,
    }
}

export const fetch_zoomview_instances_fail = (error) => {
    return {
        type: actionType.MONITOR_INSTANCES_FAIL,
        error: error,
    }
}

export const fetchZoomViewInstances = (token, from, to, lip, wip) => {
    let lanip = lip;
    let wanip = wip;
    // console.log(lanip, wanip)}
    return dispatch => {
        dispatch(fetch_zoomview_instances_start());
        instnaces.message.map(inst => {
            lan_ips.push(inst.lan_ip);
        });

        lanip == '' ? lanip = instnaces.message[0].lan_ip : lanip = lanip;
        wanip == '' ? wanip = instnaces.message[0].wan_ip : wanip = wanip;
        sessionStorage.setItem('curr_selected_lip', lanip)
        sessionStorage.setItem('curr_selected_wip', wanip)
        dispatch(fetch_zoomview_instances_success(instnaces.message, lan_ips));
        dispatch(fetchInstanceVmInfo(token, lanip));
        dispatch(fetchZoomViewServices(token, lanip));
        dispatch(fetchZoomViewTask(token, lanip));
        dispatch(fetchZoomViewBackup(token, lanip))
        dispatch(fetchCpuChartDetails(token, lanip, from, to));
        dispatch(fetchCPULoadChartDetails(token, lanip, from, to));
        dispatch(fetchRAMChartDetails(token, lanip, from, to));
        dispatch(fetchHDDChartDetails(token, lanip, from, to));
        dispatch(fetchDiskIOSummaryDetails(token, lanip, from, to));
        dispatch(fetchInterfacesDetails(token, lanip, from, to));
        dispatch(fetchNoOfThreadsDetails(token, lanip, from, to));
        dispatch(fetchTCPConnectionsDetails(token, lanip, from, to));
        dispatch(fetchInternetDetails(token, wanip, from, to));
        dispatch(fetchExternalIPDetails(token, wanip, from, to));
        dispatch(fetchIpAppsDetails(token, wanip, from, to));
        dispatch(fetchIpCitiesDetails(token, wanip, from, to));
        dispatch(fetchISPContDetails(token, wanip));
        // dispatch(fetch_zoomview_instances_fail(error.response.data.message))
    }
}


export const fetchWithTimeSpan = (token, from, to, lanip, wanip) => {
    return dispatch => {
        dispatch(fetchZoomViewServices(token, lanip));
        dispatch(fetchInstanceVmInfo(token, lanip));
        dispatch(fetchZoomViewTask(token, lanip));
        dispatch(fetchZoomViewBackup(token, lanip))
        dispatch(fetchCpuChartDetails(token, lanip, from, to));
        dispatch(fetchCPULoadChartDetails(token, lanip, from, to));
        dispatch(fetchRAMChartDetails(token, lanip, from, to));
        dispatch(fetchHDDChartDetails(token, lanip, from, to));
        dispatch(fetchDiskIOSummaryDetails(token, lanip, from, to));
        dispatch(fetchInterfacesDetails(token, lanip, from, to));
        dispatch(fetchNoOfThreadsDetails(token, lanip, from, to));
        dispatch(fetchTCPConnectionsDetails(token, lanip, from, to));
        dispatch(fetchInternetDetails(token, wanip, from, to));
        dispatch(fetchExternalIPDetails(token, wanip, from, to));
        dispatch(fetchIpAppsDetails(token, wanip, from, to));
        dispatch(fetchIpCitiesDetails(token, wanip, from, to));
        dispatch(fetchISPContDetails(token, wanip));
    }
}