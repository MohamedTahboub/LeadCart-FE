import { APP_INIT } from 'constantsTypes';
import { getMembersSuccess } from 'actions/teamMembers';
import { getSubAccountsSuccess } from 'actions/agency';
import { getCouponsList } from 'actions/coupon';
import { getUserPaymentMethods } from 'actions/payments';
import { getUserProductsSuccess } from 'actions/products';
import { getActivities, getCustomers } from 'actions/activities';
import { getUpsellsSuccess } from 'actions/upsells';
import { getFulfillmentsSuccess } from 'actions/fulfillments';
import { getActivatedPromoCodesNumber } from 'actions/promoCode';
import { appLaunchFailed, appLaunchSuccess } from 'actions/appInit';
import { apiRequest } from 'actions/apiRequest';
import { updateMarketPlaceSettings } from 'actions/settings';
import { filteringActivities, filterCustomers } from 'libs';
import { getEmailSettings } from 'actions/emails';
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

  const onLunchSuccess = (data) => {
    dispatch(getMembersSuccess(data.members));
    dispatch(getSubAccountsSuccess(data.agents));
    dispatch(getCouponsList(data.coupons));
    dispatch(getUpsellsSuccess(data.upsells));
    dispatch(getFulfillmentsSuccess(data.fulfillments));
    dispatch(getUserPaymentMethods(data.paymentMethods));
    dispatch(getUserProductsSuccess({ products: data.products }));

    dispatch(getActivities(filteringActivities(data.orders)));
    dispatch(getCustomers(filterCustomers(data.orders, data.products)));

    dispatch(getActivatedPromoCodesNumber(data.promoCodes));
    dispatch(updateMarketPlaceSettings(data.marketPlace));
    dispatch(getEmailSettings(data.emailSettings));
    return appLaunchSuccess('THE APPLICATION LUNCHED');
  };

  upadateIntercomeWithUserDetails(user, { products });
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

function upadateIntercomeWithUserDetails ({
  firstName,
  lastName,
  email
}, data) {
  if (!window.user) window.user = email;
  if (window.intercomSettings.email === email) return;
  // window.intercomSettings = {
  //   app_id: 'skynydft',
  //   name: `${firstName} ${lastName}`, // Full name
  //   email, // Email address
  //   created_at: window.intercomSettings.created_at // Signup date as a Unix timestamp
  // };

  window.intercomSettings = {
    app_id: 'skynydft',
    email,
    user_id: localStorage.leadcart_user_id,
    name: `${firstName} ${lastName}`,
    products: JSON.stringify(data)
  };

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
