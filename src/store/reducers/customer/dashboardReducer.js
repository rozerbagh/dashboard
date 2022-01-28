import * as actionTypes from '../../actions/customer/actionTypes';
import { findCommonElements } from '../../../components/Functions/Formatter'
const initialState = {
    vm_data: [],
    vm_updated: false,
    userLANIPArr: [],
    userWANIPArr: [],
    host_names: [],
    ticketsData: {},
    ticketsError: '',
    service_details: [],
    vmLoader: true,
    serviceBoxLoader: true,
    ticketsLoader: true,
    error: null,
    vm_error: null,

    loading: true,


    tags_suc_msg: null,
    tags_er_msg: null,

    outstandingMsg: {},
    outstandingError: '',

    tickets_count: {
        pending: '',
        closed: '',
    },
    tc_err: '',

    tags_data: [],
    tagsPageLoading: true,

    asvLoader: true,
    assign_vendor_list: [],

    asvUpadteLoading: true,
    powerOnCustomerVm: [],

    searchedVendor: [],
    searchingVendor: true,

    vendorsLists: [],
    loadingVendors: true,


    assigningSuccessMsg: null,
    assigningErrorMsg: null,
    msgLoading: false,
    assinging_vendor: false,


    removeingVendorSuccessMsg: null,
    removeingVendorErrorMsg: null,
    loadingWhileRemovingVendor: false,


    addVendorLoader: true,
    addVendorSucMsg: null,
    addVendorErrMsg: null,
}

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
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
            }

        case actionTypes.FETCH_USER_VM_FAIL:
            return {
                ...state,
                vmLoader: false,
                vm_error: action.error === 'null' ? null : action.error
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

        // Updates VM Instances

        case actionTypes.UPDATES_EXISTING_VM_START:
            return {
                ...state,
                // vmLoader: true
            }
        case actionTypes.UPDATES_EXISTING_VM_SUCCESS:
            if (state.vm_data.length === action.updated_vm_data.length) {
                const oldLanIps = [];
                const newLanIps = [];
                action.updated_vm_data.forEach((ele, index) => {
                    newLanIps.push(ele.lan_ip);
                })
                state.vm_data.forEach(ele => {
                    oldLanIps.push(ele.lan_ip);
                })
                let difference = newLanIps.filter(x => !oldLanIps.includes(x));
                return {
                    ...state,
                    vm_updated: difference.length > 0 ? true : false,
                }
            } else if (state.vm_data.length > action.updated_vm_data.length) {
                return {
                    ...state,
                    vm_updated: true,
                }
            } else if (state.vm_data.length < action.updated_vm_data.length) {
                return {
                    ...state,
                    vm_updated: true,
                }
            }


        case actionTypes.UPDATES_EXISTING_VM_FAIL:
            return {
                ...state,
                // vmLoader: false,
                // vm_error: action.error === 'null' ? null : action.error
            }

        // TICKETS
        case actionTypes.TICKETS_START:
            return {
                ...state,
                ticketsLoader: true,
            }
        case actionTypes.TICKETS_SUCCESS:
            return {
                ...state,
                ticketsLoader: false,
                ticketsData: action.tickets
            }
        case actionTypes.TICKETS_FAIL:
            return {
                ...state,
                ticketsLoader: false,
                ticketsError: action.error,
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


        case actionTypes.OUTSTANDING_BILLING_START:
            return {
                ...state,
                tagsLoader: true,
            }
        case actionTypes.OUTSTANDING_BILLING_SUCCESS:
            return {
                ...state,
                tagsLoader: false,
                outstandingMsg: action.SuccessMsg
            }
        case actionTypes.OUTSTANDING_BILLING_START:
            return {
                ...state,
                tagsLoader: false,
                outstandingError: action.error,
            }


        case actionTypes.TICKETS_COUNT_START:
            return {
                ...state,
                tc_loading: true,
            }
        case actionTypes.TICKETS_COUNT_SUCCESS:
            return {
                ...state,
                tc_loading: false,
                tickets_count: {
                    ...state.tickets_count,
                    pending: action.pendingTickets,
                    closed: action.closedTickets
                },
            }
        case actionTypes.TICKETS_COUNT_FAIL:
            return {
                ...state,
                tc_loading: false,
                tc_err: action.error,
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

        // ASSIGNED VENDOR
        case actionTypes.ASSIGNED_VENDOR_LIST_START:
            return {
                ...state,
                asvLoader: true,
            }
        case actionTypes.ASSIGNED_VENDOR_LIST_SUCCESS:
            return {
                ...state,
                asvLoader: false,
                assign_vendor_list: action.assignedVendorList,

            }
        case actionTypes.ASSIGNED_VENDOR_LIST_FAIL:
            return {
                ...state,
                asvLoader: false,
                error: action.error,
            }

        // UPDATE CUSTOMER LIST FOR ASSIGN VENDOR
        case actionTypes.UPDATE_CUSTOMER_VM_VENDOR_START:
            return {
                ...state,
                asvUpadteLoading: true,
            }
        case actionTypes.UPDATE_CUSTOMER_VM_VENDOR_SUCCESS:
            return {
                ...state,
                asvUpadteLoading: false,
                powerOnCustomerVm: action.customer_vms,

            }
        case actionTypes.UPDATE_CUSTOMER_VM_VENDOR_FAIL:
            return {
                ...state,
                asvUpadteLoading: false,
                error: action.error,
            }

        // SEARCH VENDOR
        case actionTypes.SEARCH_VENDOR_NAME_START:
            return {
                ...state,
                searchingVendor: true,
            }
        case actionTypes.SEARCH_VENDOR_NAME_SUCCESS:
            return {
                ...state,
                searchingVendor: false,
                searchedVendor: action.searchData,

            }
        case actionTypes.SEARCH_VENDOR_NAME_FAIL:
            return {
                ...state,
                searchingVendor: false,
                error: action.error,
            }

        // LISTING VENDOR
        case actionTypes.FETCH_VENDORS_LISTS_START:
            return {
                ...state,
                loadingVendors: true,
            }
        case actionTypes.FETCH_VENDORS_LISTS_SUCCESS:
            return {
                ...state,
                searchingVendor: false,
                vendorsLists: action.vendors,

            }
        case actionTypes.FETCH_VENDORS_LISTS_FAIL:
            return {
                ...state,
                loadingVendors: false,
                error: action.error,
            }

        // ASSIGNING VMS TO A PARTICULAR VENDOR
        case actionTypes.ASSIGNVM_VENDORS_START:
            return {
                ...state,
                msgLoading: true,
            }
        case actionTypes.ASSIGNVM_VENDORS_SUCCESS:
            return {
                ...state,
                msgLoading: false,
                assigningSuccessMsg: action.msg,
                assinging_vendor: action.assinging

            }
        case actionTypes.ASSIGNVM_VENDORS_FAIL:
            return {
                ...state,
                msgLoading: false,
                assigningErrorMsg: action.error,
                assinging_vendor: action.assinging
            }


        // REMOVING VENDOR
        case actionTypes.REMOVE_VENDOR_START:
            return {
                ...state,
                loadingWhileRemovingVendor: true,
            }
        case actionTypes.REMOVE_VENDOR_SUCCESS:
            return {
                ...state,
                loadingWhileRemovingVendor: false,
                removeingVendorSuccessMsg: action.removeVendorMsg,

            }
        case actionTypes.REMOVE_VENDOR_FAIL:
            return {
                ...state,
                loadingWhileRemovingVendor: false,
                removeingVendorErrorMsg: action.error,
            }


        // ADDING VENDOR
        case actionTypes.ADD_VENDOR_START:
            return {
                ...state,
                addVendorLoader: true,
            }
        case actionTypes.ADD_VENDOR_SUCCESS:
            return {
                ...state,
                addVendorLoader: false,
                addVendorSucMsg: action.addVendorMsg,

            }
        case actionTypes.ADD_VENDOR_FAIL:
            return {
                ...state,
                addVendorLoader: false,
                addVendorErrMsg: action.error,
            }

        default:
            return state;
    }
}

export default dashboardReducer;