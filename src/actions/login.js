import {LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, LOGIN_INVALID_FIELDS } from '../constantsTypes';


export const login = user => ({
    type: LOGIN,
    payload: user
})
export const loginSuccess = user => ({
    type: LOGIN_SUCCESS,
    payload: user
})
export const loginFailed = error => ({
    type: LOGIN_FAILED,
    payload: error
})

export const loginInvalidFields = errors => ({
    type: LOGIN_INVALID_FIELDS,
    payload: errors
})
