import * as actionType from './actionTypes';
import userdata from '../../JSON/Users.json';
import userInstances from '../../JSON/UserInstnaces.json';
import userRoles from '../../JSON/UserRoles.json';
import userLogs from '../../JSON/UsersLogs.json';
export const fetchingSubUsers_start = () => {
    return {
        type: actionType.SUB_USERS_LIST_START
    }
}
export const fetchingSubUsers_success = (subUsersData) => {
    return {
        type: actionType.SUB_USERS_LIST_SUCCESS,
        subUsersList: subUsersData,
    }
}

export const fetchingSubUsers_fail = (error) => {
    return {
        type: actionType.SUB_USERS_LIST_FAIL,
        error: error,
    }
}

export const fetchSubUsers = (token) => {
    return dispatch => {
        dispatch(fetchingSubUsers_start());
        dispatch(fetchingSubUsers_success(userdata.message));
        // dispatch(fetchingSubUsers_fail(error.response.data.message))
    }
}

export const adding_sub_users_start = () => {
    return {
        type: actionType.ADD_SUB_USERS_START
    }
}
export const adding_sub_users_success = (message) => {
    return {
        type: actionType.ADD_SUB_USERS_SUCCESS,
        successMsg: message,
    }
}

export const adding_sub_users_fail = (error) => {
    return {
        type: actionType.ADD_SUB_USERS_FAIL,
        error: error,
    }
}


export const nullifyAddingUserSuccess = () => {
    return {
        type: actionType.ADD_SUB_USERS_SUCCESS,
        successMsg: null,
    }
}

export const nullifyAddingUserError = () => {
    return {
        type: actionType.ADD_SUB_USERS_FAIL,
        error: null,
    }
}

export const add_sub_users = (token, uid, sub_name, sub_email, sub_phone, iFlag) => {
    return dispatch => {
        dispatch(adding_sub_users_start());
        dispatch(adding_sub_users_success('User has been added'));
        setTimeout(() => dispatch(nullifyAddingUserSuccess()), 5000)
        // dispatch(adding_sub_users_fail(error.response.data.message));
    }
}

// edit
export const editing_sub_users_start = () => {
    return {
        type: actionType.EDIT_SUB_USERS_START
    }
}
export const editing_sub_users_success = (message) => {
    return {
        type: actionType.EDIT_SUB_USERS_SUCCESS,
        editData: message,
    }
}

export const editing_sub_users_fail = (error) => {
    return {
        type: actionType.EDIT_SUB_USERS_FAIL,
        error: error,
    }
}


export const edit_sub_users = (token, uid) => {
    return dispatch => {
        dispatch(editing_sub_users_start());
        dispatch(editing_sub_users_success('done'));
        // dispatch(editing_sub_users_fail(error.response.data.message))
    }
}

export const updating_sub_users_start = () => {
    return {
        type: actionType.UPDATE_SUB_USERS_START
    }
}
export const updating_sub_users_success = (msg) => {
    return {
        type: actionType.UPDATE_SUB_USERS_SUCCESS,
        successMsg: msg
    }
}

export const updating_sub_users_fail = (error) => {
    return {
        type: actionType.UPDATE_SUB_USERS_FAIL,
        error: error,
    }
}
export const mailEditSucMsgNUll = () => {
    return {
        type: actionType.UPDATE_SUB_USERS_SUCCESS,
        successMsg: null,
    }
}
export const mailEditErrMsgNUll = () => {
    return {
        type: actionType.UPDATE_SUB_USERS_FAIL,
        error: null,
    }
}

export const update_sub_users = (token, userId, sub_name, sub_email, sub_phone, sub_status) => {
    return dispatch => {
        dispatch(updating_sub_users_start());
        dispatch(updating_sub_users_success('The user details has been updated'));
        setTimeout(() => dispatch(mailEditSucMsgNUll()), 5000)
        // dispatch(updating_sub_users_fail(error.response.data.message));
    }
}

// password change
export const change_users_password_start = () => {
    return {
        type: actionType.CHANGE_PASSWORD_SUB_USERS_START
    }
}
export const change_users_password_success = (message) => {
    return {
        type: actionType.CHANGE_PASSWORD_SUB_USERS_SUCCESS,
        successMsg: message,
    }
}

export const change_users_password_fail = (error) => {
    return {
        type: actionType.CHANGE_PASSWORD_SUB_USERS_FAIL,
        error: error,
    }
}

export const pwdChangedSucMsgNUll = () => {
    return {
        type: actionType.CHANGE_PASSWORD_SUB_USERS_SUCCESS,
        successMsg: null,
    }
}
export const pwdChangedErrMsgNUll = () => {
    return {
        type: actionType.CHANGE_PASSWORD_SUB_USERS_FAIL,
        error: null,
    }
}

export const change_sub_users_password = (token, id, user_password) => {
    return dispatch => {
        dispatch(change_users_password_start());
        dispatch(change_users_password_success('Password has been changed'));
        setTimeout(() => dispatch(pwdChangedSucMsgNUll()), 5000)
        // dispatch(change_users_password_fail(error.response.data.message))
    }
}

export const fetching_logs_start = () => {
    return {
        type: actionType.FETCH_LOGS_SUB_USERS_START
    }
}
export const fetching_logs_success = (info) => {
    return {
        type: actionType.FETCH_LOGS_SUB_USERS_SUCCESS,
        logData: info
    }
}

export const fetching_logs_fail = (error) => {
    return {
        type: actionType.FETCH_LOGS_SUB_USERS_FAIL,
        error: error,
    }
}

export const log_sub_users = (token, userId) => {
    return dispatch => {
        dispatch(fetching_logs_start());
        dispatch(fetching_logs_success(userLogs.message));
        // dispatch(fetching_logs_fail(error.response.data.message))
    }
}




// delete subUsers
export const deleting_sub_users_start = () => {
    return {
        type: actionType.DELETE_SUB_USERS_START
    }
}
export const deleting_sub_users_success = (message) => {
    return {
        type: actionType.DELETE_SUB_USERS_SUCCESS,
        successMsg: message,
    }
}

export const deleting_sub_users_fail = (error) => {
    return {
        type: actionType.DELETE_SUB_USERS_FAIL,
        error: error,
    }
}
export const deleteSucMsgNUll = () => {
    return {
        type: actionType.DELETE_SUB_USERS_SUCCESS,
        successMsg: null,
    }
}
export const deleteErrMsgNUll = () => {
    return {
        type: actionType.DELETE_SUB_USERS_FAIL,
        error: null,
    }
}

export const delete_sub_users = (token, uid) => {
    const flag = -1;
    return dispatch => {
        dispatch(deleting_sub_users_start());
        dispatch(deleting_sub_users_success('The user has been deleted'));
        setTimeout(() => dispatch(deleteSucMsgNUll()), 5000)
        // dispatch(deleting_sub_users_fail(error.response.data.message))
    }
}

// fetching intances
export const fetch_users_instnaces_start = () => {
    return {
        type: actionType.FETCH_INSTANCES_START
    }
}
export const fetch_users_instnaces_success = (message) => {
    return {
        type: actionType.FETCH_INSTANCES_SUCCESS,
        instances: message,
    }
}

export const fetch_users_instnaces_fail = (error) => {
    return {
        type: actionType.FETCH_INSTANCES_FAIL,
        error: error,
    }
}

export const fetch_users_instances = (token, uid) => {
    return dispatch => {
        dispatch(fetch_users_instnaces_start());
        dispatch(fetch_users_instnaces_success(userInstances.message));
        // dispatch(fetch_users_instnaces_fail(error.response.data.message))
    }
}

// assigning instances
export const assign_user_instances_start = () => {
    return {
        type: actionType.ASSIGN_INSTANCES_START
    }
}
export const assign_user_instances_success = (message) => {
    return {
        type: actionType.ASSIGN_INSTANCES_SUCCESS,
        successMsg: message,
    }
}

export const assign_user_instances_fail = (error) => {
    return {
        type: actionType.ASSIGN_INSTANCES_FAIL,
        error: error,
    }
}

export const mailInstSucMsgNUll = () => {
    return {
        type: actionType.ASSIGN_INSTANCES_SUCCESS,
        successMsg: null,
    }
}
export const mailInstErrMsgNUll = () => {
    return {
        type: actionType.ASSIGN_INSTANCES_FAIL,
        error: null,
    }
}

export const assign_instances = (token, uid, ips) => {
    return dispatch => {
        dispatch(assign_user_instances_start());
        dispatch(assign_user_instances_success('Instances has been assigned'));
        setTimeout(() => dispatch(mailInstSucMsgNUll()), 5000)
        // dispatch(assign_user_instances_fail(error.response.data.message));
    }
}

// fetching roles
export const fetch_user_roles_start = () => {
    return {
        type: actionType.FETCH_ROLES_START
    }
}
export const fetch_user_roles_success = (message) => {
    return {
        type: actionType.FETCH_ROLES_SUCCESS,
        roles: message,
    }
}

export const fetch_user_roles_fail = (error) => {
    return {
        type: actionType.FETCH_ROLES_FAIL,
        error: error,
    }
}

export const fetch_roles = (token, id) => {
    return dispatch => {
        dispatch(fetch_user_roles_start());
        dispatch(fetch_user_roles_success(userRoles.rolesArr));
        // dispatch(fetch_user_roles_fail(error.response.data.message));
    }
}

// assign roles
export const assign_user_roles_start = () => {
    return {
        type: actionType.ASSIGN_ROLES_START
    }
}
export const assign_user_roles_success = (message) => {
    return {
        type: actionType.ASSIGN_ROLES_SUCCESS,
        successMsg: message,
    }
}

export const assign_user_roles_fail = (error) => {
    return {
        type: actionType.ASSIGN_ROLES_FAIL,
        error: error,
    }
}

export const nullifyRolesAssignSuccess = () => {
    return {
        type: actionType.ASSIGN_ROLES_SUCCESS,
        successMsg: null,
    }
}
export const nullifyRolesAssignError = () => {
    return {
        type: actionType.ASSIGN_ROLES_FAIL,
        error: null,
    }
}

export const assign_roles = (token, serviceId, reports, id) => {
    return dispatch => {
        dispatch(assign_user_roles_start());
        dispatch(assign_user_roles_success('Roles has been assigned'));
        setTimeout(() => dispatch(nullifyRolesAssignSuccess()), 5000)
        // dispatch(assign_user_roles_fail(error.response.data.message));
    }
}







// verify sub users mail 
export const verify_mail_start = () => {
    return {
        type: actionType.VERIFY_SUB_USER_MAIL_START
    }
}
export const verify_mail_success = (message) => {
    return {
        type: actionType.VERIFY_SUB_USER_MAIL_SUCCESS,
        msg: message,
    }
}

export const verify_mail_fail = (error) => {
    return {
        type: actionType.VERIFY_SUB_USER_MAIL_FAIL,
        error: error,
    }
}


export const mailSucMsgNUll = () => {
    return {
        type: actionType.VERIFY_SUB_USER_MAIL_SUCCESS,
        msg: null,
    }
}
export const mailErrMsgNUll = () => {
    return {
        type: actionType.VERIFY_SUB_USER_MAIL_FAIL,
        error: null,
    }
}

export const verify_mail = (token, email) => {
    return dispatch => {
        dispatch(verify_mail_start());
        dispatch(verify_mail_success('Verify Email has been sent'));
        setTimeout(() => dispatch(mailSucMsgNUll()), 5000)
        // dispatch(verify_mail_fail(error.response.data.message))
    }
}

