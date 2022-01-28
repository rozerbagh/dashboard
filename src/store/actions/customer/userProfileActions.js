import * as actionType from './actionTypes';
import profile_data from '../../JSON/UserProfile.json';
export const fetching_user_details_start = () => {
    return {
        type: actionType.FETCH_USER_DETAILS_START
    }
}
export const fetching_user_details_success = (profile_details) => {
    return {
        type: actionType.FETCH_USER_DETAILS_SUCCESS,
        userDetails: profile_details,
    }
}

export const fetching_user_details_fail = (error) => {
    return {
        type: actionType.FETCH_USER_DETAILS_FAIL,
        error: error,
    }
}

export const fetch_user_details = (token) => {
    return dispatch => {
        dispatch(fetching_user_details_start());
        dispatch(fetching_user_details_success(profile_data.message));
        // dispatch(fetching_user_details_fail(error.response.data.message));
    }
}

export const update_password_start = () => {
    return {
        type: actionType.UPDATE_USER_PASSWORD_START
    }
}
export const update_password_success = (success_message) => {
    return {
        type: actionType.UPDATE_USER_PASSWORD_SUCCESS,
        successMsg: success_message,
    }
}

export const update_password_fail = (error) => {
    return {
        type: actionType.UPDATE_USER_PASSWORD_FAIL,
        errorMsg: error,
    }
}

export const updatePasswordSucMsgNUll = () => {
    return {
        type: actionType.UPDATE_USER_PASSWORD_SUCCESS,
        successMsg: null,
    }
}
export const updatePasswordErrMsgNUll = () => {
    return {
        type: actionType.UPDATE_USER_PASSWORD_FAIL,
        errorMsg: null,
    }
}

export const update_password = (token, password, confirm_password, old_password) => {
    return dispatch => {
        dispatch(update_password_start());
        dispatch(update_password_success('Done'));
        // dispatch(update_password_fail(error.response.data.message))
    }
}

export const update_name_start = () => {
    return {
        type: actionType.UPDATE_USER_NAME_START
    }
}
export const update_name_success = (success_message) => {
    return {
        type: actionType.UPDATE_USER_NAME_SUCCESS,
        successMsg: success_message,
    }
}

export const update_name_fail = (error) => {
    return {
        type: actionType.UPDATE_USER_NAME_FAIL,
        errorMsg: error,
    }
}

export const updateNameSucMsgNUll = () => {
    return {
        type: actionType.UPDATE_USER_NAME_SUCCESS,
        successMsg: null,
    }
}
export const updateNameErrMsgNUll = () => {
    return {
        type: actionType.UPDATE_USER_NAME_FAIL,
        errorMsg: null,
    }
}

export const update_name = (token, name) => {
    return dispatch => {
        dispatch(update_name_start());
        dispatch(update_name_success('Done'));
        // dispatch(update_name_fail(error.response.data.message))
    }
}


export const upload_image_start = () => {
    return {
        type: actionType.UPLOAD_USER_IMG_START
    }
}
export const upload_image_success = (success_message) => {
    return {
        type: actionType.UPLOAD_USER_IMG_SUCCESS,
        successMsg: success_message,
    }
}

export const upload_image_fail = (error) => {
    return {
        type: actionType.UPLOAD_USER_IMG_FAIL,
        errorMsg: error,
    }
}

export const uploadImgSucMsgNUll = () => {
    return {
        type: actionType.UPLOAD_USER_IMG_SUCCESS,
        successMsg: null,
    }
}
export const uploadImgErrMsgNUll = () => {
    return {
        type: actionType.UPLOAD_USER_IMG_FAIL,
        errorMsg: null,
    }
}

export const upload_image = (token, img, thumbImg) => {
    return dispatch => {
        dispatch(upload_image_start());
        dispatch(upload_image_success('Done'));
        // dispatch(upload_image_fail(error.response.data.message))
    }
}

export const profileImageChanged = (image) => {
    return {
        type: actionType.PROFILE_IMAGE_CHANGED,
        image: image,
    }
}