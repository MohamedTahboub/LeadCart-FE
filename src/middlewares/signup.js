
import apiRequest from './helpers/apiRequest'
import { Rules, Vaidator } from './helpers/validators'
import { SIGN_UP_SUBMIT, SIGN_UP_ON_FIRST_STAGE_SUBMITION } from '../constantsTypes';

import {
    signUpFirstStageComplete,
    signUpInvalidFields,
    signUpSuccess,
    signUpFaild
} from 'actions/signup'

export default ({ dispatch }) => next => ({ type, payload }) => {

    if (type === SIGN_UP_ON_FIRST_STAGE_SUBMITION) {
        const rules = {
            'username': [Rules.isRequired],
            'email': [Rules.email],
            'company': [Rules.isRequired],
            'password': [Rules.isRequired],
            'subdomain': [Rules.subdomain]
        }

        const isInvalid = Vaidator(payload, rules)

        if (isInvalid)
            dispatch(signUpInvalidFields(isInvalid))
        else
            dispatch(signUpFirstStageComplete(payload))


    } else if (type === SIGN_UP_SUBMIT) {
        const rules = { 'password': [Rules.isRequired] }

        const isInvalid = Vaidator(payload, rules)

        if (isInvalid)
            dispatch(signUpInvalidFields(isInvalid))
        else {
            apiRequest({
                method: 'POST',
                body: payload,
                uri: '/users/signup'
            })
                .then(({ status, ...response }) =>
                    status ?
                        dispatch(signUpSuccess(response))
                        :
                        dispatch(signUpFaild(response)))
                .catch(err => dispatch(signUpFaild(err.message)))

        }

    } else return next({ type, payload })


}