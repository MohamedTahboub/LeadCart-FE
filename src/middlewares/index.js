//importing the middlewares here
import appInit from './appInit'
import apiRequest from './apiRequest'
import login from './login'
import signup from './signup'
import storage from './storage'
import uploadingFiles from './uploadingFiles'
import product from './product'
import formsValidations from './formsValidations'

// exporting the middlewares as an array 
export default [signup, appInit, login, ...product, apiRequest, uploadingFiles, storage]