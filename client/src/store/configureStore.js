import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import userReducer from '../reducers/user';
import customersReducer from '../reducers/customers';

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        customers: customersReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore