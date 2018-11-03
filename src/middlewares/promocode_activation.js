import { PROMO_CODE_ACTIVATE } from '../constantsTypes';



export default ({ dispatch }) => next => action => {
    if(type !== PROMO_CODE_ACTIVATE) return next(action)


    apiRequest({
        method: 'POST',
        body: action.payload,
        uri: '/users/promo-code'
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