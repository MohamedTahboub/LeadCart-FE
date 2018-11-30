import { combineReducers } from 'redux'
import user from './user'
import loading from './loading'
import validation from './validation'
import files from './files'

const rootReducer = combineReducers({
    user,
    loading,
    files,
    validation
})

export default rootReducer