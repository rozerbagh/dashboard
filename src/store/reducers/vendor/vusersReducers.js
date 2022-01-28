import * as actionTypes from '../../actions/vendor/actionTypes';

const initialState = {
    sub_vendors_list: [],
    loading: true,
    error: null,
    vendor_error: null,
    success_mesage: null,

    loading_for_edit: true,
    edit_info: {},
    edit_success_msg: null,
    edit_error_msg: null,

    loading_for_log: true,
    log_info: [],

    loading_customers: true,
    customers_list: [],

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
        case actionTypes.SUB_VENDORS_LIST_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SUB_VENDORS_LIST_SUCCESS:
            return {
                ...state,
                sub_vendors_list: action.subvendorsList,
                loading: false
            }
        case actionTypes.SUB_VENDORS_LIST_FAIL:
            return {
                ...state,
                loading: false,
                vendor_error: action.error === 'null' ? null : action.error,
            }

        // adding sub users
        case actionTypes.ADD_SUB_VENDORS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ADD_SUB_VENDORS_SUCCESS:
            return {
                ...state,
                success_mesage: action.successMsg,
                loading: false
            }
        case actionTypes.ADD_SUB_VENDORS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        // editing sub vendors
        case actionTypes.EDIT_SUB_VENDORS_START:
            return {
                ...state,
                loading_for_edit: true
            }
        case actionTypes.EDIT_SUB_VENDORS_SUCCESS:
            return {
                ...state,
                loading_for_edit: false,
                edit_info: action.editData
            }
        case actionTypes.EDIT_SUB_VENDORS_FAIL:
            return {
                ...state,
                loading_for_edit: false,
                error: action.error
            }

        // updating sub users
        case actionTypes.UPDATE_SUB_VENDORS_START:
            return {
                ...state,
                loading_for_edit: true
            }
        case actionTypes.UPDATE_SUB_VENDORS_SUCCESS:
            return {
                ...state,
                loading_for_edit: false,
                edit_success_msg: action.successMsg
            }
        case actionTypes.UPDATE_SUB_VENDORS_FAIL:
            return {
                ...state,
                loading_for_edit: false,
                edit_error_msg: action.error
            }

        // changing password for the sub users
        case actionTypes.CHANGE_PASSWORD_SUB_VENDORS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.CHANGE_PASSWORD_SUB_VENDORS_SUCCESS:
            return {
                ...state,
                loading: false,
                pwd_changed_success: action.successMsg,
            }
        case actionTypes.CHANGE_PASSWORD_SUB_VENDORS_FAIL:
            return {
                ...state,
                loading: false,
                pwd_changed_fail: action.error
            }


        // deleting sub users
        case actionTypes.DELETE_SUB_VENDORS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.DELETE_SUB_VENDORS_SUCCESS:
            return {
                ...state,
                loading: false,
                delete_success_msg: action.successMsg
            }
        case actionTypes.DELETE_SUB_VENDORS_FAIL:
            return {
                ...state,
                loading: false,
                delete_error_msg: action.error
            }


        // Fetching customers to the sub users
        case actionTypes.FETCH_MAP_CUSTOMERS_START:
            return {
                ...state,
                loading_customers: true
            }
        case actionTypes.FETCH_MAP_CUSTOMERS_SUCCESS:
            return {
                ...state,
                loading_customers: false,
                customers_list: action.customers
            }
        case actionTypes.FETCH_MAP_CUSTOMERS_FAIL:
            return {
                ...state,
                loading_customers: false,
                error: action.error
            }

        // map the customers to the sub users
        case actionTypes.MAP_CUSTOMERS_START:
            return {
                ...state,
                assign_inst_loader: true
            }
        case actionTypes.MAP_CUSTOMERS_SUCCESS:
            return {
                ...state,
                assign_inst_loader: false,
                assign_inst_successMsg: action.successMsg
            }
        case actionTypes.MAP_CUSTOMERS_FAIL:
            return {
                ...state,
                assign_inst_loader: false,
                assign_inst_errorMsg: action.error
            }

        // verifying mail for the sub users
        case actionTypes.VERIFY_SUB_VENDOR_MAIL_START:
            return {
                ...state,
                loading_mail_verification: true
            }
        case actionTypes.VERIFY_SUB_VENDOR_MAIL_SUCCESS:
            return {
                ...state,
                loading_mail_verification: false,
                verify_mail_suc_msg: action.msg
            }
        case actionTypes.VERIFY_SUB_VENDOR_MAIL_FAIL:
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