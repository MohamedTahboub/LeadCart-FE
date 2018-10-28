import {LOGIN, LOGIN_SUCCESS, LOGIN_FAILD, LOGIN_INVALID_FIELDS } from '../constantsTypes';


export const login = user => ({
    type: LOGIN,
    payload: user
})
export const loginSuccess = user => ({
    type: LOGIN_SUCCESS,
    payload: user
})
export const loginFaild = error => ({
    type: LOGIN_FAILD,
    payload: error
})

export const loginInvalidFields = errors => ({
    type: LOGIN_INVALID_FIELDS,
    payload: errors
})
