import { isConstructorDeclaration } from 'typescript';
import ip_search from '../../JSON/IPSearch.json'
import * as actionType from './actionTypes';

export const paying_start = () => {
    return {
        type: actionType.PAYNOW_START
    }
}
export const paying_success = (invoices) => {
    return {
        type: actionType.PAYNOW_SUCCESS,
        invoicesList: invoices,
    }
}

export const paying_fail = (error) => {
    return {
        type: actionType.PAYNOW_FAIL,
        error: error,
    }
}

export const pay_now = (token, amount) => {
    return dispatch => {
        dispatch(paying_start());
        // dispatch(paying_success(response.data.message));
        // dispatch(paying_fail(error));
    }
}


export const searching_start = () => {
    return {
        type: actionType.SEACRHING_START
    }
}
export const searching_success = (searchResults) => {
    return {
        type: actionType.SEACRHING_SUCCESS,
        searchResult: searchResults,
    }
}

export const searching_fail = (error) => {
    return {
        type: actionType.SEACRHING_FAIL,
        error: error,
    }
}

export const searching = (token, searched_name) => {
    return dispatch => {
        dispatch(searching_start());
        dispatch(searching_success(ip_search.message));
        // dispatch(searching_fail(error));
    }
}



export const feedback_rating_start = () => {
    return {
        type: actionType.FEEDBACK_RATING_START
    }
}
export const feedback_rating_success = (feedbacks) => {
    return {
        type: actionType.FEEDBACK_RATING_SUCCESS,
        feedbackMsg: feedbacks,
    }
}

export const feedback_rating_fail = (error) => {
    return {
        type: actionType.FEEDBACK_RATING_FAIL,
        error: error,
    }
}

export const nullifyFeedbackRateSuccess = () => {
    return {
        type: actionType.FEEDBACK_RATING_SUCCESS,
        feedbackMsg: null,
    }
}

export const nullifyFeedbackRateFail = () => {
    return {
        type: actionType.FEEDBACK_RATING_FAIL,
        error: null,
    }
}

export const feedbackRated = (token, rating) => {
    return dispatch => {
        dispatch(feedback_rating_start());
        // dispatch(feedback_rating_success(response.data.message));
        // dispatch(feedback_rating_fail(error.response.data.message));
    }
}

export const reset_feeback = () => {
    return {
        type: actionType.RESET_FEEBACK_RATING,
        rated: false
    }
}


// NOTICATIONS SEEN API AND ACTIONS
export const fetch_notify_start = () => {
    return {
        type: actionType.FETCH_BELL_NOTIFICATIONS_START
    }
}
export const fetch_notify_success = (notifies) => {
    return {
        type: actionType.FETCH_BELL_NOTIFICATIONS_SUCCESS,
        notifications: notifies,
    }
}

export const fetch_notify_fail = (error) => {
    return {
        type: actionType.FETCH_BELL_NOTIFICATIONS_FAIL,
        error: error,
    }
}

// Fetching the notifications for the first time where the data decryption is required  
export const fetchNotifications = (token) => {
    return dispatch => {
        dispatch(fetch_notify_start());
        // dispatch(fetch_notify_success(response.data.message));
        // dispatch(fetch_notify_fail(msg.data.message));
    }
}

// Fetching the notifications when ever updates requires without data decryption 
export const updateNotifications = (token) => {
    return dispatch => {
        dispatch(fetch_notify_start());
        // dispatch(fetch_notify_success(response.data.message));
        // dispatch(fetch_notify_fail(error.response.data.message));
    }
}

// NOTIFICATIONS UNSEEN API AND ACTIONS
export const fetch_unseen_notify_start = () => {
    return {
        type: actionType.FETCH_BELL_NOTIFICATIONS_START
    }
}
export const fetch_unseen_notify_success = (notifies) => {
    return {
        type: actionType.FETCH_BELL_NOTIFICATIONS_SUCCESS,
        notifications: notifies,
    }
}

export const fetch_unseen_notify_fail = (error) => {
    return {
        type: actionType.FETCH_BELL_NOTIFICATIONS_FAIL,
        error: error,
    }
}

export const fetchUnseenNotifications = (token) => {
    return dispatch => {
        dispatch(fetch_unseen_notify_start());
        // dispatch(fetch_unseen_notify_success(response.data.message));
        // dispatch(updateNotifications(token))
        // dispatch(fetch_unseen_notify_fail(error.response.data.message));
    }
}

// NOTIFICATIONS UPDATES API AND ACTIONS
export const update_notify_start = () => {
    return {
        type: actionType.UPDATE_UNSEEN_BELL_NOTIFICATIONS_START
    }
}
export const update_notify_success = (msg) => {
    return {
        type: actionType.UPDATE_UNSEEN_BELL_NOTIFICATIONS_SUCCESS,
        updateNoticationsmsg: msg,
    }
}

export const update_notify_fail = (error) => {
    return {
        type: actionType.UPDATE_UNSEEN_BELL_NOTIFICATIONS_FAIL,
        error: error,
    }
}

export const nullifyUpdateSeenMessage = () => {
    return {
        type: actionType.UPDATE_UNSEEN_BELL_NOTIFICATIONS_SUCCESS,
        updateNoticationsmsg: null,
    }
}

export const updateUnseenNotifications = (token) => {
    return dispatch => {
        dispatch(update_notify_start());
        // dispatch(update_notify_success(response.data.message));
        // dispatch(update_notify_fail(error.response.data.message));
    }
}
