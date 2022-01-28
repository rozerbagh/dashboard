import * as actionTypes from '../../actions/vendor/actionTypes';

const initialState = {
    intances_list: [],
    vm_infos: [],
    loading: true,
    lan_ips: [],
    services_list: [],
    tasks_list: [],
    backupsList: [],

    lan_ip: '',
    wan_ip: '',

    cpu_time: [],
    cpu_warn: [],
    cpu_crit: [],

    cpuDataTotal15: [],
    cpuDataTotal5: [],
    cpuDataTotal1: [],
    cpuLoadCrit: [],
    cpuLoadWarn: [],
    cpuCore: [],
    cpuLoadTime: [],

    ram_time: [],
    ramData: [],
    ramwarn: [],
    ramcrit: [],

    hddData: [],
    hdd_time: [],

    disk_io_time: [],
    diskThroughPutRead: [],
    diskThroughPutWrite: [],

    diskIOPSRead: [],
    diskIOPSWrite: [],

    diskAvgTimeAwaitRead: [],
    diskAvgTimeAwaitWrite: [],

    interfacesData: [],
    interface_time: [],

    internetTime: [],
    internetTotal: [],
    internetRecived: [],
    internetTransmitted: [],

    threads_time: [],
    noOfThreadsData: [],
    noOfThreadsDataLength: [],

    tcp_conn_time: [],
    tcp_conn_listen: [],
    tcp_conn_time_wait: [],
    tcp_conn_established: [],
    tcpConnectionsDataLength: [],
    graphsLoading: true,

    externalIPData: [],
    ipAppsData: [],
    ipCityData: [],
    ispContData: [],
    internetLoading: true,

    internetChartError: null,
    exernalIp_error: null,
    ipApp_error: null,
    ipCity_error: null,
    ispCont_error: null,

    loadingServices: true,
    loadingTasks: true,
    loadingBackup: true,
    serviceLoading: true,
    error: ''
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
                error: action.error
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
                loading: false
            }
        case actionTypes.MONITOR_INSTANCES_VM_INFO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
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
                services_list: [],
                loadingServices: false,
                error: action.error
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
                tasks_list: [],
                loadingTasks: false,
                error: action.error
            }

        // CPU CHART
        case actionTypes.MONITOR_CPU_GRAPHS_START:
            return {
                ...state,
                graphsLoading: true
            }
        case actionTypes.MONITOR_CPU_GRAPHS_SUCCESS:
            return {
                ...state,
                time_str: action.timeNum,
                cpu_time: action.time,
                cpuData: action.cpudata,
                cpu_warn: action.warn,
                cpu_crit: action.crit,
                graphsLoading: false,
            }
        case actionTypes.MONITOR_CPU_GRAPHS_FAIL:
            return {
                ...state,
                graphsLoading: false,
                error: action.error,
                time_str: [],
                cpu_time: [],
                cpu_warn: [],
                cpu_crit: [],
                cpuData: [],
            }

        // CPU LOAD CHART
        case actionTypes.MONITOR_CPU_LOAD_GRAPHS_START:
            return {
                ...state,
                graphsLoading: true
            }
        case actionTypes.MONITOR_CPU_LOAD_GRAPHS_SUCCESS:
            return {
                ...state,
                // graphTimeSpan: action.time,
                cpuDataTotal15: action.total,
                cpuDataTotal5: action.total5,
                cpuDataTotal1: action.total1,
                cpuCore: action.coreArr,
                cpuLoadCrit: action.crit,
                cpuLoadWarn: action.warn,
                cpuLoadTime: action.time,
                graphsLoading: false
            }
        case actionTypes.MONITOR_CPU_LOAD_GRAPHS_FAIL:
            return {
                ...state,
                graphsLoading: false,
                error: action.error,
                cpuDataTotal15: [],
                cpuDataTotal5: [],
                cpuDataTotal1: [],
                cpuCore: [],
                cpuLoadCrit: [],
                cpuLoadWarn: [],
                cpuLoadTime: [],
            }

        // RAM CHART
        case actionTypes.MONITOR_RAM_GRAPHS_START:
            return {
                ...state,
                graphsLoading: true
            }
        case actionTypes.MONITOR_RAM_GRAPHS_SUCCESS:
            return {
                ...state,
                // graphTimeSpan: action.time,
                ramData: action.ramdata,
                ram_time: action.time,
                ramwarn: action.warn,
                ramcrit: action.crit,
                graphsLoading: false
            }
        case actionTypes.MONITOR_RAM_GRAPHS_FAIL:
            return {
                ...state,
                graphsLoading: false,
                error: action.error,
                ramData: [],
                ram_time: [],
                ramwarn: [],
                ramcrit: [],
            }

        // HDD CHART
        case actionTypes.MONITOR_HDD_GRAPHS_START:
            return {
                ...state,
                graphsLoading: true
            }
        case actionTypes.MONITOR_HDD_GRAPHS_SUCCESS:
            return {
                ...state,
                // graphTimeSpan: action.time,
                hddData: action.hddData,
                hdd_time: action.time,
                graphsLoading: false
            }
        case actionTypes.MONITOR_HDD_GRAPHS_FAIL:
            return {
                ...state,
                graphsLoading: false,
                error: action.error,
                hddData: [],
                hdd_time: [],
            }

        // DIOS CHART
        case actionTypes.MONITOR_DISK_IO_GRAPHS_START:
            return {
                ...state,
                graphsLoading: true
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
                graphsLoading: false
            }
        case actionTypes.MONITOR_DISK_IO_GRAPHS_FAIL:
            return {
                ...state,
                graphsLoading: false,
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
                graphsLoading: true
            }
        case actionTypes.MONITOR_INTERFACES_GRAPHS_SUCCESS:
            return {
                ...state,
                // graphTimeSpan: action.time,
                interfacesData: action.interfacedata,
                interface_time: action.time,
                graphsLoading: false
            }
        case actionTypes.MONITOR_INTERFACES_GRAPHS_FAIL:
            return {
                ...state,
                graphsLoading: false,
                error: action.error,
                interfacesData: [],
                interface_time: [],
            }

        // NO OF THREADS CHART
        case actionTypes.MONITOR_NO_OF_THREADS_GRAPHS_START:
            return {
                ...state,
                graphsLoading: true
            }
        case actionTypes.MONITOR_NO_OF_THREADS_GRAPHS_SUCCESS:
            return {
                ...state,
                // graphTimeSpan: action.time,
                noOfThreadsData: action.noofThreads,
                noOfThreadsDataLength: action.length,
                threads_time: action.time,
                graphsLoading: false
            }
        case actionTypes.MONITOR_NO_OF_THREADS_GRAPHS_FAIL:
            return {
                ...state,
                graphsLoading: false,
                error: action.error,
                noOfThreadsData: [],
                noOfThreadsDataLength: 0,
                threads_time: [],
            }

        // TCP CONNECTIONS CHART
        case actionTypes.MONITOR_TCP_CONNECTIONS_GRAPHS_START:
            return {
                ...state,
                graphsLoading: true
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
                graphsLoading: false,
            }
        case actionTypes.MONITOR_TCP_CONNECTIONS_GRAPHS_FAIL:
            return {
                ...state,
                graphsLoading: false,
                error: action.error,
                tcp_conn_listen: [],
                tcp_conn_time_wait: [],
                tcp_conn_established: [],
                tcpConnectionsDataLength: 0,
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
                internetLoading: false
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
                internetLoading: false
            }
        case actionTypes.MONITOR_EXTERNAL_IP_FAIL:
            return {
                ...state,
                internetLoading: false,
                exernalIp_error: action.error,
                externalIPData: [],
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
                ipAppsData: action.topAppsData,
                internetLoading: false
            }
        case actionTypes.MONITOR_TOP_APPS_FAIL:
            return {
                ...state,
                internetLoading: false,
                ipApp_error: action.error,
                ipAppsData: [],
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
                internetLoading: false
            }
        case actionTypes.MONITOR_GEO_TRAFFIC_FAIL:
            return {
                ...state,
                internetLoading: false,
                ipCity_error: action.error,
                ipCityData: [],
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
                internetLoading: false
            }
        case actionTypes.MONITOR_ISP_CONTRIBUTOR_FAIL:
            return {
                ...state,
                internetLoading: false,
                ispCont_error: action.error,
                ispContData: [],
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
                loadingBackup: false,
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