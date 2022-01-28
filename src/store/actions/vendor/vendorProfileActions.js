import vendor_details from '../../JSON/VendorProfile.json'
import * as actionType from './actionTypes';

export const fetching_vendor_details_start = () => {
    return {
        type: actionType.FETCH_VENDOR_DETAILS_START
    }
}
export const fetching_vendor_details_success = (profile_details) => {
    return {
        type: actionType.FETCH_VENDOR_DETAILS_SUCCESS,
        vendorDetails: profile_details,
    }
}

export const fetching_vendor_details_fail = (error) => {
    return {
        type: actionType.FETCH_VENDOR_DETAILS_FAIL,
        error: error,
    }
}

export const fetch_vendor_details = (token, vendorID) => {
    return dispatch => {
        dispatch(fetching_vendor_details_start());
        dispatch(fetching_vendor_details_success(vendor_details.message));
        // dispatch(fetching_vendor_details_fail(error.response.data.message));
    }
}

export const update_password_start = () => {
    return {
        type: actionType.UPDATE_VENDOR_PASSWORD_START
    }
}
export const update_password_success = (success_message) => {
    return {
        type: actionType.UPDATE_VENDOR_PASSWORD_SUCCESS,
        successMsg: success_message,
    }
}

export const update_password_fail = (error) => {
    return {
        type: actionType.UPDATE_VENDOR_PASSWORD_FAIL,
        errorMsg: error,
    }
}

export const update_password = (token, vid, password, oldPassword) => {
    return dispatch => {
        dispatch(update_password_start());
        dispatch(update_password_success('Done'));
        // dispatch(update_password_fail(error.response.data.message))
    }
}

export const update_details_start = () => {
    return {
        type: actionType.UPDATE_VENDOR_NAME_START
    }
}
export const update_details_success = (success_message) => {
    return {
        type: actionType.UPDATE_VENDOR_NAME_SUCCESS,
        successMsg: success_message,
    }
}

export const update_details_fail = (error) => {
    return {
        type: actionType.UPDATE_VENDOR_NAME_FAIL,
        errorMsg: error,
    }
}

export const nullifySuccessMessage = () => {
    return {
        type: actionType.UPDATE_VENDOR_NAME_SUCCESS || actionType.UPDATE_VENDOR_PASSWORD_SUCCESS,
        successMsg: null,
    }
}

export const nullifyErrorMessage = () => {
    return {
        type: actionType.UPDATE_VENDOR_NAME_FAIL || actionType.UPDATE_VENDOR_PASSWORD_FAIL,
        errorMsg: null,
    }
}

export const update_details = (token, vid, vendor_name, vendor_email, vendor_phone) => {
    return dispatch => {
        dispatch(update_details_start());
        dispatch(update_details_success('Done'));
        // dispatch(update_details_fail(error.response.data.message));
    }
}
