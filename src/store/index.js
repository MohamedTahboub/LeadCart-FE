import rootReducer from 'reducers';
import middlewares from 'middlewares';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import LogRocket from 'logrocket';


const env = process.env.NODE_ENV;

const developmentDependencies = env === 'development' ? [logger] : [];

const applicationMiddleware = env !== 'production'
  ? applyMiddleware(
    ...developmentDependencies,
    ...middlewares
  )
  : applyMiddleware(
    ...middlewares,
    LogRocket.reduxMiddleware()
  );


const store = createStore(rootReducer, applicationMiddleware);

window.store = store;
export default store;
