import {Provider} from "react-redux";
import React from "react";
import thunkMiddleware from "redux-thunk";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

import '../styles/sass/main.scss';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import toggleLoading from "../store/reducers/loader";
import notifier from "../store/reducers/notifier";
import auth from "../store/reducers/auth";
import bookings from "../store/reducers/booking";


const reducers = combineReducers({
    loader: toggleLoading,
    notifier: notifier,
    auth: auth,
    bookings: bookings
});
const store = process.env.environment === 'dev' ? createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware))) : createStore(reducers, applyMiddleware(thunkMiddleware));

export default function App({Component, pageProps}) {
    return <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
}