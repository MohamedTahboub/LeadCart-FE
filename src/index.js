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
import ProtectedRoute from 'components/ProtectedRoute'
import FlashMessage from 'components/FlashMessage'
import UnderDevelopment from 'components/UnderDevelopment'
import LoadingBar from 'components/LoadingBar'

// import ErrorBoundary from 'components/ErrorBoundary'

// Container
import Login from 'containers/Login';
import SignUp from 'containers/SignUp';
import PromoCodeActivation from 'containers/PromoCodeActivation';
import ForgetPassword from 'containers/ForgetPassword';


import Dashboard from 'containers/Dashboard'
import Products from 'containers/Products'
import Product from 'containers/Product'
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
import { APP_INIT } from 'constantsTypes';

/* Temp page to represent the empty pages */

window.onload = () => {
    store.dispatch({type:APP_INIT})
}
// const store = createStore(rootReducer);
// store.subscribe(() => console.log('store', store.getState()));

ReactDOM.render(
    <Provider store={store}>
        <React.Fragment>
            <LoadingBar />
            <FlashMessage />
            {/* <ErrorBoundary> */}

            <BrowserRouter>
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={SignUp} />
                    <Route exact path='/recoverpwd' component={ForgetPassword} />
                    <Route exact path='/promocode' component={PromoCodeActivation} />
                    <ProtectedRoute component={() => (
                        <div className='page-container'>

                            <Route render={({ history }) => <Header history={history} />} />
                            <Content>
                                <Route render={({ history }) => <SideBar history={history} />} />
                                <ActiveContent >

                                    <Route exact path='/' component={Dashboard} />
                                    <Route exact path='/products' component={Products} />
                                    <Route exact path='/product/:id' component={Product} />
                                    <Route exact path='/activities' component={Activities} />
                                    <Route exact path='/coupons' component={Coupons} />
                                    <Route exact path='/upsells' component={UnderDevelopment} />
                                    <Route exact path='/reports' component={UnderDevelopment} />
                                    <Route exact path='/affiliates' component={UnderDevelopment} />
                                    <Route exact path='/agency' component={Agency} />
                                    <Route path='/settings' component={Setting} />
                                    <Route exact path='/help' component={UnderDevelopment} />
                                </ActiveContent>
                            </Content>
                        </div>)
                    } />

                </Switch>
            </BrowserRouter>
        </React.Fragment>
        {/* </ErrorBoundary> */}
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
