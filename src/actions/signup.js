import {SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILED, SIGN_UP_INVALID_FIELDS } from '../constantsTypes';


export const signUp = user => ({
    type: SIGN_UP,
    payload: user
})
export const signUpSuccess = user => ({
    type: SIGN_UP_SUCCESS,
    payload: user
})
export const signUpFailed = error => ({
    type: SIGN_UP_FAILED,
    payload: error
})

export const signUpInvalidFields = errors => ({
    type: SIGN_UP_INVALID_FIELDS,
    payload: errors
})
