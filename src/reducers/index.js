import { combineReducers } from 'redux'
import user from './user'
import loading from './loading'
import validation from './validation'
import files from './files'
import product from './product/index'
import products from './products'
import activities from './activities'
import customers from './customers'
import payments from './payments'
import flashMessage from './flashMessage'
import modals from './modals'
import account from './account'
import coupons from './coupons'
import teamMembers from './teamMembers'
import settings from './settings'
import agency from './agency'
import upsells from './upsells'
import fulfillments from './fulfillments'
import emails from './emails'
import dashboardData from './dashboardData'

const rootReducer = combineReducers({
    user,
    loading,
    files,
    product,
    products,
    activities,
    customers,
    modals,
    settings,
    emails,
    account,
    coupons,
    upsells,
    fulfillments,
    teamMembers,
    agency,
    payments,
    flashMessage,
    dashboardData,
    validation
})

export default rootReducer