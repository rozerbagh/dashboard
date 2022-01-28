import instances_vm from '../../JSON/InstancesVM.json';
import instances_vm_status from '../../JSON/InstancesVMStatus.json'
import instanceNotifications from '../../JSON/InstnaceNotifications.json'
import * as actionType from './actionTypes';

export const fetchInstanceList_start = () => {
    return {
        type: actionType.INSTANCES_LISTS_START
    }
}
export const fetchInstanceList_success = (instances) => {
    return {
        type: actionType.INSTANCES_LISTS_SUCCESS,
        instList: instances,
    }
}

export const fetchInstanceList_fail = (error) => {
    return {
        type: actionType.INSTANCES_LISTS_FAIL,
        error: error,
    }
}

export const vm_status_start = () => {
    return {
        type: actionType.INSTANCE_STATUS_START
    }
}
export const vm_status_success = (vmStatus) => {
    return {
        type: actionType.INSTANCE_STATUS_SUCCESS,
        vmStatus: vmStatus,
    }
}

export const vm_status_fail = (error) => {
    return {
        type: actionType.INSTANCES_LISTS_START,
        statusError: error,
    }
}

export const fetch_vm_status = () => {
    return dispatch => {
        dispatch(vm_status_start());

        dispatch(vm_status_success(instances_vm_status.message));
        // dispatch(vm_status_fail(error))
    }
}


export const fetchInstances = (token) => {
    const ipArr = [];
    return dispatch => {
        dispatch(fetchInstanceList_start());
        dispatch(fetchInstanceList_success(instances_vm.message));
        dispatch(fetch_vm_status());
        // dispatch(fetchInstanceList_fail(error.response.data.message))
    }
}

export const InstanceNotifications_start = () => {
    return {
        type: actionType.INSTANCE_NOTIFICATIONS_START
    }
}
export const InstanceNotifications_success = (notifications) => {
    return {
        type: actionType.INSTANCE_NOTIFICATIONS_SUCCESS,
        instanceNotifications: notifications,
    }
}

export const InstanceNotifications_fail = (error) => {
    return {
        type: actionType.INSTANCE_NOTIFICATIONS_FAIL,
        error: error,
    }
}

export const fetchInstanceNotifications = (token, skip, limit, ip) => {
    return dispatch => {
        dispatch(InstanceNotifications_start());
        dispatch(InstanceNotifications_success(instanceNotifications.message));
        // dispatch(InstanceNotifications_fail(error.response.data.message));
    }
}