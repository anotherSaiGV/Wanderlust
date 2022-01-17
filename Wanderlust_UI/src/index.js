import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "bootstrap/dist/css/bootstrap.css";

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import bookingReducer from './Reducers/reducer';

let store= createStore(bookingReducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,    
    document.getElementById('root')
);

   