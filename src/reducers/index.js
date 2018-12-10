import { combineReducers } from 'redux'
import user from './user'
import loading from './loading'
import validation from './validation'
import files from './files'
// import product from './product'
import products from './products'
import activities from './activities'
import payments from './payments'
import flashMessage from './flashMessage'
import modals from './modals'
import account from './account'
import coupons from './coupons'
import teamMembers from './teamMembers'
import settings from './settings'
import agency from './agency'

const rootReducer = combineReducers({
    user,
    loading,
    files,
    // product,
    products,
    activities,
    modals,
    settings,
    account,
    coupons,
    teamMembers,
    agency,
    payments,
    flashMessage,
    validation
})

export default rootReducer