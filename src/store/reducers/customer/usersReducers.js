import * as actionTypes from '../../actions/customer/actionTypes';

const initialState = {
    sub_users_list: [],
    loading: true,
    error: null,
    user_error: null,

    adding_user_success: null,
    adding_user_error: null,

    loading_for_edit: true,
    edit_info: {},
    edit_success_msg: null,
    edit_error_msg: null,

    loading_for_log: true,
    log_info: [],

    loading_instances: true,
    instances_list: [],

    assign_inst_loader: false,
    assign_inst_successMsg: null,
    assign_inst_errorMsg: null,

    loading_roles: true,
    roles_list: [],
    assign_role_SucMessage: null,
    assign_role_ErrMessage: null,
    assignRoleLoader: true,

    pwd_changed_success: null,
    pwd_changed_fail: null,

    delete_success_msg: null,
    delete_error_msg: null,

    loading_mail_verification: true,
    verify_mail_suc_msg: null,
    verify_mail_err_msg: null,
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SUB_USERS_LIST_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SUB_USERS_LIST_SUCCESS:
            return {
                ...state,
                sub_users_list: action.subUsersList,
                loading: false
            }
        case actionTypes.SUB_USERS_LIST_FAIL:
            return {
                ...state,
                loading: false,
                user_error: action.error === 'null' ? null : action.error,
            }

        // adding sub users
        case actionTypes.ADD_SUB_USERS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ADD_SUB_USERS_SUCCESS:
            return {
                ...state,
                adding_user_success: action.successMsg,
                loading: false,
                adding_user_error: null,
            }
        case actionTypes.ADD_SUB_USERS_FAIL:
            return {
                ...state,
                loading: false,
                adding_user_error: action.error,
                adding_user_success: null,
            }

        // editing sub users
        case actionTypes.EDIT_SUB_USERS_START:
            return {
                ...state,
                loading_for_edit: true
            }
        case actionTypes.EDIT_SUB_USERS_SUCCESS:
            return {
                ...state,
                loading_for_edit: false,
                edit_info: action.editData
            }
        case actionTypes.EDIT_SUB_USERS_FAIL:
            return {
                ...state,
                loading_for_edit: false,
                error: action.error
            }

        // updating sub users
        case actionTypes.UPDATE_SUB_USERS_START:
            return {
                ...state,
                loading_for_edit: true
            }
        case actionTypes.UPDATE_SUB_USERS_SUCCESS:
            return {
                ...state,
                loading_for_edit: false,
                edit_success_msg: action.successMsg
            }
        case actionTypes.UPDATE_SUB_USERS_FAIL:
            return {
                ...state,
                loading_for_edit: false,
                edit_error_msg: action.error
            }

        // changing password for the sub users
        case actionTypes.CHANGE_PASSWORD_SUB_USERS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.CHANGE_PASSWORD_SUB_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                pwd_changed_success: action.successMsg,
            }
        case actionTypes.CHANGE_PASSWORD_SUB_USERS_FAIL:
            return {
                ...state,
                loading: false,
                pwd_changed_fail: action.error
            }

        // logs for the sub users
        case actionTypes.FETCH_LOGS_SUB_USERS_START:
            return {
                ...state,
                loading_for_log: true
            }
        case actionTypes.FETCH_LOGS_SUB_USERS_SUCCESS:
            return {
                ...state,
                loading_for_log: false,
                log_info: action.logData,
            }
        case actionTypes.FETCH_LOGS_SUB_USERS_FAIL:
            return {
                ...state,
                loading_for_log: false,
                error: action.error
            }


        // deleting sub users
        case actionTypes.DELETE_SUB_USERS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.DELETE_SUB_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                delete_success_msg: action.successMsg
            }
        case actionTypes.DELETE_SUB_USERS_FAIL:
            return {
                ...state,
                loading: false,
                delete_error_msg: action.error
            }


        // Fetching instances to the sub users
        case actionTypes.FETCH_INSTANCES_START:
            return {
                ...state,
                loading_instances: true
            }
        case actionTypes.FETCH_INSTANCES_SUCCESS:
            return {
                ...state,
                loading_instances: false,
                instances_list: action.instances
            }
        case actionTypes.FETCH_INSTANCES_FAIL:
            return {
                ...state,
                loading_instances: false,
                error: action.error
            }

        // assinging the instances to the sub users
        case actionTypes.ASSIGN_INSTANCES_START:
            return {
                ...state,
                assign_inst_loader: true
            }
        case actionTypes.ASSIGN_INSTANCES_SUCCESS:
            return {
                ...state,
                assign_inst_loader: false,
                assign_inst_successMsg: action.successMsg
            }
        case actionTypes.ASSIGN_INSTANCES_FAIL:
            return {
                ...state,
                assign_inst_loader: false,
                assign_inst_errorMsg: action.error
            }


        // assinging roles to the sub users
        case actionTypes.ASSIGN_ROLES_START:
            return {
                ...state,
                assignRoleLoader: true

            }
        case actionTypes.ASSIGN_ROLES_SUCCESS:
            return {
                ...state,
                assignRoleLoader: false,
                assign_role_SucMessage: action.successMsg

            }
        case actionTypes.ASSIGN_ROLES_FAIL:
            return {
                ...state,
                assignRoleLoader: false,
                assign_role_ErrMessage: action.error,
            }

        // Fetching roles to the sub users
        case actionTypes.FETCH_ROLES_START:
            return {
                ...state,
                loading_roles: true
            }
        case actionTypes.FETCH_ROLES_SUCCESS:
            return {
                ...state,
                loading_roles: false,
                roles_list: action.roles
            }
        case actionTypes.FETCH_ROLES_FAIL:
            return {
                ...state,
                loading_roles: false,
                error: action.error
            }


        // verifying mail for the sub users
        case actionTypes.VERIFY_SUB_USER_MAIL_START:
            return {
                ...state,
                loading_mail_verification: true
            }
        case actionTypes.VERIFY_SUB_USER_MAIL_SUCCESS:
            return {
                ...state,
                loading_mail_verification: false,
                verify_mail_suc_msg: action.msg
            }
        case actionTypes.VERIFY_SUB_USER_MAIL_FAIL:
            return {
                ...state,
                loading_mail_verification: false,
                verify_mail_err_msg: action.error
            }
        default:
            return state;
    }
}

export default usersReducer;