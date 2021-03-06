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
import liveEvent from "../store/reducers/liveEvents";
import notifications from "../store/reducers/notifications";
import ComponentWrapper from "../Components/hoc/ComponentsWrapper";


const reducers = combineReducers({
    loader: toggleLoading,
    notifier: notifier,
    auth: auth,
    bookings: bookings,
    liveEvent: liveEvent,
    notifications: notifications
});
const store = process.env.environment === 'dev' ? createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware))) : createStore(reducers, applyMiddleware(thunkMiddleware));

export default function App({Component, pageProps}) {
    return <Provider store={store}>
          <ComponentWrapper Component={Component} pageProps={pageProps} />
        </Provider>
}