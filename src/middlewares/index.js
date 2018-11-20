//importing the middlewares here
import appInit from './appInit'
import apiRequest from './apiRequest'
import login from './login'
import signup from './signup'
import storage from './storage'
import uploadingFiles from './uploadingFiles'
import settings from './settings'
import product from './product'
import products from './products'
import notificationCenter from './notificationCenter'
import flashMessage from './flashMessage'
import payments from './payments'
import account from './account'
import agency from './agency'
import teamMembers from './teamMembers'
import modelsShapers from './modelsShapers'
import formsValidations from './formsValidations'

// exporting the middlewares as an array 
export default [
    signup,
    appInit,
    ...formsValidations,
    ...modelsShapers,
    notificationCenter,
    login,
    ...settings,
    ...product,
    products,
    payments,
    account,
    teamMembers,
    agency,
    flashMessage,
    apiRequest,
    uploadingFiles,
    storage
]
