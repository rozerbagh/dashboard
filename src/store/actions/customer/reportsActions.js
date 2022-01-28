import ip_reports from '../../JSON/IPReports.json'
import bandwidth_data from '../../JSON/Bandwidth.json';
import ip_tracking_data from '../../JSON/IPTracking.json';
import ip_apps from '../../JSON/IPApps.json';
import ip_cities from '../../JSON/IPCities.json';
import wanips from '../../JSON/ReportWanIp.json'
import * as actionType from './actionTypes';

// IP DATA - BANDWIDTH
export const fetchBandwidth_start = () => {
    return {
        type: actionType.IP_DATA_START
    }
}
export const fetchBandwidth_success = (data) => {
    return {
        type: actionType.IP_DATA_SUCCESS,
        ipData: data,
    }
}
export const fetchBandwidth_fail = (error) => {
    return {
        type: actionType.IP_DATA_FAIL,
        error: error,
    }
}

export const nullBandwidth_fail = () => {
    return {
        type: actionType.IP_DATA_FAIL,
        error: null,
    }
}

export const fetchBandwidthData = (token, from, to) => {

    return dispatch => {
        dispatch(fetchBandwidth_start());
        dispatch(fetchBandwidth_success(bandwidth_data.ip));
        // dispatch(fetchBandwidth_fail(error.response.data.message));
    }
}

const bandwidthData = (token, from, to) => {
    return dispatch => {
        dispatch(fetchBandwidth_start());
        dispatch(fetchBandwidth_success(bandwidth_data.ip));
        // dispatch(fetchBandwidth_fail(error.response.data.message));
    }
}

// IP External - IP TRACKING
export const fetchIPTracking_start = () => {
    return {
        type: actionType.IP_EXTERNAL_START
    }
}
export const fetchIPTracking_success = (data) => {
    return {
        type: actionType.IP_EXTERNAL_SUCCESS,
        ipExternalData: data,
    }
}
export const fetchIPTrackingh_fail = (error) => {
    return {
        type: actionType.IP_EXTERNAL_FAIL,
        error: error,
    }
}

export const fetchIPTrackingData = (token, from, to) => {

    return dispatch => {
        dispatch(fetchIPTracking_start());
        const wanips = [];
        // console.log(response.data.message);

        ip_tracking_data.message.map((listItem, index) => {
            wanips.push(listItem.wan_ip);
        })
        sessionStorage.setItem('wanips', JSON.stringify(wanips));
        dispatch(fetchIPTracking_success(ip_tracking_data.message));
        // dispatch(fetchIPTrackingh_fail(error.response.data.message))
    }
}

export const fetchIPTrackingDataWithIP = (token, from, to, ip) => {

    return dispatch => {
        dispatch(fetchIPTracking_start());
        dispatch(fetchIPTracking_success(ip_tracking_data.message));
        // dispatch(fetchIPTrackingh_fail(error.response.data.message))
    }
}

// IP Apps - TOP APPS
export const fetcTopApps_start = () => {
    return {
        type: actionType.IP_APPS_START
    }
}
export const fetcTopApps_success = (data) => {
    return {
        type: actionType.IP_APPS_SUCCESS,
        ipAppsData: data,
    }
}
export const fetchTopApps_fail = (error) => {
    return {
        type: actionType.IP_APPS_FAIL,
        error: error,
    }
}

export const fetchTopAppsData = (token, from, to) => {
    return dispatch => {
        dispatch(fetcTopApps_start());

        dispatch(fetcTopApps_success(ip_apps.message));
        // dispatch(fetchTopApps_fail(error.response.data.message))
    }
}

export const fetchTopAppsDataWithIP = (token, from, to, ip) => {
    return dispatch => {
        dispatch(fetcTopApps_start());

        dispatch(fetcTopApps_success(ip_apps.message));
        // dispatch(fetchTopApps_fail(error.response.data.message))
    }
}

// IP Cities - GEO TRAFFIC
export const fetcGeoTraffic_start = () => {
    return {
        type: actionType.IP_CITIES_START
    }
}
export const fetcGeoTraffic_success = (data) => {
    return {
        type: actionType.IP_CITIES_SUCCESS,
        ipCitiesData: data,
    }
}
export const fetchGeoTraffic_fail = (error) => {
    return {
        type: actionType.IP_CITIES_FAIL,
        error: error,
    }
}

export const fetchGeoTrafficData = (token, from, to) => {
    return dispatch => {
        dispatch(fetcGeoTraffic_start());

        dispatch(fetcGeoTraffic_success(ip_cities.message));
        // dispatch(fetchGeoTraffic_fail(error.response.data.message));
    }
}

export const fetchGeoTrafficDataWithIP = (token, from, to, ip) => {

    return dispatch => {
        dispatch(fetcGeoTraffic_start());
        dispatch(fetcGeoTraffic_success(ip_cities.message));
        // dispatch(fetchGeoTraffic_fail(error.response.data.message));
    }
}

// IP Cities - GEO TRAFFIC
export const fetcIPReport_start = () => {
    return {
        type: actionType.IP_REPORT_DATA_START
    }
}
export const fetcIPReport_success = (data) => {
    return {
        type: actionType.IP_REPORT_DATA_SUCCESS,
        ipReportData: data,
    }
}
export const fetchIPReport_fail = (error) => {
    return {
        type: actionType.IP_REPORT_DATA_FAIL,
        error: error,
    }
}

export const fetchIPReportData = (token, from, to) => {
    return dispatch => {
        dispatch(fetcIPReport_start());
        dispatch(bandwidthData(token, from, to));
        dispatch(fetcIPReport_success(ip_reports.message));
        // dispatch(fetchIPReport_fail(error.response.data.message));
    }
}

export const fetchIPReportDataWithIP = (token, from, to, ip) => {
    return dispatch => {
        dispatch(fetcIPReport_start());
        dispatch(bandwidthData(token, from, to))
        dispatch(fetcIPReport_success(ip_reports.message));
        // dispatch(fetchIPReport_fail(error.response.data.message));
    }
}
