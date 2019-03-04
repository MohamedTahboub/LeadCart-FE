import { APP_INIT } from 'constantsTypes';
import { getMembersSuccess } from 'actions/teamMembers';
import { getSubAccountsSuccess } from 'actions/agency';
import { getCouponsList } from 'actions/coupon';
import { getUserPaymentMethods } from 'actions/payments';
import { getUserProductsSuccess } from 'actions/products';
import { getCustomersActivities } from 'actions/activities';
import { getUpsellsSuccess } from 'actions/upsells';
import { getActivatedPromoCodesNumber } from 'actions/promoCode';
import { appLaunchFailed, appLaunchSuccess } from 'actions/appInit';
import { apiRequest } from 'actions/apiRequest';

import { filteringActivities } from 'libs';

export default ({ dispatch, getState }) => (next) => (action) => {
  const { user: { user: { token, ...user }, isLoggedIn } } = getState();

  // setTimeout(() => {
  //   consoleMessage();
  // }, 2000);
  if (action.type !== APP_INIT) return next(action);


  if (!isLoggedIn) return next(action);
  // /users/launch

  const onLunchSuccess = (data) => {
    dispatch(getMembersSuccess(data.members));
    dispatch(getSubAccountsSuccess(data.agents));
    dispatch(getCouponsList(data.coupons));
    dispatch(getUpsellsSuccess(data.upsells));
    dispatch(getUserPaymentMethods(data.paymentMethods));
    dispatch(getUserProductsSuccess({ products: data.products }));
    dispatch(getCustomersActivities(filteringActivities(data.customers)));
    dispatch(getActivatedPromoCodesNumber(data.promoCodes));
    return appLaunchSuccess('THE APPLICATION LUNCHED');
  };

  // upadateIntercomeWithUserDetails(user);
  dispatch(apiRequest({
    options: {
      method: 'get',
      uri: '/api/users/launch',
      contentType: 'json'
    },
    onSuccess: onLunchSuccess,
    onFailed: appLaunchFailed
  }));
  // const user = localStorage.user && JSON.parse(localStorage.user);

  // if (!getState().user.isLoggedIn && user.isLoggedIn === true) dispatch(loginSuccess(user));

  // restore the application stored data in the loaclStorage
};

function upadateIntercomeWithUserDetails ({ firstName, lastName, email }) {
  window.intercomSettings = {
    app_id: 'skynydft',
    name: `${firstName} ${lastName}`, // Full name
    email, // Email address
    created_at: window.intercomSettings.created_at // Signup date as a Unix timestamp
  };
}

function consoleMessage () {
  const LeadCarttext = `%c
  ╔╗░░╔═══╦═══╦═══╦═══╦═══╦═══╦════╗
  ║║░░║╔══╣╔═╗╠╗╔╗║╔═╗║╔═╗║╔═╗║╔╗╔╗║
  ║║░░║╚══╣║░║║║║║║║░╚╣║░║║╚═╝╠╝║║╚╝
  ║║░╔╣╔══╣╚═╝║║║║║║░╔╣╚═╝║╔╗╔╝░║║░░
  ║╚═╝║╚══╣╔═╗╠╝╚╝║╚═╝║╔═╗║║║╚╗░║║░░
  ╚═══╩═══╩╝░╚╩═══╩═══╩╝░╚╩╝╚═╝░╚╝░░
%c
╔╗╔╦══╦═╦═╗╔╗╔╦══╦═╦╦╦══╗
║╚╝║╔╗║╬║╬║║╚╝║╔╗║╔╣╔╣══╣
║╔╗║╠╣║╔╣╔╝║╔╗║╠╣║╚╣╚╬══║
╚╝╚╩╝╚╩╝╚╝░╚╝╚╩╝╚╩═╩╩╩══╝
`;


  if (process.env.NODE_ENV !== 'development') {
    console.clear();
    console.log(LeadCarttext, 'font-size:30px;color:lightblue', 'font-size:20px;color:gray');
  }
}
