import ip_search from '../../JSON/IPSearch.json';
import customer_search from '../../JSON/CustomerSeacrh.json'
import * as actionType from './actionTypes';
import * as formatter from '../../../components/Functions/Formatter'

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

export const searchingCustomer = (token, searched_name) => {
    return dispatch => {
        dispatch(searching_start());
        dispatch(searching_success(customer_search.message));
        // dispatch(searching_fail(error.response !== null ? error.response.data.message : 'internet error'));
    }
}

export const searching = (token, id, searched_name) => {
    return dispatch => {
        dispatch(searching_start());
        dispatch(searching_success(ip_search.message));
        // dispatch(searching_fail(error.response !== null ? error.response.data.message : 'internet error'));
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

export const feedbackRated = (token, rating) => {
    return dispatch => {
        dispatch(feedback_rating_start());
        // dispatch(feedback_rating_success(response.data.message));
        // dispatch(feedback_rating_fail(error.response !== null ? error.response.data.message : 'internet error'));
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
export const fetchNotifications = (token, id) => {
    return dispatch => {
        dispatch(fetch_notify_start());
        // dispatch(fetch_notify_success(response.data.message));
        // dispatch(fetch_notify_fail(error.response !== null ? error.response.data.message : 'internet error'));
    }
}

// Fetching the notifications when ever updates requires without data decryption 
export const updateNotifications = (token, id) => {
    return dispatch => {
        dispatch(fetch_notify_start());
        // dispatch(fetch_notify_success(response.data.message));
        // dispatch(fetch_notify_fail(error.response !== null ? error.response.data.message : 'internet error'));
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

export const fetchUnseenNotifications = (token, id) => {
    return dispatch => {
        dispatch(fetch_unseen_notify_start());
        // dispatch(fetch_unseen_notify_success(response.data.message));
        // dispatch(updateNotifications(token, id))
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

export const updateUnseenNotifications = (token, id) => {
    return dispatch => {
        dispatch(update_notify_start());
        // dispatch(update_notify_success(response.data.message));
        // dispatch(update_notify_fail(error.response.data.message));
    }
}

export const set_customer = (email, id, name, bool) => {
    return {
        type: actionType.SET_CUSTOMER,
        email: email,
        id: id,
        name: name,
        bool_inside_customer: bool
    }
}

export const set_customers = (email, id, name, boolVal) => {
    return dispatch => {
        const idObj = {
            _id: new Date().getTime(),
            vid: id,
        }
        const emailObj = {
            _id: new Date().getTime(),
            email: email,
        }
        const nameObj = {
            _id: new Date().getTime(),
            name: name,
        }
        localStorage.setItem('vuid', JSON.stringify(idObj));
        localStorage.setItem('vemail', JSON.stringify(emailObj));
        localStorage.setItem('vname', JSON.stringify(nameObj));
        dispatch(set_customer(email, id, name, boolVal));
    }
}