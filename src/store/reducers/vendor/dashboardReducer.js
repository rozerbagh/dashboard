import * as actionTypes from '../../actions/vendor/actionTypes';

const initialState = {
    customerList: [],
    adminVendorLoader: true,
    adminVendorError: null,

    deleteMessage: null,
    delCusError: null,

    vm_data: [],
    userLANIPArr: [],
    userWANIPArr: [],
    host_names: [],
    service_details: [],
    serviceBoxLoader: true,
    error: null,
    vm_error: null,

    loading: true,


    tags_suc_msg: null,
    tags_er_msg: null,

    tags_data: [],
    tagsPageLoading: true,

    asvLoader: true,
    assign_vendor_list: [],

    asvUpadteLoading: true,
    powerOnCustomerVm: [],

    removeingVendorSuccessMsg: null,
    removeingVendorErrorMsg: null,
    loadingWhileRemovingVendor: false,

}

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_CUSTOMER_START:
            return {
                ...state,
                adminVendorLoader: true
            }
        case actionTypes.FETCH_CUSTOMER_SUCCESS:
            return {
                ...state,
                customerList: action.customerList,
                adminVendorLoader: false,
            }
        case actionTypes.FETCH_CUSTOMER_FAIL:
            return {
                ...state,
                adminVendorLoader: false,
                adminVendorError: action.error
            }

        case actionTypes.FETCH_USER_VM_START:
            return {
                ...state,
                vmLoader: true
            }
        case actionTypes.FETCH_USER_VM_SUCCESS:
            return {
                ...state,
                userLANIPArr: action.lanips,
                userWANIPArr: action.wanips,
                vm_data: action.vm_data,
                vmLoader: false,
                vm_error: null,
            }
        case actionTypes.FETCH_USER_VM_FAIL:
            return {
                ...state,
                vmLoader: false,
                vm_error: action.error,
            }
        case actionTypes.VM_SERVICES_STATUS_START:
            return {
                ...state,
                serviceBoxLoader: false,
            }
        case actionTypes.VM_SERVICES_STATUS_SUCCESS:
            return {
                ...state,
                serviceBoxLoader: false,
                service_details: action.serviceBoxDetails,
            }
        case actionTypes.VM_SERVICES_STATUS_FAIL:
            return {
                ...state,
                vmLoader: false,
                serviceBoxLoader: false,
                error: action.error
            }



        case actionTypes.ADDING_TAGS_START:
            return {
                ...state,
                tagsLoader: true,
            }
        case actionTypes.ADDING_TAGS_SUCCESS:
            return {
                ...state,
                tagsLoader: false,
                tags_suc_msg: action.tagsSuccessMsg
            }
        case actionTypes.ADDING_TAGS_FAIL:
            return {
                ...state,
                tagsLoader: false,
                tags_er_msg: action.error,
            }

        case actionTypes.DASHBOARD_TAGS_START:
            return {
                ...state,
                tagsPageLoading: true,
            }
        case actionTypes.DASHBOARD_TAGS_SUCCESS:
            return {
                ...state,
                tagsPageLoading: false,
                tags_data: action.tagData,

            }
        case actionTypes.DASHBOARD_TAGS_FAIL:
            return {
                ...state,
                tagsPageLoading: false,
                tc_err: action.error,
            }

        case actionTypes.DELETE_CUSTOMER_START:
            return {
                ...state,
                adminVendorLoader: true,
            }
        case actionTypes.DELETE_CUSTOMER_SUCCESS:
            return {
                ...state,
                adminVendorLoader: false,
                deleteMessage: action.message,

            }
        case actionTypes.DELETE_CUSTOMER_FAIL:
            return {
                ...state,
                adminVendorLoader: false,
                delCusError: action.error,
            }
        default:
            return state;
    }
}

export default dashboardReducer;