import * as actionTypes from '../../actions/customer/actionTypes';

const initialState = {
    ip_data_list: [],
    ip_external_list: [],
    ip_apps_list: [],
    ip_cities_list: [],

    ip_report_data_list: [],
    loading: true,

    ip_data_error: null,
    ip_external_error: null,
    ip_app_error: null,
    ip_cities_error: null,

    ip_report_data_error: null
}

const reportsReducer = (state = initialState, action) => {
    switch (action.type) {

        // IP DATA - BANDWIDTH
        case actionTypes.IP_DATA_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.IP_DATA_SUCCESS:
            return {
                ...state,
                ip_data_list: action.ipData,
                loading: false,
            }
        case actionTypes.IP_DATA_FAIL:
            return {
                ...state,
                loading: false,
                ip_data_error: action.error,
            }


        // IP EXTERNAL - IP TRACKING
        case actionTypes.IP_EXTERNAL_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.IP_EXTERNAL_SUCCESS:
            return {
                ...state,
                ip_external_list: action.ipExternalData,
                loading: false,
            }
        case actionTypes.IP_EXTERNAL_FAIL:
            return {
                ...state,
                loading: false,
                ip_external_error: action.error,
            }

        // IP APPS - TOP APPS
        case actionTypes.IP_APPS_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.IP_APPS_SUCCESS:
            return {
                ...state,
                ip_apps_list: action.ipAppsData,
                loading: false,
            }
        case actionTypes.IP_APPS_FAIL:
            return {
                ...state,
                loading: false,
                ip_app_error: action.error,
            }

        // IP CITIES - GEO TRAFFIC
        case actionTypes.IP_CITIES_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.IP_CITIES_SUCCESS:
            return {
                ...state,
                ip_cities_list: action.ipCitiesData,
                loading: false,
            }
        case actionTypes.IP_CITIES_FAIL:
            return {
                ...state,
                loading: false,
                ip_cities_error: action.error,
            }
        // IP REPROT - GEO TRAFFIC
        case actionTypes.IP_REPORT_DATA_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.IP_REPORT_DATA_SUCCESS:
            return {
                ...state,
                ip_report_data_list: action.ipReportData,
                loading: false,
            }
        case actionTypes.IP_REPORT_DATA_FAIL:
            return {
                ...state,
                loading: false,
                ip_report_data_error: action.error,
            }
        default:
            return state;
    }
}

export default reportsReducer;