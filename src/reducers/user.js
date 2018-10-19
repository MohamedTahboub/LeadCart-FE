import {
    // SIGNING_UP,
    SIGN_UP_SUCCESS,
    // SIGN_UP_FAILD,
    LOGGING_IN,
    // LOGIN_SUCCESS,
    // LOGIN_FAILD
} from 'constants'

const initialState = {
    isLoggedIn: false,
    name: '',
    token: '',
    // whatever state a user holds
}

export default (state = initialState, { type, action }) => {
    switch (type) {
        case SIGN_UP_SUCCESS: return { ...state, isLoggedIn: true };
        case LOGGING_IN: return { ...state, isLoggedIn: true };
        default: return state;
    };
};