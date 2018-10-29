import apiRequest from './helpers/apiRequest'
import { LOGIN } from 'constantsTypes';

import {
    loginSuccess,
    loginFaild
} from 'actions/login'

export default ({ dispatch }) => next => action => {

    if (action.type !== LOGIN) return next(action)

    apiRequest({
        method: 'POST',
        body: action.payload,
        uri: '/api/users/login'
    })
        .then(({ success, message , data }) => {
            return success ?
                dispatch(loginSuccess(data))
                :
                dispatch(loginFaild(message))
        })
        .catch(err => dispatch(loginFaild('Something gone wrong,please try again later ')))
}