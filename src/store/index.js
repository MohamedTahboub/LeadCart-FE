import rootReducer from 'reducers';
import middlewares from 'middlewares';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

const env = process.env.NODE_ENV;

const applicationMiddleware = env === 'development'
  ? applyMiddleware(logger, ...middlewares)
  : applyMiddleware(...middlewares);


const store = createStore(rootReducer, applicationMiddleware);

window.store = store;
export default store;
