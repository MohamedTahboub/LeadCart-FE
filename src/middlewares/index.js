//importing the middlewares here
import appInit from './appInit'
import login from './login'
import signup from './signup'
import storage from './storage'
import formsValidations from './formsValidations'

// exporting the middlewares as an array 
export default [signup, appInit, login, storage]