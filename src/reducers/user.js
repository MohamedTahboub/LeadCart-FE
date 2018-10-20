import {
    // SIGNING_UP,
    SIGN_UP_SUCCESS,
    // SIGN_UP_FAILD,
    LOGGING_IN,
    SIGN_UP_ON_FIRST_STAGE_COMPLETE,
    SIGN_UP_SUBMIT
    // LOGIN_SUCCESS,
    // LOGIN_FAILD
} from 'constantsTypes'

const initialState = {
    isLoggedIn: false,
    name: '',
    token: '',
    signup_stage: 1,
    sign_up_form: {}
    // whatever state a user holds
}

export default (state = initialState, { type, payload }) => {
    console.log(type)
    switch (type) {
        case SIGN_UP_ON_FIRST_STAGE_COMPLETE: return { ...state, sign_up_form:payload , signup_stage: 2 };
        case SIGN_UP_SUBMIT: return { ...state, sign_up_form: { ...state.sign_up_form, ...payload } };
        case SIGN_UP_SUCCESS: return { ...state, isLoggedIn: true };
        case LOGGING_IN: return { ...state, isLoggedIn: true };
        default: return state;
    };
};