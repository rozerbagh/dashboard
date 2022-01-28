import * as actionTypes from '../../actions/customer/actionTypes';

const initialState = {
    user_details: [],
    loading: true,
    name_change_suc_msg: null,
    name_change_err_msg: null,
    error: null,
    error_message: null,

    pwd_change_suc_msg: null,
    pwd_change_err_msg: null,

    upload_img_suc_msg: null,
    upload_img_err_msg: null,

}

const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_USER_DETAILS_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_USER_DETAILS_SUCCESS:
            return {
                ...state,
                user_details: action.userDetails,
                loading: false,
            }
        case actionTypes.FETCH_USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error === 'null' ? null : action.error,
            }

        case actionTypes.UPDATE_USER_PASSWORD_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.UPDATE_USER_PASSWORD_SUCCESS:
            return {
                ...state,
                pwd_change_suc_msg: action.successMsg,
                loading: false,
            }
        case actionTypes.UPDATE_USER_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                pwd_change_err_msg: action.errorMsg
            }

        case actionTypes.UPDATE_USER_NAME_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.UPDATE_USER_NAME_SUCCESS:
            return {
                ...state,
                name_change_suc_msg: action.successMsg,
                loading: false,
            };
        case actionTypes.UPDATE_USER_NAME_FAIL:
            return {
                ...state,
                loading: false,
                name_change_err_msg: action.errorMsg
            }

        case actionTypes.UPLOAD_USER_IMG_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.UPLOAD_USER_IMG_SUCCESS:
            return {
                ...state,
                upload_img_suc_msg: action.successMsg,
                loading: false,
            };
        case actionTypes.UPLOAD_USER_IMG_FAIL:
            return {
                ...state,
                loading: false,
                upload_img_err_msg: action.errorMsg
            }
        default:
            return state;
    }
}

export default userProfileReducer;