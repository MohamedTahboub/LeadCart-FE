import { combineReducers } from 'redux'
import user from './user'
import loading from './loading'
import validation from './validation'
import files from './files'
import product from './product'
import products from './products'
import payments from './payments'
import flashMessage from './flashMessage'
import modals from './modals'

const rootReducer = combineReducers({
    user,
    loading,
    files,
    product,
    products,
    modals,
    payments,
    flashMessage,
    validation
})

export default rootReducer