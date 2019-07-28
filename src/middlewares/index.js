//importing the middlewares here
import appInit from './appInit'
import apiRequest from './apiRequest'
import login from './login'
import signup from './signup'
import agencyCodeActivation from './agencyCodeActivation'
import storage from './storage'
import uploadingFiles from './uploadingFiles'
import settings from './settings'
import product from './product'
import products from './products'
import notificationCenter from './notificationCenter'
import flashMessage from './flashMessage'
import payments from './payments'
import account from './account'
import coupon from './coupon'
import subAccounts from './subAccounts'
import teamMembers from './teamMembers'
import modelsShapers from './modelsShapers'
import upadteUserImage from './upadteUserImage'
import formsValidations from './formsValidations'
import upsells from './upsell'
import fulfillments from './fulfillments'
import emails from './emails'
import customers from './customers'
// import eventsTracker from './eventsTracker'
// exporting the middlewares as an array 
export default [
    appInit,
    ...formsValidations,
    ...modelsShapers,
    notificationCenter,
    login,
    signup,
    ...settings,
    products,
    ...upsells,
    ...fulfillments,
    payments,
    ...product,
    ...account,
    ...coupon,
    upadteUserImage,
    ...emails,
    ...customers,
    teamMembers,
    agencyCodeActivation,
    ...subAccounts,
    flashMessage,
    apiRequest,
    uploadingFiles,
    // eventsTracker,
    storage
]
