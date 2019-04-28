import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

// Routing
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { createStore } from 'redux';
import { Provider } from 'react-redux';

import store from 'store'
// Config
import 'config';


//temp pages 
import upsellsImage from 'assets/images/upsells_bg.svg'
import affiliatesImage from 'assets/images/affiliates_bg.svg'
import reportsImage from 'assets/images/reports_bg.svg'

import ImagePageContainer from 'components/ImagePageContainer'



// Components
import Header from 'components/Header'
// import Content from 'components/Content'
// import ActiveContent from 'components/ActiveContent'
import SideBar from 'components/SideBar'
import ProtectedRoute from 'components/ProtectedRoute'
import NotificationMessage from 'components/NotificationMessage'
// import UnderDevelopment from 'components/UnderDevelopment'
import LoadingBar from 'components/LoadingBar'

import ErrorBoundary from 'containers/ErrorBoundary'

// Container
import Login from 'containers/Login';
// import SignUp from 'containers/SignUp';
import SignUpSaasmantra from 'containers/SignUpSaasmantra';
import PromoCodeActivation from 'containers/PromoCodeActivation';
import ForgetPassword from 'containers/ForgetPassword';
import PasswordRest from 'containers/PasswordRest';
import Upsells from 'containers/Upsells';
import Fulfillments from 'containers/Fulfillments';

// import Dashboard from 'containers/Dashboard'
import Guidelines from 'containers/Guidelines'
import Products from 'containers/Products'
// import Product from 'containers/Product'
import Activities from './containers/Activities';
import CustomersLab from './containers/CustomersLab';
import Coupons from './containers/Coupons';
import Setting from './containers/Setting';
import Agency from './containers/Agency';
import Help from './containers/Help';


//services
import registerServiceWorker from 'services/RegisterServiceWorker';

// Styles
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import { APP_INIT } from 'constantsTypes';
import VerifyAccount from './containers/VerifyAccount';

/* Temp page to represent the empty pages */

window.onload = () => {
    store.dispatch({ type: APP_INIT })
}

ReactDOM.render(
    <Provider store={store}>
        <React.Fragment>
            <LoadingBar />
            {/*<ErrorBoundary>*/}

            <BrowserRouter>
                <Switch>
                <Route exact path='/login' component={Login} />
                    <Route exact path='/password/forget' component={ForgetPassword} />
                    <Route exact path='/password/reset/:hash' component={PasswordRest} />
                    <Route exact path='/promocode' component={PromoCodeActivation} />
                    <Route exact path='/saasmantra' component={SignUpSaasmantra} />
                    <Route  path='/verify' component={VerifyAccount} />
                    <ProtectedRoute component={() => (
                        <Fragment>
                            <Route render={({ history }) => <SideBar history={history} />} />
                            <Route exact path='/' component={Guidelines} />
                            <Route exact path='/products' component={Products} />
                            <Route path='/activities' component={Activities} />
                            <Route path='/customers' component={CustomersLab} />
                            <Route exact path='/coupons' component={Coupons} />
                            <Route exact path='/upsells' component={Upsells} />
                            <Route exact path='/fulfillments' component={Fulfillments} />
                            <Route exact path='/funnels' render={() => <ImagePageContainer title='Funnels' image={upsellsImage} />} />
                            <Route exact path='/reports' render={() => <ImagePageContainer title='REPORTS' image={reportsImage} />} />
                            <Route exact path='/affiliates' render={() => <ImagePageContainer title='AFFILIATES' image={affiliatesImage} />} />
                            <Route exact path='/agency' component={Agency} />
                            <Route path='/settings' component={Setting} />
                            <Route exact path='/help' component={Help} />
                        </Fragment>
                    )}
                    />
                </Switch>
            </BrowserRouter>

            {/*</ErrorBoundary>*/}
            <NotificationMessage />
        </React.Fragment>
    </Provider>,
    document.getElementById('root')
)

if (process.env.NODE_ENV !== 'production')
    registerServiceWorker()
