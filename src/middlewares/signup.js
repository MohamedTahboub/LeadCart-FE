import { SIGN_UP, SIGN_UP_SUCCESS } from 'constantsTypes'
import user from '../reducers/user';

export default ({ dispatch, setState }) => next => ({ type, payload }) => {

    if (type === SIGN_UP) {
        // validate the new user inputs 
        // isSignUpFormValid(user) && make arequest to sign a user Up

        // api request to signup user and when success it will dispatch assccess signup or failur 
        // dispatch(requestAPI({
        //     method : 'post',
        //     body: user,
        //     uri : '/api/signup'
        // } ,{ onSignUpSuccess , onSignUpFaild} ))
    } else {


    }
    next({ type, payload })
}