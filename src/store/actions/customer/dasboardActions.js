import dashboard_vm from '../../JSON/DashboardVM.json';
import dashboard_vm_status from '../../JSON/DashboardVMStatus.json';

import * as actionType from './actionTypes';

export const vm_fetch_start = () => {
    return {
        type: actionType.FETCH_USER_VM_START
    }
}

export const vm_fetch_success = (data, lanIPs, wanIPs) => {
    return {
        type: actionType.FETCH_USER_VM_SUCCESS,
        vm_data: data,
        lanips: lanIPs,
        wanips: wanIPs,
    }
}

export const vm_fetch_fail = (error) => {
    return {
        type: actionType.FETCH_USER_VM_FAIL,
        error: error
    }
}


export const vm_fetch_serviceStatus_start = () => {
    return {
        type: actionType.VM_SERVICES_STATUS_START,
    }
}
export const vm_fetch_serviceStatus_success = (data) => {
    return {
        type: actionType.VM_SERVICES_STATUS_SUCCESS,
        serviceBoxDetails: data,
    }
}
export const vm_fetch_serviceStatus_fail = (error) => {
    return {
        type: actionType.VM_SERVICES_STATUS_FAIL,
        error: error
    }
}
export const fetchServiceStatus = () => {
    return dispatch => {
        dispatch(vm_fetch_serviceStatus_start());
        dispatch(vm_fetch_serviceStatus_success(dashboard_vm_status.message))
        // dispatch(vm_fetch_serviceStatus_fail(error))
    }
}
// VM fetched 1st time with decryptions.
export const vm_fetched = (token) => {
    return dispatch => {
        dispatch(vm_fetch_start());
        dispatch(vm_fetch_success(dashboard_vm.message));
        dispatch(fetchServiceStatus())
    }
}

// Updates if server instances changes.
export const update_existing_vm_start = () => {
    return {
        type: actionType.UPDATES_EXISTING_VM_START,
    }
}

export const update_existing_vm_success = (data) => {
    return {
        type: actionType.UPDATES_EXISTING_VM_SUCCESS,
        updated_vm_data: data,
    }
}

export const update_existing_vm_fail = (error) => {
    return {
        type: actionType.UPDATES_EXISTING_VM_FAIL,
        error: error
    }
}

export const updates_existing_vm = (token, uid) => {
    return dispatch => {
        dispatch(update_existing_vm_start());
        const config = {
            headers: { authorization: `bearer ${token}` }
        }

    }
}
