import dashboard_vm from '../../JSON/DashboardVM.json';
import dashboard_vm_status from '../../JSON/DashboardVMStatus.json';
import * as actionType from './actionTypes';

export const vm_fetch_start = () => {
    return {
        type: actionType.FETCH_USER_VM_START,
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

export const fetchServiceStatus = (token, id, ip) => {
    return dispatch => {
        dispatch(vm_fetch_serviceStatus_start());
        dispatch(vm_fetch_serviceStatus_success(dashboard_vm_status.message))
    }
}

// Fetching the vm for the first time where the data decryption is required 
export const fetch_vm = (token, id) => {
    let lan_ips = [];
    let wan_ips = [];
    return dispatch => {
        dispatch(vm_fetch_start());
        dispatch(vm_fetch_success(dashboard_vm.message));
        dispatch(fetchServiceStatus())
    }
}


