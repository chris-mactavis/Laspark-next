import {TOGGLE_LOADER} from "../actions/loader";

const initialState = {
    loading: false
};

const toggleLoading = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_LOADER:
            console.log('here')
            return {loading: !state.loading};
        default:
            return state;
    }
}

export default toggleLoading;