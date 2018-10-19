import rootReducer from 'reducers';
import middlewares from 'middlewares'
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'

const applicationMiddleware = applyMiddleware(logger,...middlewares)



const store =  createStore(rootReducer, applicationMiddleware)

window.store = store
export default store
