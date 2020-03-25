import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import userReducer from '../reducers/user';
import customersReducer from '../reducers/customers';
import singleCustomerReducer from '../reducers/singleCustomer';
import assoTicketReducer from '../reducers/assoTicket';
import departmentsReducer from '../reducers/departments';

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        customers: customersReducer,
        singleCustomer: singleCustomerReducer,
        departments: departmentsReducer,
        assoTicket: assoTicketReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore