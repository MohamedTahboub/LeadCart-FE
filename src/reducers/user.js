import {
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILD
} from 'constantsTypes'

const initialState = {
    isLoggedIn: false,
    user: {
        firstName: '',
        lastName: '',
        avatar_img: '',
        token: 'dsfadsaWD',
        status: false,
        role: '',
        level: 1
    },
    error: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SIGN_UP_SUCCESS: return { ...state, user: payload ,isLoggedIn:true};
        case SIGN_UP_FAILD: return { ...state, error: payload };
        default: return state;
    };
};