import React from 'react';
import ReactDOM from 'react-dom';

// Routing
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Config
import 'config';

// Components
import Header from 'components/Header'
import Content from 'components/Content'
import ActiveContent from 'components/ActiveContent'
import SideBar from 'components/SideBar'

// import ErrorBoundary from 'components/ErrorBoundary'

// Container
import Login from 'containers/Login';
import SignUp from 'containers/SignUp';
import CreditCardForm from 'containers/CreditCardForm';
import ForgetPassword from 'containers/ForgetPassword';


import Dashboard from 'containers/Dashboard'
import Products from 'containers/Products'
import NewProduct from 'containers/NewProduct'


//services
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
                <div className='page-container'>
                    <Header />
                    <Content>
                        <Route path='*' render={({ history }) => <SideBar history={history} />} />
                        <ActiveContent >
                            <Route exact path='/' component={Dashboard} />
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/sighup' component={SignUp} />
                            <Route exact path='/recoverpwd' component={ForgetPassword} />
                            <Route exact path='/credit' component={CreditCardForm} />
                            <Route exact path='/products' component={Products} />
                            <Route exact path='/product/new' component={NewProduct} />
                        </ActiveContent>
                    </Content>
                </div>
            </Switch>
        </BrowserRouter>
        {/* </ErrorBoundary> */}
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
