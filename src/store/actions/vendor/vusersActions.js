import * as actionType from './actionTypes';
import vendors from '../../JSON/Vendors.json';
import map_customer from '../../JSON/VendorMapCustomer.json';

export const fetching_sub_vendor_start = () => {
    return {
        type: actionType.SUB_VENDORS_LIST_START
    }
}
export const fetching_sub_vendor_success = (subVendorsData) => {
    return {
        type: actionType.SUB_VENDORS_LIST_SUCCESS,
        subvendorsList: subVendorsData,
    }
}

export const fetching_sub_vendor_fail = (error) => {
    return {
        type: actionType.SUB_VENDORS_LIST_FAIL,
        error: error,
    }
}

export const fetchSubVendors = (token) => {
    return dispatch => {
        dispatch(fetching_sub_vendor_start());
        dispatch(fetching_sub_vendor_success(vendors.message));
        // dispatch(fetching_sub_vendor_fail(error.response.data.message))
    }
}

export const updateSubVendors = (token) => {
    return dispatch => {
        dispatch(fetching_sub_vendor_start());
        dispatch(fetching_sub_vendor_success(vendors.message));
        // dispatch(fetching_sub_vendor_fail(error.response.data.message))
    }
}


export const adding_sub_vendors_start = () => {
    return {
        type: actionType.ADD_SUB_VENDORS_START
    }
}
export const adding_sub_vendors_success = (message) => {
    return {
        type: actionType.ADD_SUB_VENDORS_SUCCESS,
        successMsg: message,
    }
}

export const adding_sub_vendors_fail = (error) => {
    return {
        type: actionType.ADD_SUB_VENDORS_FAIL,
        error: error,
    }
}
export const nullifySuccessMesage = () => {
    return {
        type: actionType.ADD_SUB_VENDORS_SUCCESS,
        successMsg: null,
    }
}

export const nullifyErrorMesage = () => {
    return {
        type: actionType.ADD_SUB_VENDORS_FAIL,
        error: null,
    }
}

export const add_sub_vendors = (token, vendor_name, vendor_email, vendor_phone) => {
    return dispatch => {
        dispatch(adding_sub_vendors_start());
        dispatch(adding_sub_vendors_success(vendors.message[0]));
        // dispatch(adding_sub_vendors_fail(error.response.data.message))
    }
}

// edit vendor
export const editing_sub_users_start = () => {
    return {
        type: actionType.EDIT_SUB_VENDORS_START
    }
}
export const editing_sub_users_success = (message) => {
    return {
        type: actionType.EDIT_SUB_VENDORS_SUCCESS,
        editData: message,
    }
}

export const editing_sub_users_fail = (error) => {
    return {
        type: actionType.EDIT_SUB_VENDORS_FAIL,
        error: error,
    }
}


export const edit_sub_users = (token, uid) => {
    return dispatch => {
        dispatch(editing_sub_users_start());
        // dispatch(editing_sub_users_success(vendors.message[0]));
        // dispatch(editing_sub_users_fail(error.response.data.message));
    }
}

export const updating_sub_users_start = () => {
    return {
        type: actionType.UPDATE_SUB_VENDORS_START
    }
}
export const updating_sub_users_success = (msg) => {
    return {
        type: actionType.UPDATE_SUB_VENDORS_SUCCESS,
        successMsg: msg
    }
}

export const updating_sub_users_fail = (error) => {
    return {
        type: actionType.UPDATE_SUB_VENDORS_FAIL,
        error: error,
    }
}
export const mailEditSucMsgNUll = () => {
    return {
        type: actionType.UPDATE_SUB_VENDORS_SUCCESS,
        successMsg: null,
    }
}
export const mailEditErrMsgNUll = () => {
    return {
        type: actionType.UPDATE_SUB_VENDORS_FAIL,
        error: null,
    }
}

export const update_sub_users = (token, uid, sub_name, sub_email, sub_phone) => {
    return dispatch => {
        dispatch(updating_sub_users_start());
        dispatch(updating_sub_users_success('Done'));
        // dispatch(updating_sub_users_fail(error.response.data.message))
    }
}

// password change
export const change_vendors_password_start = () => {
    return {
        type: actionType.CHANGE_PASSWORD_SUB_VENDORS_START
    }
}
export const change_vendors_password_success = (message) => {
    return {
        type: actionType.CHANGE_PASSWORD_SUB_VENDORS_SUCCESS,
        successMsg: message,
    }
}

export const change_vendors_password_fail = (error) => {
    return {
        type: actionType.CHANGE_PASSWORD_SUB_VENDORS_FAIL,
        error: error,
    }
}

export const pwdChangedSucMsgNUll = () => {
    return {
        type: actionType.CHANGE_PASSWORD_SUB_VENDORS_SUCCESS,
        successMsg: null,
    }
}
export const pwdChangedErrMsgNUll = () => {
    return {
        type: actionType.CHANGE_PASSWORD_SUB_VENDORS_FAIL,
        error: null,
    }
}

export const change_sub_vendors_password = (token, id, password) => {
    return dispatch => {
        dispatch(change_vendors_password_start());
        dispatch(change_vendors_password_success('Done'));
        // dispatch(change_vendors_password_fail(error.message))
    }
}


// delete sub vendors
export const deleting_sub_vendors_start = () => {
    return {
        type: actionType.DELETE_SUB_VENDORS_START
    }
}
export const deleting_sub_vendors_success = (message) => {
    return {
        type: actionType.DELETE_SUB_VENDORS_SUCCESS,
        successMsg: message,
    }
}

export const deleting_sub_vendors_fail = (error) => {
    return {
        type: actionType.DELETE_SUB_VENDORS_FAIL,
        error: error,
    }
}

export const deleteSucMsgNUll = () => {
    return {
        type: actionType.DELETE_SUB_VENDORS_SUCCESS,
        successMsg: null,
    }
}
export const deleteErrMsgNUll = () => {
    return {
        type: actionType.DELETE_SUB_VENDORS_FAIL,
        error: null,
    }
}

export const delete_sub_vendors = (token, vid) => {
    return dispatch => {
        dispatch(deleting_sub_vendors_start());
        dispatch(deleting_sub_vendors_success('Deleted'));
        // dispatch(deleting_sub_vendors_fail(error.response.data.message))
    }
}

// fetching map customers
export const fetch_maps_customers_start = () => {
    return {
        type: actionType.FETCH_MAP_CUSTOMERS_START
    }
}
export const fetch_maps_customers_success = (message) => {
    return {
        type: actionType.FETCH_MAP_CUSTOMERS_SUCCESS,
        customers: message,
    }
}

export const fetch_maps_customers_fail = (error) => {
    return {
        type: actionType.FETCH_MAP_CUSTOMERS_FAIL,
        error: error,
    }
}

export const fetch_map_customers = (token, vid) => {
    return dispatch => {
        dispatch(fetch_maps_customers_start());
        dispatch(fetch_maps_customers_success(map_customer.message));
        // dispatch(fetch_maps_customers_fail(error.response.data.message));
    }
}

// mapping customers
export const mapping_customers_start = () => {
    return {
        type: actionType.MAP_CUSTOMERS_START
    }
}
export const mapping_customers_success = (message) => {
    return {
        type: actionType.MAP_CUSTOMERS_SUCCESS,
        successMsg: message,
    }
}

export const mapping_customers_fail = (error) => {
    return {
        type: actionType.MAP_CUSTOMERS_FAIL,
        error: error,
    }
}

export const nullifyMappingCustomerSuccessMesage = () => {
    return {
        type: actionType.MAP_CUSTOMERS_SUCCESS,
        successMsg: null,
    }
}
export const nullifyMappingCustomerErrorMesage = () => {
    return {
        type: actionType.MAP_CUSTOMERS_FAIL,
        error: null,
    }
}

export const mapping_customers = (token, vid, ids) => {
    return dispatch => {
        dispatch(mapping_customers_start());
        dispatch(mapping_customers_success('Map customers'));
        // dispatch(mapping_customers_fail(error.response.data.message));
    }
}


// verify sub vendors mail 
export const verify_mail_start = () => {
    return {
        type: actionType.VERIFY_SUB_VENDOR_MAIL_START
    }
}
export const verify_mail_success = (message) => {
    return {
        type: actionType.VERIFY_SUB_VENDOR_MAIL_SUCCESS,
        msg: message,
    }
}

export const verify_mail_fail = (error) => {
    return {
        type: actionType.VERIFY_SUB_VENDOR_MAIL_FAIL,
        error: error,
    }
}


export const nullifyVerifySuccessMessage = () => {
    return {
        type: actionType.VERIFY_SUB_VENDOR_MAIL_SUCCESS,
        msg: null,
    }
}
export const nullifyVerifyErrorMessage = () => {
    return {
        type: actionType.VERIFY_SUB_VENDOR_MAIL_FAIL,
        error: null,
    }
}

export const verify_mail = (token, vid) => {
    return dispatch => {
        dispatch(verify_mail_start());
        dispatch(verify_mail_success('Done'));
        // dispatch(verify_mail_fail(error.response.data.message))
    }
}