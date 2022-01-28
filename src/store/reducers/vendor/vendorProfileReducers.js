import * as actionTypes from '../../actions/vendor/actionTypes';

const initialState = {
    vendor_details: [],
    loading: true,
    success_message: null,
    error: null,
    error_message: null,
}

const vendorProfileReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_VENDOR_DETAILS_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_VENDOR_DETAILS_SUCCESS:
            return {
                ...state,
                vendor_details: action.vendorDetails,
                loading: false,
            }
        case actionTypes.FETCH_VENDOR_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
            }

        case actionTypes.UPDATE_VENDOR_PASSWORD_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.UPDATE_VENDOR_PASSWORD_SUCCESS:
            return {
                ...state,
                success_message: action.successMsg,
                loading: false,
            }
        case actionTypes.UPDATE_VENDOR_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error_message: action.errorMsg
            }

        case actionTypes.UPDATE_VENDOR_NAME_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.UPDATE_VENDOR_NAME_SUCCESS:
            return {
                ...state,
                success_message: action.successMsg,
                loading: false,
            };
        case actionTypes.UPDATE_VENDOR_NAME_FAIL:
            return {
                ...state,
                loading: false,
                error_message: action.errorMsg
            }
        default:
            return state;
    }
}

export default vendorProfileReducer;