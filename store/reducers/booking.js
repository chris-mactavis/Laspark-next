import {TOGGLE_PARK_RULES} from "../actions/booking";

const initialState = {
    showParkRules: false
}

const bookings = (state = initialState, actions) => {
    switch (actions.type) {
        case TOGGLE_PARK_RULES:
            return {...state, showParkRules: !state.showParkRules}
        default:
            return state;
    }
}

export default bookings;