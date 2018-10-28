import {
    SIGN_UP_INVALID_FIELDS,
    LOGIN_INVALID_FIELDS
} from 'constantsTypes'

const initialState = {
    signup: {},
    login:{}
    // whatever state a user holds
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SIGN_UP_INVALID_FIELDS: return { ...state, signup: payload };
        case LOGIN_INVALID_FIELDS: return { ...state, login: payload };
        default: return state;
    };
};