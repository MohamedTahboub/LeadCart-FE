import { APP_INIT } from 'constantsTypes';
import { getMembersSuccess } from 'actions/teamMembers';
import { getSubAccountsSuccess } from 'actions/agency';
import { getCouponsList } from 'actions/coupon';
import { getUserProductsSuccess } from 'actions/products';
import { getCustomers } from 'actions/customers';
import { getOrders } from 'actions/orders';
import { getFunnels } from 'actions/funnels';
import { getUserIntegration } from 'actions/integrations';
import { getActivatedPromoCodesNumber } from 'actions/promoCode';
import { appLaunchFailed, appLaunchSuccess } from 'actions/appInit';
import { apiRequest } from 'actions/apiRequest';
import { updateMarketPlaceSettingsSuccess } from 'actions/settings';
import { getDashboardDataSuccess } from 'actions/dashboard';
import { getEmailSettings } from 'actions/emails';
import { getUserPlanSuccess } from 'actions/billing';
import { getTranslationsLanguages } from 'actions/translations';
import { getUserBrands } from 'actions/brands';
import { getPromoCodes } from 'actions/redemption';
import { getTaxes } from 'actions/taxes';
import { getDestinationZones } from 'actions/destinationZones';
import { getInvoicingDetails } from 'actions/invoicing';
import { getShippingRules } from 'actions/shippingRules';
import { getBrandFonts } from 'actions/productsFonts';


window.user = '';
export default ({ dispatch, getState }) => (next) => (action) => {
  const { user: { isLoggedIn } } = getState();

  if (action.type !== APP_INIT) return next(action);


  if (!isLoggedIn) return next(action);

  const { payload, meta = {} } = action;
  const onLunchSuccess = (data) => {
    dispatch(getMembersSuccess(data.members));
    dispatch(getSubAccountsSuccess(data.agents));
    dispatch(getCouponsList(data.coupons));
    dispatch(getPromoCodes({
      codes: data.promoCodes,
      credits: data.credits
    }));
    dispatch(getDashboardDataSuccess(data.dashboard));
    dispatch(getFunnels(data.funnels || []));
    dispatch(getUserProductsSuccess({ products: data.products }));
    dispatch(getActivatedPromoCodesNumber(data.promoCodes));
    dispatch(updateMarketPlaceSettingsSuccess(data.marketPlace));
    dispatch(getTranslationsLanguages(data.languages));
    dispatch(getEmailSettings(data.emailSettings));
    dispatch(getUserBrands(data.brands));
    dispatch(getUserIntegration(data.integrations));

    dispatch(getUserPlanSuccess({
      activePackage: data.activePackage,
      transactions: data.transactions
    }));

    dispatch(getOrders(data.orders));
    dispatch(getCustomers(data.customers));
    dispatch(getTaxes(data.taxes || []));
    dispatch(getDestinationZones(data.destinationZones || []));
    dispatch(getInvoicingDetails(data.invoicing));
    dispatch(getShippingRules(data.shippingMethods || []));
    dispatch(getBrandFonts(data.productsFonts || []));


    return appLaunchSuccess(data);
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
};

const cleanUpTheConsole = () => {
  consoleMessage();
};

const consoleMessage = () => {
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
};
