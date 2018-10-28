
import apiRequest from './helpers/apiRequest'
import { SIGN_UP } from 'constantsTypes';

import {
    signUpSuccess,
    signUpFaild
} from 'actions/signup'

export default ({ dispatch }) => next => action => {

    console.log(action)
    if (action.type !== SIGN_UP) return next(action)


    apiRequest({
        method: 'POST',
        body: action.payload,
        uri: '/api/users/signup'
    })
        .then(({ status,message, ...response }) => {
            console.log(status, response)
            return status ?
                dispatch(signUpSuccess(response))
                :
                dispatch(signUpFaild(message || response))
        })
        .catch(err => dispatch(signUpFaild(err.message)))



}