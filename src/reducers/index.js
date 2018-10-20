import { combineReducers } from 'redux'
import user from './user'
import loading from './loading'
import validation from './validation'

const rootReducer = combineReducers({
    user,
    loading,
    validation
})

export default rootReducer