import tickets from '../../JSON/Tickets.json';
import update_ticket from '../../JSON/UpdateTicket.json'
import * as actionType from './actionTypes';

export const tickets_start = () => {
    return {
        type: actionType.TICKETS_START
    }
}
export const tickets_success = (tickets) => {
    return {
        type: actionType.TICKETS_SUCCESS,
        ticketsList: tickets,
    }
}

export const tickets_fails = (error) => {
    return {
        type: actionType.TICKETS_FAIL,
        error: error,
    }
}

export const fetching_tickets = (token) => {
    return dispatch => {
        dispatch(tickets_start());
        dispatch(tickets_success(tickets.message));
        // dispatch(tickets_fails(error.response.data.message));
    }
}



export const add_tickets_start = () => {
    return {
        type: actionType.ADDING_NEW_TICKETS_START
    }
}
export const add_tickets_success = (successMsg) => {
    return {
        type: actionType.ADDING_NEW_TICKETS_SUCCESS,
        successMessage: successMsg,
    }
}

export const add_tickets_fails = (error) => {
    return {
        type: actionType.ADDING_NEW_TICKETS_FAIL,
        error: error,
    }
}

export const nullify_add_tickets_success = () => {
    return {
        type: actionType.ADDING_NEW_TICKETS_SUCCESS,
        successMessage: null,
    }
}

export const nullify_add_tickets_fails = () => {
    return {
        type: actionType.ADDING_NEW_TICKETS_FAIL,
        error: null,
    }
}

export const adding_tickets = (token, ticket_text, title) => {
    return dispatch => {
        dispatch(add_tickets_start());
        // dispatch(add_tickets_success(response.data.message.msg));
        // dispatch(add_tickets_fails(error.response.data.message));

    }
}


export const fetch_updates_tickets_msg_start = () => {
    return {
        type: actionType.FETCH_UPDATES_TICKETS_MESSAGE_START
    }
}
export const fetch_updates_tickets_msg_success = (updateMessage) => {
    return {
        type: actionType.FETCH_UPDATES_TICKETS_MESSAGE_SUCCESS,
        updatesMessage: updateMessage,
    }
}

export const fetch_updates_tickets_msg_fails = (error) => {
    return {
        type: actionType.FETCH_UPDATES_TICKETS_MESSAGE_FAIL,
        error: error,
    }
}

export const fetch_updates_tickets_msg = (token, id) => {
    return dispatch => {
        dispatch(fetch_updates_tickets_msg_start());
        dispatch(fetch_updates_tickets_msg_success(update_ticket.message.ticket_history));
        // dispatch(fetch_updates_tickets_msg_fails(error.response.data.message));
    }
}

export const updates_tickets_msg = (token, id) => {
    return dispatch => {
        dispatch(fetch_updates_tickets_msg_start());
        dispatch(fetch_updates_tickets_msg_success(update_ticket.message.ticket_history))
        // dispatch(fetch_updates_tickets_msg_fails(error.response.data.message));
    }
}


export const updates_tickets_start = () => {
    return {
        type: actionType.UPDATING_TICKETS_START
    }
}
export const updates_tickets_success = (updateMessage) => {
    return {
        type: actionType.UPDATING_TICKETS_SUCCESS,
        updatesMessage: updateMessage,
    }
}

export const updates_tickets_fails = (error) => {
    return {
        type: actionType.UPDATING_TICKETS_FAIL,
        error: error,
    }
}

export const updating_tickets = (token, ticket_text, id) => {
    return dispatch => {
        dispatch(updates_tickets_start());
        dispatch(updates_tickets_msg(token, id));
        dispatch(updates_tickets_success('Done'));
        // dispatch(updates_tickets_fails(error.response.data.message));
    }
}