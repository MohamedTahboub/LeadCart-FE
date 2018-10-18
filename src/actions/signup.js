import { SIGN_UP } from 'constantsTypes'

export const signUp = user => ({
    type: SIGN_UP,
    payload: user
})