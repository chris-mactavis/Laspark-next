import { UPDATE_MESSAGE } from '../actions/liveEvents';

const initialState = {
    updatedMessage: false,
};

const liveEvent = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_MESSAGE: 
            return {...state, updatedMessage: action.data};
        default:
            return state;
    }
}

export default liveEvent;