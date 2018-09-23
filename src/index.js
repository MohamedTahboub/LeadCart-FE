import React from 'react';
import ReactDOM from 'react-dom';

// Routing
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Config
import 'config';

// Components
// import ErrorBoundary from 'components/ErrorBoundary'

// Container
// import Login from 'containers/Login';
// import SignUp from 'containers/SignUp';
// import CreditCardForm from 'containers/CreditCardForm';
import ForgetPassword from 'containers/ForgetPassword';
// import Home from 'containers/Home';
import registerServiceWorker from 'services/RegisterServiceWorker';
import rootReducer from './reducers';

// Styles
import './index.css';

const store = createStore(rootReducer);
store.subscribe(() => console.log('store', store.getState()));

ReactDOM.render(
  <Provider store={store}>
    {/* <ErrorBoundary> */}
    <BrowserRouter>
      <Switch>
        {/* <Route exact path='/' component={Home} /> */}
        {/* <Route path='/login' component={Login} /> */}
        {/* <Route path='/register' component={SignUp} /> */}
        {/* <Route path='/credit' component={CreditCardForm} /> */}
        <Route path='/forget' component={ForgetPassword} />
      </Switch>
    </BrowserRouter>
    {/* </ErrorBoundary> */}
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
