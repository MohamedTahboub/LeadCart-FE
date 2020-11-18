import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import ReactNotification from 'react-notifications-component';
import { Route, Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import ToolTip from 'react-tooltip';
import store from 'store';
import 'config';

// temp pages
import affiliatesImage from 'assets/images/affiliates_bg.svg';
import reportsImage from 'assets/images/reports_bg.svg';

import ImagePageContainer from 'components/ImagePageContainer';


// Components
// import Header from 'components/Header'
import SideBar from 'components/SideBar';
import ProtectedRoute from 'components/ProtectedRoute';
// import NotificationMessage from 'components/NotificationMessage'
import LoadingBar from 'components/LoadingBar';
import FourOFour from 'containers/FourOFour';
import ErrorBoundary from 'containers/ErrorBoundary';
import Leads from 'containers/Leads';

// Container
import Login from 'containers/Login';
import SignUp from 'containers/SignUp';
import PrivateSignUp from 'containers/PrivateSignUp';
import ForgetPassword from 'containers/ForgetPassword';
import PasswordRest from 'containers/PasswordRest';
import Funnels from 'containers/Funnels';
import ShippingRules from 'containers/ShippingRules';
// import Fulfillments from 'containers/Fulfillments';
// import ProductBuilder from 'containers/ProductBuilder';
import ProductBuilder from 'containers/ProductPageBuilder';
import FunnelBuilder from 'containers/FunnelBuilder';

import Dashboard from 'containers/Dashboard';
import Products from 'containers/Products';
import Integrations from 'containers/Integrations';
import registerServiceWorker from 'services/RegisterServiceWorker';
import Transactions from './containers/Transactions';
import CustomersLab from './containers/CustomersLab';
import Coupons from './containers/Coupons';
import Setting from './containers/BrandSettings';
// import SubAccounts from './containers/SubAccounts';
import Help from './containers/Help';
import PersonalSettings from './containers/PersonalSettings';
import Account from './containers/Account';
import SubAccounts from './containers/PersonalSettings/SubaccountsSection';


// services

// Styles
import 'rc-slider/assets/index.css';
import './index.css';
import 'antd/dist/antd.css';
import 'rc-tooltip/assets/bootstrap.css';
// import 'semantic-ui-css/semantic.min.css';
import 'react-notifications-component/dist/theme.css';
import { APP_INIT } from 'constantsTypes';
import IntercomApp from './components/Intercom';
import VerifyAccount from './containers/VerifyAccount';
import { history } from './history';


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
  });
};

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <LoadingBar />
      <IntercomApp />
      <ErrorBoundary>
        <Router history={history}>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/private-signup' component={PrivateSignUp} />
            <Route exact path='/password/forgot' component={ForgetPassword} />
            <Route exact path='/password/reset/:hash' component={PasswordRest} />
            <Route path='/verify' component={VerifyAccount} />
            <ProtectedRoute exact path='/products/:productId' component={ProductBuilder} />
            <ProtectedRoute exact path='/funnels/:funnelUrl/products/:productId' component={ProductBuilder} />
            <ProtectedRoute exact path='/funnels/:url' component={FunnelBuilder} />
            <ProtectedRoute component={() => (
              <Fragment>
                <Route render={({ history }) => <SideBar history={history} />} />
                <Switch>
                  <Route exact path='/' component={Dashboard} />
                  <Route exact path='/products' component={Products} />
                  <Route path='/transactions' component={Transactions} />
                  <Route path='/leads' component={Leads} />
                  <Route path='/customers' component={CustomersLab} />
                  <Route path='/shippingRules' component={ShippingRules} />
                  <Route exact path='/coupons' component={Coupons} />
                  <Route exact path='/integrations' component={Integrations} />
                  <Route exact path='/funnels' component={Funnels} />
                  <Route exact path='/reports' render={() => <ImagePageContainer title='REPORTS' image={reportsImage} />} />
                  <Route exact path='/affiliates' render={() => <ImagePageContainer title='AFFILIATES' image={affiliatesImage} />} />
                  <Route exact path='/settings/account' component={Account} />
                  <Route path='/settings' component={Setting} />
                  <Route exact path='/help' component={Help} />
                  <Route exact path='/account' component={PersonalSettings} />
                  <Route exact path='/sub-accounts' component={SubAccounts} />
                  <Route exact path='*' component={FourOFour} />
                </Switch>
              </Fragment>
            )}
            />
          </Switch>
        </Router>
        <ReactNotification />
      </ErrorBoundary>
      <ToolTip />
    </React.Fragment>
  </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') registerServiceWorker();
