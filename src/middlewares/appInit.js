import { APP_INIT } from 'constantsTypes';
import { getMembersSuccess } from 'actions/teamMembers';
import { getSubAccountsSuccess } from 'actions/agency';
import { getCouponsList } from 'actions/coupon';
import { getUserPaymentMethods } from 'actions/payments';
import { getUserProductsSuccess } from 'actions/products';
import { getCustomers } from 'actions/customers';
import { getOrders } from 'actions/orders';
import { getUpsellsSuccess } from 'actions/upsells';
import { getFunnels } from 'actions/funnels';
import { getFulfillmentsSuccess } from 'actions/fulfillments';
import { getActivatedPromoCodesNumber } from 'actions/promoCode';
import { appLaunchFailed, appLaunchSuccess } from 'actions/appInit';
import { apiRequest } from 'actions/apiRequest';
import { updateMarketPlaceSettingsSuccess } from 'actions/settings';
import { getDashboardDataSuccess } from 'actions/dashboard';
import { filteringActivities, filterCustomers } from 'libs';
import { getEmailSettings } from 'actions/emails';
import { getUserPlanSuccess } from 'actions/billing';


window.user = '';
export default ({ dispatch, getState }) => (next) => (action) => {
  const {
    products: { products = [] } = {},
    user: {
      user: {
        token,
        ...user
      },
      isLoggedIn
    }
  } = getState();

  // setTimeout(() => {
  //   consoleMessage();
  // }, 2000);
  if (action.type !== APP_INIT) return next(action);


  if (!isLoggedIn) return next(action);
  // /users/launch
  const { payload, meta = {} } = action;
  const onLunchSuccess = (data) => {
    dispatch(getMembersSuccess(data.members));
    dispatch(getSubAccountsSuccess(data.agents));
    dispatch(getCouponsList(data.coupons));
    dispatch(getUpsellsSuccess(data.upsells));
    dispatch(getFulfillmentsSuccess(data.fulfillments));
    dispatch(getUserPaymentMethods(data.paymentMethods));
    dispatch(getDashboardDataSuccess(data.dashboard));
    dispatch(getFunnels(data.funnels || []));
    dispatch(getUserProductsSuccess({ products: data.products }));

    dispatch(getActivatedPromoCodesNumber(data.promoCodes));
    dispatch(updateMarketPlaceSettingsSuccess(data.marketPlace));
    dispatch(getEmailSettings(data.emailSettings));

    dispatch(getUserPlanSuccess({
      activePackage: data.activePackage,
      transactions: data.transactions
    }));

    dispatch(getOrders(data.orders));
    dispatch(getCustomers(data.customers));

    return appLaunchSuccess('THE APPLICATION LUNCHED');
  };

  cleanUpTheConsole();
  dispatch(apiRequest({
    options: {
      method: 'post',
      uri: '/api/users/launch',
      contentType: 'json',
      body: payload
    },
    onSuccess: (args) => {
      meta.onSuccess && meta.onSuccess(args);
      return onLunchSuccess(args);
    },
    onFailed: (message) => {
      meta.onFailed && meta.onFailed(message);
      return appLaunchFailed(message);
    }
  }));
  // const user = localStorage.user && JSON.parse(localStorage.user);

  // if (!getState().user.isLoggedIn && user.isLoggedIn === true) dispatch(loginSuccess(user));

  // restore the application stored data in the loaclStorage
};

function cleanUpTheConsole () {
  consoleMessage();
}


function consoleMessage () {
  const LeadCarttext = `%c
  ╔╗░░╔═══╦═══╦═══╦═══╦═══╦═══╦════╗
  ║║░░║╔══╣╔═╗╠╗╔╗║╔═╗║╔═╗║╔═╗║╔╗╔╗║
  ║║░░║╚══╣║░║║║║║║║░╚╣║░║║╚═╝╠╝║║╚╝
  ║║░╔╣╔══╣╚═╝║║║║║║░╔╣╚═╝║╔╗╔╝░║║░░
  ║╚═╝║╚══╣╔═╗╠╝╚╝║╚═╝║╔═╗║║║╚╗░║║░░
  ╚═══╩═══╩╝░╚╩═══╩═══╩╝░╚╩╝╚═╝░╚╝░░
%c wishes you
                 ╔╗╔╦══╦═╦═╗╔╗╔╦══╦═╦╦╦══╗
                 ║╚╝║╔╗║╬║╬║║╚╝║╔╗║╔╣╔╣══╣
                 ║╔╗║╠╣║╔╣╔╝║╔╗║╠╣║╚╣╚╬══║
                 ╚╝╚╩╝╚╩╝╚╝░╚╝╚╩╝╚╩═╩╩╩══╝
`;


  if (process.env.NODE_ENV !== 'development') {
    setTimeout(() => {
      console.clear();
      console.log(LeadCarttext, 'font-size:30px;color:lightblue', 'font-size:20px;color:gray');
    }, 1000);
  }
}
