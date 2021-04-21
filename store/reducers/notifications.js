import { SET_NOTIFICATIONS } from '../actions/notifications';
import Cookies from 'js-cookie';

const theNotifications = Cookies.get('notifications');

export const initialState = {
    allNotifications: theNotifications || []
};

const notifications = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTIFICATIONS:
            return {...state, allNotifications: data}
        default:
            return state;
    }
};

export default notifications;