import * as actionType from '../../actions/vendor/actionTypes';

const intialState = {
    coc_panel: null,
    token: null,
    vid: null,
    error: null,
    loading: false,
    vendor_number: null,
    vendor_name: null,
    vendor_avatar: null,
    authRedirectPath: "/vendor_login",
    isAuthenticated: null,

    fploading: false,
    fpemailvalid: false,
    fpOTPvalid: false,
    fpotpmsg: null,
    resetToken: null,
    errormsgfpemail: null,
    otpErrorMsg: null,

    resetPasswordLoading: false,
    resetPasswordSuccess: false,
    resetPassErrorMsg: null,
}

const authReducer = (state = intialState, action) => {
    switch (action.type) {
        case actionType.VENDOR_LOGIN_START:
            return {
                ...state,
                loading: true
            }
        case actionType.VENDOR_LOGIN_SUCCESS:
            return {
                ...state,
                coc_panel: 'vendor',
                token: action.vendorToken,
                vid: action.vendorId,
                error: null,
                loading: false,
                isAuthenticated: true,
                resetPasswordSuccess: false,
                vendor_number: action.vendor_number,
                vendor_name: action.name,
                vendor_avatar: action.avatar
            }
        case actionType.VENDOR_LOGIN_FAIL:
            return {
                ...state,
                token: null,
                uid: null,
                error: action.error,
                loading: false,
                isAuthenticated: false,
                vendor_number: null,
            }
        case actionType.LOGOUT:
            return {
                ...state,
                token: null,
                uid: null,
                error: null,
                loading: false,
                isAuthenticated: false,
                resetPasswordSuccess: false,
            }
        case actionType.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirectPath: action.path
            }


        // FORGOT PASSWORD TAKING EMAIL
        case actionType.FORGOT_PASSWORD_START_EMAIL:
            return {
                ...state,
                fploading: true,
            }
        case actionType.FORGOT_PASSWORD_SUCCESS_EMAIL:
            return {
                ...state,
                fploading: false,
                fpemailvalid: true,
                fpotpmsg: action.message,
            }
        case actionType.FORGOT_PASSWORD_FAIL_EMAIL:
            return {
                ...state,
                fploading: false,
                fpemailvalid: false,
                errormsgfpemail: action.error
            }

        // FORGOT PASSWORD TAKING OTP AND EMAIL
        case actionType.FORGOT_PASSWORD_START_OTP:
            return {
                ...state,
                fploading: true,
            }
        case actionType.FORGOT_PASSWORD_SUCCESS_OTP:
            return {
                ...state,
                fploading: false,
                fpOTPvalid: true,
                resetToken: action.reset_token
            }
        case actionType.FORGOT_PASSWORD_FAIL_OTP:
            return {
                ...state,
                fploading: false,
                fpOTPvalid: false,
                otpErrorMsg: action.error
            }

        // RESET PASSWORD
        case actionType.RESET_PASSWORD_START:
            return {
                ...state,
                resetPasswordLoading: true,
            }
        case actionType.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordLoading: false,
                resetPasswordSuccess: true,

            }
        case actionType.RESET_PASSWORD_FAIL:
            return {
                ...state,
                resetPasswordLoading: false,
                resetPassErrorMsg: action.error

            }
        default:
            return state
    }
}

export default authReducer;