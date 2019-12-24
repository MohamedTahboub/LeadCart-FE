import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import ReactNotification from 'react-notifications-component'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from 'store'
import 'config';


//temp pages 
import affiliatesImage from 'assets/images/affiliates_bg.svg'
import reportsImage from 'assets/images/reports_bg.svg'

import ImagePageContainer from 'components/ImagePageContainer'
import IntercomApp from './components/Intercom'


// Components
// import Header from 'components/Header'
import SideBar from 'components/SideBar'
import ProtectedRoute from 'components/ProtectedRoute'
// import NotificationMessage from 'components/NotificationMessage'
import LoadingBar from 'components/LoadingBar'
import FourOFour from 'containers/FourOFour'
import ErrorBoundary from 'containers/ErrorBoundary'

// Container
import Login from 'containers/Login';
import SignUp from 'containers/SignUp';
import SignUpSaasmantra from 'containers/SignUpSaasmantra';
import PromoCodeActivation from 'containers/PromoCodeActivation';
import ForgetPassword from 'containers/ForgetPassword';
import PasswordRest from 'containers/PasswordRest';
import Funnels from 'containers/Funnels';
import Fulfillments from 'containers/Fulfillments';
import ProductBuilder from 'containers/ProductBuilder';
import FunnelBuilder from 'containers/FunnelBuilder';

import Dashboard from 'containers/Dashboard'
import Products from 'containers/Products'
import Transactions from './containers/Transactions';
import CustomersLab from './containers/CustomersLab';
import Coupons from './containers/Coupons';
import Setting from './containers/Setting';
import SubAccounts from './containers/SubAccounts';
import Help from './containers/Help';


//services
import registerServiceWorker from 'services/RegisterServiceWorker';

// Styles
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import 'react-notifications-component/dist/theme.css'
import { APP_INIT } from 'constantsTypes';
import VerifyAccount from './containers/VerifyAccount';



window.onload = () => {
    store.dispatch({
        type: APP_INIT,
        payload: {
            chartsFilters: {
                date: {
                    min: moment().subtract(7, 'days').endOf('day').format('YYYY-MM-DD'),
                    max: moment().format('YYYY-MM-DD')
                }
            }
        }
    })
}

ReactDOM.render(
    <Provider store={store}>
        <React.Fragment>
            <LoadingBar />
            <IntercomApp />
            <ErrorBoundary>
                <BrowserRouter>
                    <Switch >
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/signup' component={SignUp} />
                        <Route exact path='/password/forget' component={ForgetPassword} />
                        <Route exact path='/password/reset/:hash' component={PasswordRest} />
                        <Route exact path='/promocode' component={PromoCodeActivation} />
                        <Route exact path='/saasmantra' component={SignUpSaasmantra} />
                        <Route path='/verify' component={VerifyAccount} />

                        <ProtectedRoute exact path='/checkout/:id' component={ProductBuilder} />
                        <ProtectedRoute exact path='/upsell/:id' component={ProductBuilder} />
                        <ProtectedRoute exact path='/funnels/:url' component={FunnelBuilder} />
                        <ProtectedRoute component={() => (
                            <Fragment>
                                <Route render={({ history }) => <SideBar history={history} />} />
                                <Switch>
                                    <Route exact path='/' component={Dashboard} />
                                    <Route exact path='/products' component={Products} />
                                    <Route path='/transactions' component={Transactions} />
                                    <Route path='/customers' component={CustomersLab} />
                                    <Route exact path='/coupons' component={Coupons} />
                                    <Route exact path='/fulfillment' component={Fulfillments} />
                                    <Route exact path='/funnels' component={Funnels} />
                                    <Route exact path='/reports' render={() => <ImagePageContainer title='REPORTS' image={reportsImage} />} />
                                    <Route exact path='/affiliates' render={() => <ImagePageContainer title='AFFILIATES' image={affiliatesImage} />} />
                                    <Route exact path='/sub-accounts' component={SubAccounts} />
                                    <Route path='/settings' component={Setting} />
                                    <Route exact path='/help' component={Help} />
                                    <Route exact path='*' component={FourOFour} />
                                </Switch>
                            </Fragment>
                        )}
                        />
                    </Switch>
                </BrowserRouter>
                <ReactNotification />
            </ErrorBoundary>
        </React.Fragment>
    </Provider>,
    document.getElementById('root')
)

if (process.env.NODE_ENV !== 'production')
    registerServiceWorker()
