import React from 'react';
import ReactDOM from 'react-dom';

// Routing
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { createStore } from 'redux';
import { Provider } from 'react-redux';

import store from 'store'
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
import Activities from './containers/Activities';
import Coupons from './containers/Coupons';
import Upsells from './containers/Upsells';
import Setting from './containers/Setting';
import Agency from './containers/Agency';

//services
import registerServiceWorker from 'services/RegisterServiceWorker';
// import rootReducer from './reducers';

// Styles
import './index.css';


/* Temp page to represent the empty pages */

const EmptyPage = ({ history }) => (
    <span> This page ({history.location.pathname.slice(1)}) still under development</span>
)


// const store = createStore(rootReducer);
// store.subscribe(() => console.log('store', store.getState()));

ReactDOM.render(
    <Provider store={store}>
        {/* <ErrorBoundary> */}
        <BrowserRouter>
            <Switch>
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/recoverpwd' component={ForgetPassword} />
                <Route exact path='/credit' component={CreditCardForm} />
                <div className='page-container'>
                    <Route render={({ history }) => <Header history={history} />} />
                    <Content>
                        <Route render={({ history }) => <SideBar history={history} />} />
                        <ActiveContent >

                            <Route exact path='/' component={Dashboard} />
                            <Route exact path='/products' component={Products} />
                            <Route exact path='/product/new' component={NewProduct} />
                            <Route exact path='/activities' component={Activities} />
                            <Route exact path='/coupons' component={Coupons} />
                            <Route exact path='/upsells' component={Upsells} />
                            <Route exact path='/reports' component={EmptyPage} />
                            <Route exact path='/affiliates' component={EmptyPage} />
                            <Route exact path='/agency' component={Agency} />
                            <Route exact path='/setting' component={Setting} />
                            <Route exact path='/help' component={EmptyPage} />
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
