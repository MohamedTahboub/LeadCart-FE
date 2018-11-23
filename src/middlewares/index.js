//importing the middlewares here
import appInit from './appInit'
import apiRequest from './apiRequest'
import login from './login'
import proSignup from './proSignup'
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
import agency from './agency'
import teamMembers from './teamMembers'
import modelsShapers from './modelsShapers'
import upadteUserImage from './upadteUserImage'
import formsValidations from './formsValidations'

// exporting the middlewares as an array 
export default [
    appInit,
    ...formsValidations,
    ...modelsShapers,
    notificationCenter,
    login,
    proSignup,
    ...settings,
    products,
    payments,
    ...product,
    account,
    upadteUserImage,
    teamMembers,
    agencyCodeActivation,
    agency,
    flashMessage,
    apiRequest,
    uploadingFiles,
    storage
]
