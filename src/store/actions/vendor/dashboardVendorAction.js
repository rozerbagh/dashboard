import customer_list from '../../JSON/CustomerLists.json'
import * as actionType from './actionTypes';

export const fetch_customers_start = () => {
    return {
        type: actionType.FETCH_CUSTOMER_START,
    }
}
export const fetch_customers_success = (data) => {
    return {
        type: actionType.FETCH_CUSTOMER_SUCCESS,
        customerList: data
    }
}
export const fetch_customers_fail = (error) => {
    return {
        type: actionType.FETCH_CUSTOMER_FAIL,
        error: error
    }
}

export const fetch_customers = (token) => {
    return dispatch => {
        dispatch(fetch_customers_start());
        dispatch(fetch_customers_success(customer_list.message));
        // dispatch(fetch_customers_fail(error.response.data.message));
    }
}


export const delete_customer_start = () => {
    return {
        type: actionType.DELETE_CUSTOMER_START,
    }
}
export const delete_customer_success = (msg) => {
    return {
        type: actionType.DELETE_CUSTOMER_SUCCESS,
        message: msg
    }
}
export const delete_customer_fail = (error) => {
    return {
        type: actionType.DELETE_CUSTOMER_FAIL,
        error: error
    }
}

export const nullify_delete_customer_success = () => {
    return {
        type: actionType.DELETE_CUSTOMER_SUCCESS,
        message: null
    }
}
export const nullify_delete_customer_fail = () => {
    return {
        type: actionType.DELETE_CUSTOMER_FAIL,
        error: null
    }
}

export const delete_customer = (token, uid) => {
    return dispatch => {
        dispatch(delete_customer_start());
        dispatch(delete_customer_success('Done'));
        // dispatch(delete_customer_fail(error.response.data.message));
    }
}
