import { combineReducers } from 'redux'
import user from './user'
import loading from './loading'
import validation from './validation'
import files from './files'
import product from './product'

const rootReducer = combineReducers({
    user,
    loading,
    files,
    product,
    validation
})

export default rootReducer