import * as actionTypes from '../../actions/vendor/actionTypes';

const initialState = {
    invoices_list: [],
    payment_history: [],
    loading: true,
    payLoading: true,
    payingLoader: false,
    error: '',
    paid_link: null,
}

const billingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BILLING_INVOICES_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.BILLING_INVOICES_SUCCESS:
            return {
                ...state,
                invoices_list: action.invoicesList,
                loading: false
            }
        case actionTypes.BILLING_INVOICES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case actionTypes.BILLING_PAYMENT_HISTORY_START:
            return {
                ...state,
                payLoading: true
            }
        case actionTypes.BILLING_PAYMENT_HISTORY_SUCCESS:
            return {
                ...state,
                payment_history: action.paymentHistory,
                payLoading: false
            }
        case actionTypes.BILLING_PAYMENT_HISTORY_FAIL:
            return {
                ...state,
                payLoading: false,
                error: action.error
            }

        case actionTypes.PAYING_START:
            return {
                ...state,
                payingLoader: true
            }
        case actionTypes.PAYING_SUCCESS:
            return {
                ...state,
                payingLoader: false,
                paid_link: action.paidLink
            }
        case actionTypes.PAYING_FAIL:
            return {
                ...state,
                payingLoader: false,
            }
        default:
            return state;
    }
}

export default billingsReducer;