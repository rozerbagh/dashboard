import * as actionTypes from '../../actions/customer/actionTypes';

const initialState = {
    intances_list: [],
    zoom_view_error: null,
    vm_infos: [],
    loading: true,
    lan_ips: [],
    services_list: [],
    tasks_list: [],
    backupsList: [],

    lan_ip: '',
    wan_ip: '',

    cpuLoading: true,
    cpu_time: [],
    cpu_data: [],
    cpu_warn: [],
    cpu_crit: [],

    cpuLoadLoading: true,
    cpuDataTotal15: [],
    cpuDataTotal5: [],
    cpuDataTotal1: [],
    cpuLoadCrit: [],
    cpuLoadWarn: [],
    cpuCore: [],
    cpuLoadTime: [],

    ramLoading: true,
    ram_time: [],
    ramData: [],
    ramwarn: [],
    ramcrit: [],

    hddLoading: true,
    hddData: [],
    hdd_time: [],

    diskSummaryLoading: true,
    disk_io_time: [],
    diskThroughPutRead: [],
    diskThroughPutWrite: [],

    diskIOPSRead: [],
    diskIOPSWrite: [],

    diskAvgTimeAwaitRead: [],
    diskAvgTimeAwaitWrite: [],

    interfacesLoading: true,
    interfacesData: [],
    interface_time: [],

    internetLoading: true,
    internetTime: [],
    internetTotal: [],
    internetRecived: [],
    internetTransmitted: [],
    internetChartError: null,

    threadsLoading: true,
    threads_time: [],
    noOfThreadsData: [],
    noOfThreadsDataLength: [],

    tcpLoading: true,
    tcp_conn_time: [],
    tcp_conn_listen: [],
    tcp_conn_time_wait: [],
    tcp_conn_established: [],
    tcpConnectionsDataLength: [],

    externalIPData: [],
    exernalIp_error: null,

    ipAppsData: [],
    ipApp_error: null,

    ipCityData: [],
    ipCity_error: null,

    ispContData: [],
    ispCont_error: null,

    internetLoading: true,

    loadingServices: true,
    loadingTasks: true,
    loadingBackup: true,
    loading: true,
    serviceLoading: true,
    error: null,
}

const zoomviewReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MONITOR_INSTANCES_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.MONITOR_INSTANCES_SUCCESS:
            return {
                ...state,
                intances_list: action.intancesList,
                lan_ips: action.ips,
                loading: false
            }
        case actionTypes.MONITOR_INSTANCES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
                intances_list: [],
            }

        // VM Info
        case actionTypes.MONITOR_INSTANCES_VM_INFO_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.MONITOR_INSTANCES_VM_INFO_SUCCESS:
            return {
                ...state,
                vm_infos: action.details,
                loading: false,
            }
        case actionTypes.MONITOR_INSTANCES_VM_INFO_FAIL:
            return {
                ...state,
                loading: false,
                zoom_view_error: action.error,
                vm_infos: [],
            }


        // Services
        case actionTypes.MONITOR_SERVICES_START:
            return {
                ...state,
                loadingServices: true
            }
        case actionTypes.MONITOR_SERVICES_SUCCESS:
            return {
                ...state,
                services_list: action.services,
                loadingServices: false
            }
        case actionTypes.MONITOR_SERVICES_FAIL:
            return {
                ...state,
                loadingServices: false,
                error: action.error,
                services_list: [],
            }


        // Tasks
        case actionTypes.MONITOR_TASKS_START:
            return {
                ...state,
                loadingTasks: true
            }
        case actionTypes.MONITOR_TASKS_SUCCESS:
            return {
                ...state,
                tasks_list: action.tasks,
                loadingTasks: false
            }
        case actionTypes.MONITOR_TASKS_FAIL:
            return {
                ...state,
                loadingTasks: false,
                error: action.error,
                tasks_list: [],
            }

        // CPU CHART
        case actionTypes.MONITOR_CPU_GRAPHS_START:
            return {
                ...state,
                cpuLoading: true
            }
        case actionTypes.MONITOR_CPU_GRAPHS_SUCCESS:
            return {
                ...state,
                time_str: action.timeNum,
                cpu_time: action.time,
                cpu_data: action.cpudata,
                cpu_warn: action.warn,
                cpu_crit: action.crit,
                cpuLoading: false,
            }
        case actionTypes.MONITOR_CPU_GRAPHS_FAIL:
            return {
                ...state,
                cpuLoading: false,
                error: action.error,
                time_str: [],
                cpu_time: [],
                cpu_data: [],
                cpu_warn: [],
                cpu_crit: [],
            }

        // CPU LOAD CHART
        case actionTypes.MONITOR_CPU_LOAD_GRAPHS_START:
            return {
                ...state,
                cpuLoadLoading: true
            }
        case actionTypes.MONITOR_CPU_LOAD_GRAPHS_SUCCESS:
            return {
                ...state,
                // graphTimeSpan: action.time,
                cpuDataTotal15: action.total,
                cpuDataTotal5: action.total5,
                cpuDataTotal1: action.total1,
                cpuLoadCrit: action.crit,
                cpuLoadWarn: action.warn,
                cpuCore: action.coreArr,
                cpuLoadTime: action.time,
                cpuLoadLoading: false,
            }
        case actionTypes.MONITOR_CPU_LOAD_GRAPHS_FAIL:
            return {
                ...state,
                cpuLoadLoading: false,
                error: action.error,
                cpuDataTotal15: [],
                cpuDataTotal5: [],
                cpuDataTotal1: [],
                cpuLoadCrit: [],
                cpuLoadWarn: [],
                cpuCore: [],
                cpuLoadTime: [],
            }

        // RAM CHART
        case actionTypes.MONITOR_RAM_GRAPHS_START:
            return {
                ...state,
                ramLoading: true
            }
        case actionTypes.MONITOR_RAM_GRAPHS_SUCCESS:
            return {
                ...state,
                // graphTimeSpan: action.time,
                ramData: action.ramdata,
                ramwarn: action.warn,
                ramcrit: action.crit,
                ram_time: action.time,
                ramLoading: false
            }
        case actionTypes.MONITOR_RAM_GRAPHS_FAIL:
            return {
                ...state,
                ramLoading: false,
                error: action.error,
                ramData: [],
                ramwarn: [],
                ramcrit: [],
                ram_time: [],
            }

        // HDD CHART
        case actionTypes.MONITOR_HDD_GRAPHS_START:
            return {
                ...state,
                hddLoading: true
            }
        case actionTypes.MONITOR_HDD_GRAPHS_SUCCESS:
            return {
                ...state,
                // graphTimeSpan: action.time,
                hddData: action.hddData,
                hdd_time: action.time,
                hddLoading: false,
            }
        case actionTypes.MONITOR_HDD_GRAPHS_FAIL:
            return {
                ...state,
                hddLoading: false,
                error: action.error,
                hddData: [],
                hdd_time: [],
            }

        // DIOS CHART
        case actionTypes.MONITOR_DISK_IO_GRAPHS_START:
            return {
                ...state,
                diskSummaryLoading: true,
            }
        case actionTypes.MONITOR_DISK_IO_GRAPHS_SUCCESS:
            return {
                ...state,
                // graphTimeSpan: action.time,
                diskThroughPutRead: action.dtpR,
                diskThroughPutWrite: action.dtpW,
                diskIOPSRead: action.diosR,
                diskIOPSWrite: action.diosW,
                diskAvgTimeAwaitRead: action.datwR,
                diskAvgTimeAwaitWrite: action.datwW,
                disk_io_time: action.time,
                diskSummaryLoading: false,
            }
        case actionTypes.MONITOR_DISK_IO_GRAPHS_FAIL:
            return {
                ...state,
                diskSummaryLoading: false,
                error: action.error,
                diskThroughPutRead: [],
                diskThroughPutWrite: [],
                diskIOPSRead: [],
                diskIOPSWrite: [],
                diskAvgTimeAwaitRead: [],
                diskAvgTimeAwaitWrite: [],
                disk_io_time: [],
            }

        // INTERFACES CHART
        case actionTypes.MONITOR_INTERFACES_GRAPHS_START:
            return {
                ...state,
                interfacesLoading: true
            }
        case actionTypes.MONITOR_INTERFACES_GRAPHS_SUCCESS:
            return {
                ...state,
                // graphTimeSpan: action.time,
                interfacesData: action.interfacedata,
                interface_time: action.time,
                interfacesLoading: false,
            }
        case actionTypes.MONITOR_INTERFACES_GRAPHS_FAIL:
            return {
                ...state,
                interfacesLoading: true,
                internetChartError: action.error,
                interfacesData: [],
                interface_time: [],
            }

        // NO OF THREADS CHART
        case actionTypes.MONITOR_NO_OF_THREADS_GRAPHS_START:
            return {
                ...state,
                threadsLoading: true
            }
        case actionTypes.MONITOR_NO_OF_THREADS_GRAPHS_SUCCESS:
            return {
                ...state,
                // graphTimeSpan: action.time,
                noOfThreadsData: action.noofThreads,
                noOfThreadsDataLength: action.length,
                threads_time: action.time,
                threadsLoading: false,
            }
        case actionTypes.MONITOR_NO_OF_THREADS_GRAPHS_FAIL:
            return {
                ...state,
                threadsLoading: false,
                error: action.error,
                noOfThreadsData: [],
                noOfThreadsDataLength: 0,
                threads_time: [],
            }

        // TCP CONNECTIONS CHART
        case actionTypes.MONITOR_TCP_CONNECTIONS_GRAPHS_START:
            return {
                ...state,
                tcpLoading: true
            }
        case actionTypes.MONITOR_TCP_CONNECTIONS_GRAPHS_SUCCESS:
            return {
                ...state,
                // graphTimeSpan: action.time,
                tcp_conn_listen: action.tcpConnListen,
                tcp_conn_time_wait: action.tcpConnTimeWait,
                tcp_conn_established: action.tcpConnEstb,
                tcpConnectionsDataLength: action.length,
                tcp_conn_time: action.time,
                tcpLoading: false
            }
        case actionTypes.MONITOR_TCP_CONNECTIONS_GRAPHS_FAIL:
            return {
                ...state,
                tcpLoading: false,
                error: action.error,
                tcp_conn_listen: [],
                tcp_conn_time_wait: [],
                tcp_conn_established: [],
                tcpConnectionsDataLength: [],
                tcp_conn_time: [],
            }

        // INTERNET LINE CHART
        case actionTypes.MONITOR_INTERNET_LINE_GRAPHS_START:
            return {
                ...state,
                internetLoading: true
            }
        case actionTypes.MONITOR_INTERNET_LINE_GRAPHS_SUCCESS:
            return {
                ...state,
                internetTotal: action.internetTotal,
                internetRecived: action.internetRecived,
                internetTransmitted: action.internetTransmitted,
                internetTime: action.time,
                wan_ip: action.wanip,
                internetLoading: false,
                internetChartError: null,
            }
        case actionTypes.MONITOR_INTERNET_LINE_GRAPHS_FAIL:
            return {
                ...state,
                internetLoading: false,
                internetChartError: action.error,
                internetTotal: [],
                internetRecived: [],
                internetTransmitted: [],
                internetTime: [],
                wan_ip: '',
            }

        // EXTERNAL IP TABLE
        case actionTypes.MONITOR_EXTERNAL_IP_START:
            return {
                ...state,
                internetLoading: true
            }
        case actionTypes.MONITOR_EXTERNAL_IP_SUCCESS:
            return {
                ...state,
                externalIPData: action.extIPData,
                exernalIp_error: null,
                internetLoading: false
            }
        case actionTypes.MONITOR_EXTERNAL_IP_FAIL:
            return {
                ...state,
                internetLoading: false,
                externalIPData: [],
                exernalIp_error: action.error,
            }

        // TOP APPS TABLE
        case actionTypes.MONITOR_TOP_APPS_START:
            return {
                ...state,
                internetLoading: true
            }
        case actionTypes.MONITOR_TOP_APPS_SUCCESS:
            return {
                ...state,
                ipApp_error: null,
                ipAppsData: action.topAppsData,
                internetLoading: false
            }
        case actionTypes.MONITOR_TOP_APPS_FAIL:
            return {
                ...state,
                internetLoading: false,
                ipAppsData: [],
                ipApp_error: action.error,
            }

        // GEO TRAFFIC TABLE
        case actionTypes.MONITOR_GEO_TRAFFIC_START:
            return {
                ...state,
                internetLoading: true
            }
        case actionTypes.MONITOR_GEO_TRAFFIC_SUCCESS:
            return {
                ...state,
                ipCityData: action.geoTrafficData,
                ipCity_error: null,
                internetLoading: false
            }
        case actionTypes.MONITOR_GEO_TRAFFIC_FAIL:
            return {
                ...state,
                internetLoading: false,
                ipCityData: [],
                ipCity_error: action.error
            }

        // ISP CONTRIBUTOR TABLE
        case actionTypes.MONITOR_ISP_CONTRIBUTOR_START:
            return {
                ...state,
                internetLoading: true
            }
        case actionTypes.MONITOR_ISP_CONTRIBUTOR_SUCCESS:
            return {
                ...state,
                ispContData: action.ispContributor,
                ispCont_error: null,
                internetLoading: false,
            }
        case actionTypes.MONITOR_ISP_CONTRIBUTOR_FAIL:
            return {
                ...state,
                internetLoading: false,
                ispContData: [],
                ispCont_error: action.error
            }


        // TASKS
        case actionTypes.MONITOR_TASKS_START:
            return {
                ...state,
                loadingTasks: true
            }
        case actionTypes.MONITOR_TASKS_SUCCESS:
            return {
                ...state,
                tasks_list: action.tasks,
                loadingTasks: false
            }
        case actionTypes.MONITOR_TASKS_FAIL:
            return {
                ...state,
                loadingTasks: false,
                error: action.error,
                tasks_list: [],
            }

        // BACKUPS
        case actionTypes.MONITOR_BACKUP_START:
            return {
                ...state,
                loadingBackup: true
            }
        case actionTypes.MONITOR_BACKUP_SUCCESS:
            return {
                ...state,
                backupsList: action.backups,
                loadingBackup: false
            }
        case actionTypes.MONITOR_BACKUP_FAIL:
            return {
                ...state,
                loadingBackup: false,
                error: action.error,
                backupsList: [],
            }
        default:
            return state;
    }
}

export default zoomviewReducers;