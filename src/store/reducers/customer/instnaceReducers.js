import * as actionTypes from '../../actions/customer/actionTypes';

const initialState = {
    instances_list: [],
    vm_status: [],
    loading: true,
    statusLoading: true,
    notifyLoading: true,
    instance_error: null,
    instance_notifications: [],
    error: null,
    status_error: null,
}

const instanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INSTANCES_LISTS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.INSTANCES_LISTS_SUCCESS:
            return {
                ...state,
                instances_list: action.instList,
                loading: false,
                instance_error: null,
            }
        case actionTypes.INSTANCES_LISTS_FAIL:
            return {
                ...state,
                loading: false,
                instance_error: action.error,
            }

        case actionTypes.INSTANCE_NOTIFICATIONS_START:
            return {
                ...state,
                notifyLoading: true
            }
        case actionTypes.INSTANCE_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                instance_notifications: action.instanceNotifications,
                notifyLoading: false,
                error: null,
            }
        case actionTypes.INSTANCE_NOTIFICATIONS_FAIL:
            return {
                ...state,
                notifyLoading: false,
                error: action.error
            }

        // VM-STATUS
        case actionTypes.INSTANCE_STATUS_START:
            return {
                ...state,
                statusLoading: true
            }
        case actionTypes.INSTANCE_STATUS_SUCCESS:
            return {
                ...state,
                vm_status: action.vmStatus,
                statusLoading: false,
                status_error: null,
            }
        case actionTypes.INSTANCE_STATUS_FAIL:
            return {
                ...state,
                statusLoading: false,
                status_error: action.statusError
            }
        default:
            return state;
    }
}

export default instanceReducer;