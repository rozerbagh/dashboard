import * as actionTypes from '../../actions/customer/actionTypes';

const initialState = {
    ticket_list: [],
    loading: true,
    error: null,
    adding_success_msg: null,
    updates_message: [],
    fetch_update_loading: true,
    u_loading: false,

    updating_success_msg: null,
    updating_error_msg: null,
}

const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TICKETS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.TICKETS_SUCCESS:
            return {
                ...state,
                ticket_list: action.ticketsList,
                loading: false
            }
        case actionTypes.TICKETS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case actionTypes.ADDING_NEW_TICKETS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ADDING_NEW_TICKETS_SUCCESS:
            return {
                ...state,
                adding_success_msg: action.successMessage,
                loading: false
            }
        case actionTypes.ADDING_NEW_TICKETS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }


        case actionTypes.FETCH_UPDATES_TICKETS_MESSAGE_START:
            return {
                ...state,
                fetch_update_loading: true
            }
        case actionTypes.FETCH_UPDATES_TICKETS_MESSAGE_SUCCESS:
            return {
                ...state,
                updates_message: action.updatesMessage,
                fetch_update_loading: false
            }
        case actionTypes.FETCH_UPDATES_TICKETS_MESSAGE_FAIL:
            return {
                ...state,
                fetch_update_loading: false,
                error: action.error
            }



        case actionTypes.UPDATING_TICKETS_START:
            return {
                ...state,
                u_loading: true
            }
        case actionTypes.UPDATING_TICKETS_SUCCESS:
            return {
                ...state,
                updating_success_msg: action.updatesMessage,
                u_loading: false
            }
        case actionTypes.UPDATING_TICKETS_FAIL:
            return {
                ...state,
                u_loading: false,
                updating_error_msg: action.error
            }
        default:
            return state;
    }
}

export default ticketReducer;