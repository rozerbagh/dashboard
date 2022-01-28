import * as actionTypes from '../../actions/customer/actionTypes';

const initialState = {
    cc_list: [],
    cc_graphs_data: {},
    cc_graph_time: [],
    cc_graph_recieved: [],
    cc_graph_transmitted: [],
    cc_internal_host_data: [],
    cc_int_ext_data: [],
    cc_lists_loading: true,
    cc_graphs_loading: true,
    cc_internal_host_loading: true,
    cc_int_ext_loading: true,
    cc_list_error: null,
    cc_graphs_error: null,
    cc_internal_host_error: null,
    cc_int_ext_error: null,

    cc_add_loading: true,
    cc_add_suc_msg: null,
    cc_add_error_msg: null,
}

const cloudConnectReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLOUD_CONNECT_START:
            return {
                ...state,
                cc_lists_loading: setTimeout(() => true, 2000)
            }
        case actionTypes.CLOUD_CONNECT_SUCCESS:
            return {
                ...state,
                cc_list: action.data,
                cc_lists_loading: false,
                cc_list_error: null,
            }
        case actionTypes.CLOUD_CONNECT_FAIL:
            return {
                ...state,
                cc_lists_loading: false,
                cc_list_error: action.error,
                cc_list: [],
            }

        // CLOUD CONNECT CHART
        case actionTypes.CLOUD_CONNECT_CHART_START:
            return {
                ...state,
                cc_graphs_loading: setTimeout(() => true, 2000)
            }
        case actionTypes.CLOUD_CONNECT_CHART_SUCCESS:
            return {
                ...state,
                cc_graphs_data: action.data,
                cc_graph_time: action.time_str,
                cc_graph_recieved: action.received,
                cc_graph_transmitted: action.transmitted,
                cc_graphs_loading: false,
                cc_graphs_error: null,
            }
        case actionTypes.CLOUD_CONNECT_CHART_FAIL:
            return {
                ...state,
                cc_graphs_loading: false,
                cc_graphs_error: action.error,
                cc_graphs_data: {},
                cc_graph_time: [],
                cc_graph_recieved: [],
                cc_graph_transmitted: [],
            }

        // CLOUD CONNECT INTERNAL HOST
        case actionTypes.CLOUD_CONNECT_INTERNAL_HOST_START:
            return {
                ...state,
                cc_internal_host_loading: true
            }
        case actionTypes.CLOUD_CONNECT_INTERNAL_HOST_SUCCESS:
            return {
                ...state,
                cc_internal_host_data: action.data,
                cc_internal_host_loading: false,
                cc_internal_host_error: null,
            }
        case actionTypes.CLOUD_CONNECT_INTERNAL_HOST_FAIL:
            return {
                ...state,
                cc_internal_host_loading: false,
                cc_internal_host_error: action.error,
                cc_internal_host_data: [],
            }

        // CLOUD CONNECT INTERNAL HOST
        case actionTypes.CLOUD_CONNECT_INTERNAL_TO_EXTERNAL_START:
            return {
                ...state,
                cc_int_ext_loading: true
            }
        case actionTypes.CLOUD_CONNECT_INTERNAL_TO_EXTERNAL_SUCCESS:
            return {
                ...state,
                cc_int_ext_data: action.data,
                cc_int_ext_loading: false,
                cc_int_ext_error: null,
            }
        case actionTypes.CLOUD_CONNECT_INTERNAL_TO_EXTERNAL_FAIL:
            return {
                ...state,
                cc_int_ext_loading: false,
                cc_int_ext_error: action.error,
                cc_int_ext_data: [],
            }

        // CLOUD CONNECT ADDING CONNECT
        case actionTypes.ADD_CLOUD_CONNECT_START:
            return {
                ...state,
                cc_add_loading: true
            }
        case actionTypes.ADD_CLOUD_CONNECT_SUCCESS:
            return {
                ...state,
                cc_add_loading: false,
                cc_add_suc_msg: action.data,
                cc_add_error_msg: null,
            }
        case actionTypes.ADD_CLOUD_CONNECT_FAIL:
            return {
                ...state,
                cc_add_loading: false,
                cc_add_error_msg: action.error,
                cc_add_suc_msg: null,
            }

        // CLOUD CONNECT EDITING CONNECT
        case actionTypes.EDIT_CLOUD_CONNECT_START:
            return {
                ...state,
                cc_add_loading: true
            }
        case actionTypes.EDIT_CLOUD_CONNECT_SUCCESS:
            return {
                ...state,
                cc_add_loading: false,
                cc_add_suc_msg: action.data,
                cc_add_error_msg: null,
            }
        case actionTypes.EDIT_CLOUD_CONNECT_FAIL:
            return {
                ...state,
                cc_add_loading: false,
                cc_add_error_msg: action.error,
                cc_add_suc_msg: null,
            }

        default:
            return state;
    }
}

export default cloudConnectReducer;