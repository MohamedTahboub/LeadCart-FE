import { APP_INITIATION } from 'constantsTypes';

export default ({ dispatch, getState }) => next => action => {
    const { user: { user: { token } } } = getState()

    if (action.type !== APP_INITIATION) return next(action)

    // restore the application stored data in the loaclStorage 
}