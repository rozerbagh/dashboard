import authReducer from './reducers/auth';
import commonReducer from './reducers/customer/commonReducers'
import dashboardReducer from './reducers/customer/dashboardReducer';
import taskReducer from './reducers/customer/taskReducers'
import userReducer from './reducers/customer/usersReducers';
import instanceReducer from './reducers/customer/instnaceReducers';
import cloudConnectReducer from './reducers/customer/cloudConnectReducer';
import zoomviewReducer from './reducers/customer/zoomviewReducer';
import reportsReducer from './reducers/customer/reportsReducers'
import billingReducer from './reducers/customer/billingReducers';
import settingReducer from './reducers/customer/settingsReducer';
import userProfileReducer from './reducers/customer/userProfileReducers';
import ticketReducer from './reducers/customer/ticketsReducer';

// VENDOR STORE //
import vendor_authReducer from './reducers/vendor/auth';
import vendor_dashboardReducer from './reducers/vendor/dashboardReducer';
import vendor_taskReducer from './reducers/vendor/taskReducers';
import vcommonReducer from './reducers/vendor/commonReducers';
import vendorReducer from './reducers/vendor/vusersReducers';
import vendor_instanceReducer from './reducers/vendor/instnaceReducers';
import vendor_zoomviewReducer from './reducers/vendor/zoomviewReducer'
import vendor_settingReducer from './reducers/vendor/settingsReducer';
import vendorProfileReducer from './reducers/vendor/vendorProfileReducers';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import * as actionTypes from './actions/customer/actionTypes';





const saveToLocalStorage = (state, nameOfState) => {
    try {
        let serializedState = JSON.stringify(state);
        localStorage.setItem(`state`, serializedState);
    } catch (error) {

    }
}

const loadFromLocalStorage = () => {
    try {
        let serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined
        return JSON.parse(serializedState);
    } catch (e) {
        // console.log(e);
        return undefined
    }

}

const persistedState = loadFromLocalStorage();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    rebootTheMachineTask: taskReducer,
    customerCommon: commonReducer,
    customerDashboard: dashboardReducer,
    customerUser: userReducer,
    customerInstances: instanceReducer,
    customerCloudConnect: cloudConnectReducer,
    customerZoomView: zoomviewReducer,
    customerSettings: settingReducer,
    customerReports: reportsReducer,
    customerBillings: billingReducer,
    customerProfile: userProfileReducer,
    customerTickets: ticketReducer,
    auth_reducer: authReducer,
    // Vendor reducers
    vendorCommon: vcommonReducer,
    vrebootTheMachineTask: vendor_taskReducer,
    vendorDashboard: vendor_dashboardReducer,
    vendorUser: vendorReducer,
    vendorInstances: vendor_instanceReducer,
    vendorZoomView: vendor_zoomviewReducer,
    vendorSettings: vendor_settingReducer,
    vendorProfile: vendorProfileReducer,
    vendor_auth_reducer: vendor_authReducer,
    persistedState: persistedState,
})

const finalReducer = (state, action) => {
    // when a logout action is dispatched it will reset redux state
    if (action.type === actionTypes.LOGOUT) {
        state = undefined;
    }

    return rootReducer(state, action);
};

const appStore = createStore(finalReducer, applyMiddleware(thunk));

appStore.subscribe(() => saveToLocalStorage(appStore.getState()))

export default appStore;