import * as actionType from './actionTypes';
import cloudConnectUsage from '../../JSON/CloudConnectConfig.json';
import cloudConnectChart from '../../JSON/CloudConnectGraph.json';
import cloudConnectInter from '../../JSON/CloudConnectInternalHost.json';
import cloudConnectintext from '../../JSON/CloudConnectIntExt.json';

export const fetch_cloud_connect_start = () => {
    return {
        type: actionType.CLOUD_CONNECT_START,
    }
}
export const fetch_cloud_connect_success = (data) => {
    return {
        type: actionType.CLOUD_CONNECT_SUCCESS,
        data: data,
    }
}
export const fetch_cloud_connect_fail = (error) => {
    return {
        type: actionType.CLOUD_CONNECT_FAIL,
        error: error
    }
}
export const fetchCloudConnects = (token) => {
    return dispatch => {
        dispatch(fetch_cloud_connect_start());
        dispatch(fetch_cloud_connect_success(cloudConnectUsage.message))
        // dispatch(fetch_cloud_connect_fail(error.response.data.message))
    }
}


export const fetch_cloud_connect_chart_start = () => {
    return {
        type: actionType.CLOUD_CONNECT_CHART_START,
    }
}
export const fetch_cloud_connect_chart_success = (data) => {
    return {
        type: actionType.CLOUD_CONNECT_CHART_SUCCESS,
        data: data,
        time_str: data.time_str,
        received: data.received,
        transmitted: data.transmitted,
    }
}
export const fetch_cloud_connect_chart_fail = (error) => {
    return {
        type: actionType.CLOUD_CONNECT_CHART_FAIL,
        error: error
    }
}
export const fetchCloudConnectsChart = () => {
    return dispatch => {
        dispatch(fetch_cloud_connect_chart_start());
        dispatch(fetch_cloud_connect_chart_success(cloudConnectChart.message))
        // dispatch(fetch_cloud_connect_chart_fail(error.response.data.message))
    }
}


export const fetch_cloud_connect_internal_host_start = () => {
    return {
        type: actionType.CLOUD_CONNECT_INTERNAL_HOST_START,
    }
}
export const fetch_cloud_connect_internal_host_success = (data) => {
    return {
        type: actionType.CLOUD_CONNECT_INTERNAL_HOST_SUCCESS,
        data: data,
    }
}
export const fetch_cloud_connect_internal_host_fail = (error) => {
    return {
        type: actionType.CLOUD_CONNECT_INTERNAL_HOST_FAIL,
        error: error
    }
}
export const fetchCloudConnectsInternalhost = () => {
    return dispatch => {
        dispatch(fetch_cloud_connect_internal_host_start());
        dispatch(fetch_cloud_connect_internal_host_success(cloudConnectInter.message))
        // dispatch(fetch_cloud_connect_internal_host_fail(error.response.data.message))
    }
}
// Internal to external
export const fetch_cloud_connect_internal_to_external_start = () => {
    return {
        type: actionType.CLOUD_CONNECT_INTERNAL_TO_EXTERNAL_START,
    }
}
export const fetch_cloud_connect_internal_to_external_success = (data) => {
    return {
        type: actionType.CLOUD_CONNECT_INTERNAL_TO_EXTERNAL_SUCCESS,
        data: data,
    }
}
export const fetch_cloud_connect_internal_to_external_fail = (error) => {
    return {
        type: actionType.CLOUD_CONNECT_INTERNAL_TO_EXTERNAL_FAIL,
        error: error
    }
}
export const fetchCloudConnectsInternalToExternal = (token, ip) => {
    return dispatch => {
        dispatch(fetch_cloud_connect_internal_to_external_start());
        if (ip === 225) {
            dispatch(fetch_cloud_connect_internal_to_external_success(cloudConnectintext.message_ip_225))
        } else if (ip === 226) {
            dispatch(fetch_cloud_connect_internal_to_external_success(cloudConnectintext.message_ip_226))
        } else {
            dispatch(fetch_cloud_connect_internal_to_external_success(cloudConnectintext.message_ip_oth))
        }
        // dispatch(fetch_cloud_connect_internal_to_external_fail(error.response.data.message))
    }
}


// ADD FORM FOR CLOUD CONNECTS
export const adding_cloud_connect_start = () => {
    return {
        type: actionType.ADD_CLOUD_CONNECT_START,
    }
}
export const adding_cloud_connect_success = (data) => {
    return {
        type: actionType.ADD_CLOUD_CONNECT_SUCCESS,
        data: data,
    }
}
export const adding_cloud_connect_fail = (error) => {
    return {
        type: actionType.ADD_CLOUD_CONNECT_FAIL,
        error: error
    }
}

export const addingCloudConnects = () => {
    return dispatch => {
        dispatch(adding_cloud_connect_start());
        dispatch(adding_cloud_connect_success('Can\'t added demo account'))
        // setTimeout(() => dispatch(adding_cloud_connect_success(null)), 5000)
        // dispatch(adding_cloud_connect_fail(error.response.data.message))
        // setTimeout(() => dispatch(adding_cloud_connect_fail(null)), 5000)
    }
}


export const editing_cloud_connect_start = () => {
    return {
        type: actionType.EDIT_CLOUD_CONNECT_START,
    }
}
export const editing_cloud_connect_success = (data) => {
    return {
        type: actionType.EDIT_CLOUD_CONNECT_SUCCESS,
        data: data,
    }
}
export const editing_cloud_connect_fail = (error) => {
    return {
        type: actionType.EDIT_CLOUD_CONNECT_FAIL,
        error: error
    }
}

export const editingCloudConnects = () => {
    return dispatch => {
        dispatch(editing_cloud_connect_start());
        dispatch(editing_cloud_connect_success('Can\'t added demo account'))
        // setTimeout(() => dispatch(editing_cloud_connect_success(null)), 5000)
        // dispatch(editing_cloud_connect_fail(error.response.data.message))
        // setTimeout(() => dispatch(editing_cloud_connect_fail(null)), 5000)
    }
}