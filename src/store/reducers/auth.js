import * as actionType from '../actions/customer/actionTypes';

const intialState = {
    login_coc_type: 'customer',
    coc_panel: null,
    token: null,
    uid: null,
    success_msg: null,
    vendorAuthError: null,
    customerAuthError: null,
    error: null,
    loading: false,
    customer_number: null,
    user_name: null,
    user_avatar: null,
    authRedirectPath: {
        path: "/login",
        search: '',
        hash: '',
        state: undefined,
    },
    isAuthenticated: null,
    user_roles: null,
    user_flag: null,
    company_name: null,

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

    set_password_success_msg: null,
}

const authReducer = (state = intialState, action) => {
    switch (action.type) {
        case actionType.LOGIN_START:
            return {
                ...state,
                loading: true
            }
        case actionType.LOGIN_SUCCESS:
            return {
                ...state,
                coc_panel: action.cocPanelType,
                token: action.userToken,
                uid: action.userId,
                error: null,
                loading: false,
                isAuthenticated: true,
                resetPasswordSuccess: false,
                customer_number: action.customer_number,
                user_name: action.name,
                user_avatar: action.avatar,
                user_roles: action.roles,
                user_flag: action.userFlag,
                company_name: action.companyName,
            }
        case actionType.LOGIN_FAIL:
            return {
                ...state,
                token: null,
                uid: null,
                loading: false,
                isAuthenticated: false,
                customer_number: null,
                vendorAuthError: action.loginType === 'vendor' ? action.error : null,
                customerAuthError: action.loginType === 'customer' ? action.error : null,
                authRedirectPath: {
                    path: "/login",
                    search: '',
                    hash: '',
                    state: undefined,
                },
            }
        case actionType.LOGOUT:
            return {
                ...state,
                coc_panel: null,
                token: null,
                uid: null,
                error: null,
                loading: false,
                customer_number: null,
                user_name: null,
                user_avatar: null,
                authRedirectPath: {
                    path: "/login",
                    search: '',
                    hash: '',
                    state: undefined,
                },
                isAuthenticated: null,
                user_roles: null,
                user_flag: null,

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

        // SET PASSWORD
        case actionType.SET_PASSWORD_START:
            return {
                ...state,
                loading: true,
            }
        case actionType.SET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                set_password_success_msg: action.successmsg,
                authRedirectPath: action.path,

            }
        case actionType.SET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        // VENDOR ACCEPTED
        case actionType.VENDOR_ACCEPT_START:
            return {
                ...state,
                loading: true,
            }
        case actionType.VENDOR_ACCEPT_SUCCESS:
            return {
                ...state,
                loading: false,
                success_msg: action.successmsg,

            }
        case actionType.VENDOR_ACCEPT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        // VENDOR REJECTED
        case actionType.VENDOR_REJECT_START:
            return {
                ...state,
                loading: true,
            }
        case actionType.VENDOR_REJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                success_msg: action.successmsg,

            }
        case actionType.VENDOR_REJECT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case actionType.SET_LOGIN_COC_PANEL_TYPE:
            return {
                ...state,
                login_coc_type: action.coc_panel,
            }

        case actionType.PROFILE_IMAGE_CHANGED:
            return {
                ...state,
                user_avatar: action.image,
            }
        default:
            return state
    }
}

export default authReducer;