import {PARK_BOOKING_MESSAGE ,SERVICE_BOOKING_MESSAGE} from '../actions/liveEvents';

const initialState = {
    parkBookingMessage: false,
    serviceBookingMessage : false
};

const liveEvent = (state = initialState, action) => {
    switch(action.type) {
        case PARK_BOOKING_MESSAGE: 
            return {...state, parkBookingMessage: data};
        case SERVICE_BOOKING_MESSAGE:
            return {...state, serviceBookingMessage: data};
        default:
            return state;
    }
}

export default liveEvent;