import {
    SIGN_UP_INVALID_FIELDS
} from 'constantsTypes'

const initialState = {
    signup: {}
    // whatever state a user holds
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SIGN_UP_INVALID_FIELDS: return { ...state, signup: payload };
        default: return state;
    };
};