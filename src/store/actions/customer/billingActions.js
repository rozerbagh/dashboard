import invoices from '../../JSON/Invoices.json';
import payment_history from '../../JSON/PaymentHistory.json';
import * as actionType from './actionTypes';

export const invoices_list_start = () => {
    return {
        type: actionType.BILLING_INVOICES_START
    }
}
export const invoices_list_success = (invoices) => {
    return {
        type: actionType.BILLING_INVOICES_SUCCESS,
        invoicesList: invoices,
    }
}

export const invoices_list_fail = (error) => {
    return {
        type: actionType.BILLING_INVOICES_FAIL,
        error: error,
    }
}


export const fetchInvoices = (token) => {
    const today = new Date();
    return dispatch => {
        dispatch(invoices_list_start());
        invoices.message.map(ele => {
            ele.invoice_number = 'INV-00-0001';
            ele.date = `${today.getFullYear()}-${today.getMonth() < 10 ? '0' + today.getMonth() : today.getMonth()}-${today.getDay() - 4}`;
            ele.due_date = `${today.getFullYear()}-${today.getMonth() < 10 ? '0' + today.getMonth() + 1 : today.getMonth() + 1}-${today.getDay() + 4}`
        })
        dispatch(invoices_list_success(invoices.message));
        // dispatch(invoices_list_fail(error.response.data.message));
    }
}

// bandwidth usage
export const billing_bandwidth_usage_start = () => {
    return {
        type: actionType.BILLING_INVOICES_START
    }
}
export const billing_bandwidth_usage_success = (data) => {
    return {
        type: actionType.BILLING_BANDWIDTH_USAGE_SUCCESS,
        bandwidthUsage: data,
    }
}

export const billing_bandwidth_usage_fail = (error) => {
    return {
        type: actionType.BILLING_BANDWIDTH_USAGE_FAIL,
        error: error,
    }
}

export const billing_bandwidth_usage = (token, month, year) => {
    return dispatch => {
        dispatch(billing_bandwidth_usage_start());
        // dispatch(billing_bandwidth_usage_success(response.data.vm_data));
        // dispatch(billing_bandwidth_usage_fail(error.response.data.message));
    }
}

export const payment_history_start = () => {
    return {
        type: actionType.BILLING_PAYMENT_HISTORY_START
    }
}
export const payment_history_success = (payment_history) => {
    return {
        type: actionType.BILLING_PAYMENT_HISTORY_SUCCESS,
        paymentHistory: payment_history,
    }
}

export const payment_history_fail = (error) => {
    return {
        type: actionType.BILLING_PAYMENT_HISTORY_FAIL,
        error: error,
    }
}

export const fetch_payment_history = (token) => {
    return dispatch => {
        dispatch(payment_history_start());
        payment_history.message.map(ele => {
            ele._id = '5f9abba86acaa28b4207a5d5'
        })
        dispatch(payment_history_success(payment_history.message));
        // dispatch(payment_history_fail(error.response.data.message));
    }
}



export const paying_start = () => {
    return {
        type: actionType.PAYING_START
    }
}
export const paying_success = (payLink) => {
    return {
        type: actionType.PAYING_SUCCESS,
        paidLink: payLink,
    }
}

export const paying_fail = (error) => {
    return {
        type: actionType.PAYING_FAIL,
    }
}

export const payingnow = (token, amt) => {
    return dispatch => {
        dispatch(paying_start());
        // dispatch(paying_success(response.data.message));
        // dispatch(paying_fail());
    }
}