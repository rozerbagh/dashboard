import * as actionTypes from '../../actions/customer/actionTypes';

const initialState = {
    cxo_email_lists: [],
    tech_email_lists: [],
    notify_email_lists: [],
    cxo_switch_value: 0,
    tech_switch_value: 0,
    getloading: true,
    setting_error: null,
    error: null,

    postingDR: false,
    dailyReportSent: null,
    dailyReportNotSent: null,

    postingNoti: false,
    notificationSent: null,
    notificationNotSent: null,
}

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        // get the daily reports
        case actionTypes.GETTING_DAILY_REPORT_START:
            return {
                ...state,
                getloading: true
            }
        case actionTypes.GETTING_DAILY_REPORT_SUCCESS:
            return {
                ...state,
                cxo_email_lists: action.cxo_emails,
                tech_email_lists: action.tech_emails,
                notify_email_lists: action.notify_emails,
                cxo_switch_value: action.CXO_ON_OFF,
                tech_switch_value: action.TECH_ON_OFF,
                getloading: false,
                setting_error: null,
            }
        case actionTypes.GETTING_DAILY_REPORT_FAIL:
            return {
                ...state,
                getloading: false,
                setting_error: action.error,
            }
        // post the daily reports
        case actionTypes.POSTING_DAILY_REPORT_START:
            return {
                ...state,
                postingDR: true,
            }
        case actionTypes.POSTING_DAILY_REPORT_SUCCESS:
            return {
                ...state,
                postingDR: false,
                dailyReportSent: action.successMsg
            }
        case actionTypes.POSTING_DAILY_REPORT_FAIL:
            return {
                ...state,
                postingDR: false,
                dailyReportNotSent: action.errorMsg
            }

        // post the notify reports
        case actionTypes.POSTING_NOTIFICATIONS_START:
            return {
                ...state,
                postingNoti: true,
            }
        case actionTypes.POSTING_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                postingNoti: false,
                notificationSent: action.successMsg
            }
        case actionTypes.POSTING_NOTIFICATIONS_FAIL:
            return {
                ...state,
                postingNoti: false,
                notificationNotSent: action.errorMsg
            }
        default:
            return state;
    }
}

export default settingsReducer;