import settings from '../../JSON/Settings.json'
import * as actionType from './actionTypes';

export const daily_reports_start = () => {
    return {
        type: actionType.GETTING_DAILY_REPORT_START
    }
}
export const daily_reports_success = (cxoEmails, techEmails, notifyEmails, cxoswitch, techswitch) => {
    return {
        type: actionType.GETTING_DAILY_REPORT_SUCCESS,
        cxo_emails: cxoEmails,
        tech_emails: techEmails,
        notify_emails: notifyEmails,
        CXO_ON_OFF: cxoswitch,
        TECH_ON_OFF: techswitch,
    }
}

export const daily_reports_fail = (error) => {
    return {
        type: actionType.GETTING_DAILY_REPORT_FAIL,
        error: error,
    }
}

// Fetching emails 1st time with decryption
export const fetchDailyReports = (token) => {
    return dispatch => {
        dispatch(daily_reports_start());
        dispatch(daily_reports_success(
            settings.message.cxo_report_email,
            settings.message.tech_report_email,
            settings.message.notify_report_email,
            settings.message.cxo_report,
            settings.message.tech_report,
        ));
        // dispatch(daily_reports_fail(error.response.data.message));
    }
}

// Fetching emails 1st time without decryption
export const updateDailyReports = (token) => {
    return dispatch => {
        dispatch(daily_reports_start());
        dispatch(daily_reports_success(
            settings.message.cxo_report_email,
            settings.message.tech_report_email,
            settings.message.notify_report_email,
            settings.message.cxo_report,
            settings.message.tech_report,
        ));
        // dispatch(daily_reports_fail(error.response.data.message));
    }
}



export const post_daily_report_start = () => {
    return {
        type: actionType.POSTING_DAILY_REPORT_START
    }
}
export const post_daily_report_success = (success_message) => {
    return {
        type: actionType.POSTING_DAILY_REPORT_SUCCESS,
        successMsg: success_message
    }
}

export const post_daily_report_fail = (error) => {
    return {
        type: actionType.POSTING_DAILY_REPORT_FAIL,
        errorMsg: error,
    }
}

export const nullifyingDRSucMsg = () => {
    return {
        type: actionType.POSTING_DAILY_REPORT_SUCCESS,
        successMsg: null
    }
}

export const nullifyingDRErrMsg = () => {
    return {
        type: actionType.POSTING_DAILY_REPORT_FAIL,
        errorMsg: null,
    }
}

export const postDailyReports = (token, cxo_report, cxo_report_email, tech_report, tech_report_email) => {
    return dispatch => {
        dispatch(post_daily_report_start());
        dispatch(post_daily_report_success('Done'));
        // dispatch(post_daily_report_fail(error.response.data.message));
    }
}
