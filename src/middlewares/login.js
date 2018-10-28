import apiRequest from './helpers/apiRequest'
import { SIGN_UP } from 'constantsTypes';

import {
    signUpSuccess,
    signUpFaild
} from 'actions/signup'

export default ({ dispatch }) => next => action => {

    if (action.type !== SIGN_UP) return next(action)


    apiRequest({
        method: 'POST',
        body: action.payload,
        uri: '/api/users/login'
    })
        .then(({ status, ...response }) => {
            console.log(status, response)
            return status ?
                dispatch(signUpSuccess(response))
                :
                dispatch(signUpFaild(response))
        })
        .catch(err => dispatch(signUpFaild(err.message)))



}