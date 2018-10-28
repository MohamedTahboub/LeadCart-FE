import { Rules, Vaidator } from '../helpers/validators'
import { signUpInvalidFields } from 'actions/signup'
import { SIGN_UP } from 'constantsTypes';

export default ({ dispatch }) => next => action => {

    if (action.type !== SIGN_UP)  return next(action)
        const rules = {
            'username': [Rules.isRequired],
            'email': [Rules.email],
            'company': [Rules.isRequired],
            'password': [Rules.isRequired],
            'subdomain': [Rules.subdomain]
        }

        const isInvalid = Vaidator(action.payload, rules)

        if (isInvalid)
            dispatch(signUpInvalidFields(isInvalid))
        else
            next(action)
   
}