import * as actionTypes from '../../actions/vendor/actionTypes';

const initialState = {
    error: null,
    loading: true,

    editSuccessMsg: null,
    errorEditMessage: null,

    sheduledtaskMsg: null,
    rebootSuccessMsg: null,

    error_sheduledtaskMsg: null,
    error_rebootSuccessMsg: null,
}

const taskReducers = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.VM_INSTANCE_EDITING_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.VM_INSTANCE_EDITING_SUCCESS:
            return {
                ...state,
                editSuccessMsg: action.successMsg,
                loading: false,
            }
        case actionTypes.VM_INSTANCE_EDITING_FAIL:
            return {
                ...state,
                loading: false,
                errorEditMessage: action.error
            }

        case actionTypes.VENDOR_VM_SHEDULED_TASK_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.VENDOR_VM_SHEDULED_TASK_SUCCESS:
            return {
                ...state,
                sheduledtaskMsg: action.successMsg,
                loading: false,
            }
        case actionTypes.VENDOR_VM_SHEDULED_TASK_FAIL:
            return {
                ...state,
                loading: false,
                error_sheduledtaskMsg: action.error
            }


        case actionTypes.VENDOR_VM_REBOOT_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.VENDOR_VM_REBOOT_SUCCESS:
            return {
                ...state,
                rebootSuccessMsg: action.successMsg,
                loading: false,
            }
        case actionTypes.VENDOR_VM_REBOOT_FAIL:
            return {
                ...state,
                loading: false,
                error_rebootSuccessMsg: action.error
            }
        default:
            return state;
    }
}

export default taskReducers;