import * as actionTypes from './customer/actionTypes';
import logindata from '../JSON/LoginDetails.json'
export function authStart() {
    return {
        type: actionTypes.LOGIN_START
    }
}

export function authSuccess(token, uid, customerNumber, name, usr_dp, roles, flag, panelType, companyName) {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        userToken: token,
        userId: uid,
        customer_number: customerNumber,
        name: name,
        avatar: usr_dp,
        roles: roles,
        userFlag: flag,
        cocPanelType: panelType,
        companyName: panelType === 'vendor' ? companyName : null
    }
}

export function authFail(error, type) {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error,
        loginType: type,
    }
}

export function logout() {
    localStorage.clear();
    return {
        type: actionTypes.LOGOUT,
        path: '/login'
    }
}
// session time out functionality
export const authTimeout = (expireTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expireTime)
    }
}

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

// this functions returns a functions which carries an argument as functions.
export function auth(email, password, panelType) {
    console.log("calling auth")
    return dispatch => {
        dispatch(authStart());
        const userDetails = {
            email: email,
            password: password
        };
        var ts = Math.round(new Date().getTime() / 1000);
        var tsTomorrow = ts + (24 * 3600);
        const expiresDate = (new Date(tsTomorrow).getTime()) * 1000
        const token = logindata.user.token;
        const uid = logindata.user.uid;
        const cid = logindata.user.customer_number;
        const name = logindata.user.name;
        const avatar = logindata.user.user_img_thumb;
        const userRoles = logindata.user.user_roles.reports;
        const userFlag = logindata.user.user_flag;
        localStorage.setItem('expiresTime', expiresDate);
        dispatch(authSuccess(token, uid, cid, name, avatar, userRoles, userFlag, panelType, 'Rozer'));
        dispatch(setAuthRedirectPath({
            path: '/coc/dasboard',
            search: '',
            hash: '',
            state: undefined,
        }));
        // if (email === 'demo@demo.com' && password === 'Demo@123') {

        // } else {
        //     dispatch(authFail('Email and Password didn\'t matched', panelType))
        // }

    }
}

export const checkAuthState = (path) => {
    return dispatch => {

        let state = localStorage.getItem('state')
        let stateObj = JSON.parse(state);
        // console.log(stateObj);
        const token = state === null ?
            window.location.reload() : stateObj.auth_reducer.token;
        const expiresTime = localStorage.getItem('expiresTime');

        if (!token || token === null || token === undefined) {
            dispatch(logout());
        } else {
            if (expiresTime < new Date().getTime()) {
                // console.log('expirestime is not upto the mark');
                dispatch(logout());
            }
            const uid = stateObj.auth_reducer.uid;
            const cid = stateObj.auth_reducer.customer_number;
            const name = stateObj.auth_reducer.user_name;
            const avatar = stateObj.auth_reducer.user_avatar;
            const userRoles = stateObj.auth_reducer.user_roles;
            const userFlag = stateObj.auth_reducer.user_flag;
            const panelType = stateObj.auth_reducer.coc_panel;
            const company_name = stateObj.auth_reducer.company_name;
            dispatch(authSuccess(token, uid, cid, name, avatar, userRoles, userFlag, panelType, company_name));
            dispatch(setAuthRedirectPath(path));
            dispatch(authTimeout(expiresTime - new Date().getTime()));
        }
    }
}


export function start_email() {
    return {
        type: actionTypes.FORGOT_PASSWORD_START_EMAIL,
    }
}
export function success_email(email, msg) {
    return {
        type: actionTypes.FORGOT_PASSWORD_SUCCESS_EMAIL,
        forgotPassEmail: email,
        message: msg,
    }
}

export function fail_email(error) {
    return {
        type: actionTypes.FORGOT_PASSWORD_FAIL_EMAIL,
        error: error,
    }
}

export function forgot_Password_Email(email) {
    return dispatch => {
        dispatch(start_email());
        // dispatch(success_email(email, response.data.message))
        // dispatch(fail_email(error.response.data.message))
    }
}

export function start_otp() {
    return {
        type: actionTypes.FORGOT_PASSWORD_START_OTP,
    }
}
export function success_otp(data, otp, email) {
    return {
        type: actionTypes.FORGOT_PASSWORD_SUCCESS_OTP,
        reset_token: data.token
    }
}

export function fail_otp(error) {
    return {
        type: actionTypes.FORGOT_PASSWORD_FAIL_OTP,
        error: error,
    }
}

export function forgot_Password_OTP(otp, email) {
    // const fpotp = forgotPasswordOTP(otp, email)
    return dispatch => {
        dispatch(start_otp());
        // dispatch(success_otp(response.data, otp, email))
        // dispatch(fail_otp(error.response.data.message))
    }
}




// RESET PASSWORD
export function reset_password_start() {
    return {
        type: actionTypes.RESET_PASSWORD_START,
    }
}
export function reset_password_success(msg) {
    return {
        type: actionTypes.RESET_PASSWORD_SUCCESS,
        msg: msg,
    }
}

export function reset_password_fail(error) {
    return {
        type: actionTypes.RESET_PASSWORD_FAIL,
        error: error,
    }
}

export function ResetPassword(token, password, confirm_password) {
    return dispatch => {
        dispatch(reset_password_start());
        // dispatch(reset_password_success(response.data.message));
        // dispatch(reset_password_fail(error.response.data.message));
    }
}

// Set Password
export function set_password_start() {
    return {
        type: actionTypes.SET_PASSWORD_START,
    }
}
export function set_password_success(msg) {
    return {
        type: actionTypes.SET_PASSWORD_SUCCESS,
        successmsg: msg,
        path: {
            path: '/login',
            search: '',
            hash: '',
            state: undefined,
        }
    }
}

export function set_password_fail(error) {
    return {
        type: actionTypes.SET_PASSWORD_FAIL,
        error: error,
    }
}

// Customer password restting
export const set_password = (token, password, confirm_password) => {
    return dispatch => {
        dispatch(set_password_start());
        // dispatch(set_password_success(response.data.message));
        // dispatch(set_password_fail(error.response.data.message));
    }
}
// Vendor password restting
export const vendor_set_password = (token, password, confirm_password) => {
    return dispatch => {
        dispatch(set_password_start());
        // dispatch(set_password_success(response.data.message));
        // dispatch(set_password_fail(error.response.data.message));
    }
}

// VENDOR ACCEPT
export function vendor_accept_start() {
    return {
        type: actionTypes.VENDOR_ACCEPT_START,
    }
}
export function vendor_accept_success(msg) {
    return {
        type: actionTypes.VENDOR_ACCEPT_SUCCESS,
        successmsg: msg,
    }
}

export function vendor_accept_fail(error) {
    return {
        type: actionTypes.VENDOR_ACCEPT_FAIL,
        error: error,
    }
}

export const vendor_accept = (token) => {
    // const vendorAcceptAPI = venorAccept(token)
    return dispatch => {
        dispatch(vendor_accept_start());
        // dispatch(vendor_accept_success(response.data.message));
        // dispatch(vendor_accept_fail(error.response.data.message));
    }
}

// VENDOR REJECT
export function vendor_reject_start() {
    return {
        type: actionTypes.VENDOR_REJECT_START,
    }
}
export function vendor_reject_success(msg) {
    return {
        type: actionTypes.VENDOR_REJECT_SUCCESS,
        successmsg: msg,
    }
}

export function vendor_reject_fail(error) {
    return {
        type: actionTypes.VENDOR_REJECT_FAIL,
        error: error,
    }
}

export const vendor_reject = (token) => {
    // const vendorRejectAPI = venorReject(token)
    return dispatch => {
        dispatch(vendor_reject_start());
        // dispatch(vendor_reject_success(response.data.message));
        // dispatch(vendor_reject_fail(error.response.data.message));
    }
}


export const set_login_coc_panel = (cocpanel) => {
    return {
        type: actionTypes.SET_LOGIN_COC_PANEL_TYPE,
        coc_panel: cocpanel,
    }
}

export const setLoginCOCPanel = (cocpanel) => {
    // console.log(cocpanel)
    return dispatch => {
        dispatch(set_login_coc_panel(cocpanel));
    }
}