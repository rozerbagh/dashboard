import * as actionTypes from '../../actions/customer/actionTypes';

const initialState = {
    searched_list: [],
    search_loader: true,
    error: null,
    feedback_message: null,
    feedbackRated: false,
    feedbackCounted: 0,
    feedbackLoader: false,
    feedback_error: null,

    loadingNotifications: true,
    notifications_arr: [],
    unseen_notifications_arr: [],
    notifications_suucess_msg: null,
    notifications_error_msg: null,

    update_suc_notification_msg: null,
    update_err_notification_msg: null,
}

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEACRHING_START:
            return {
                ...state,
                search_loader: true
            }
        case actionTypes.SEACRHING_SUCCESS:
            return {
                ...state,
                searched_list: action.searchResult,
                search_loader: false
            }
        case actionTypes.SEACRHING_FAIL:
            return {
                ...state,
                search_loader: false,
                error: action.error
            }



        case actionTypes.FEEDBACK_RATING_START:
            return {
                ...state,
                feedbackLoader: true
            }
        case actionTypes.FEEDBACK_RATING_SUCCESS:
            return {
                ...state,
                feedback_message: action.feedbackMsg,
                feedbackRated: true,
                feedbackLoader: false,
            }
        case actionTypes.FEEDBACK_RATING_FAIL:
            return {
                ...state,
                feedbackLoader: false,
                feedbackRated: false,
                feedback_error: action.error
            }


        case actionTypes.RESET_FEEBACK_RATING:
            return {
                ...state,
                feedbackRated: action.rated,
            }

        // FETCH SEEN NOTIFICATIONS
        case actionTypes.FETCH_BELL_NOTIFICATIONS_START:
            return {
                ...state,
                loadingNotifications: true,
            }
        case actionTypes.FETCH_BELL_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loadingNotifications: false,
                notifications_arr: action.notifications,

            }
        case actionTypes.FETCH_BELL_NOTIFICATIONS_FAIL:
            return {
                ...state,
                notifications_error_msg: action.error
            }


        // FETCH UNSEEN NOTIFICATIONS
        case actionTypes.FETCH_UNSEEN_BELL_NOTIFICATIONS_START:
            return {
                ...state,
                loadingNotifications: true,
            }
        case actionTypes.FETCH_UNSEEN_BELL_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loadingNotifications: false,
                unseen_notifications_arr: action.notifications,

            }
        case actionTypes.FETCH_UNSEEN_BELL_NOTIFICATIONS_FAIL:
            return {
                ...state,
                notifications_error_msg: action.error
            };



        // UPDATE UNSEEN NOTIFICATIONS
        case actionTypes.UPDATE_UNSEEN_BELL_NOTIFICATIONS_START:
            return {
                ...state,
                loadingNotifications: true,
            }
        case actionTypes.UPDATE_UNSEEN_BELL_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loadingNotifications: false,
                update_suc_notification_msg: action.updateNoticationsmsg,

            }
        case actionTypes.UPDATE_UNSEEN_BELL_NOTIFICATIONS_FAIL:
            return {
                ...state,
                update_err_notification_msg: action.error
            }


        default:
            return state;
    }
}

export default commonReducer;