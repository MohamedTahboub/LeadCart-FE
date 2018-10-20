import { SIGN_UP_ON_FIRST_STAGE_COMPLETE,
    SIGN_UP_ON_FIRST_STAGE_SUBMITION,
    SIGN_UP_INVALID_FIELDS,
    SIGN_UP_SUBMIT } from 'constantsTypes'
import { SIGN_UP_SUCCESS, SIGN_UP_FAILD } from '../constantsTypes';

export const signUpFirstStageSubmite = user => ({
    type: SIGN_UP_ON_FIRST_STAGE_SUBMITION,
    payload: user
})
export const signUpFirstStageComplete = user => ({
    type: SIGN_UP_ON_FIRST_STAGE_COMPLETE,
    payload: user
})
export const signUpInvalidFields = errors => ({
    type: SIGN_UP_INVALID_FIELDS,
    payload: errors
})

export const signUpSubmite = user => ({
    type: SIGN_UP_SUBMIT,
    payload: user
})
export const signUpSuccess = user => ({
    type: SIGN_UP_SUCCESS,
    payload: user
})
export const signUpFaild = error => ({
    type: SIGN_UP_FAILD,
    payload: error
})
