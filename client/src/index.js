import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import configureStore from './store/configureStore'
import {Provider} from 'react-redux';

const store = configureStore()

console.log(store.getState())

store.subscribe(() => {
    console.log(store.getState())
})

const ele = (
    <Provider store={store}>
        <App/>
    </Provider>
)

ReactDOM.render(ele , document.getElementById('root'))