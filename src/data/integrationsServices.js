import * as brandsLogos from './importBrands';

export default [
  {
    name: 'Stripe',
    key: 'LC_STRIPE',
    brandLogo: brandsLogos.stripeImage,
    category: 'Payment Gateways',
    active: true,
    connected: true,
    supported: false,
  },
  {
    name: 'Paypal',
    key: 'LC_PAYPAL',
    brandLogo: brandsLogos.paypalImage,
    category: 'Payment Gateways',
    active: true,
    connected: true,
    supported: false,
  }, {
    key: 'LC-RAZOR_PAY',
    name: 'RazorPay',
    brandLogo: brandsLogos.razorpayLogo,
    category: 'Payment Gateways',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-authorizeNetLogo',
    name: 'Authorize.Net',
    brandLogo: brandsLogos.authorizeNetLogo,
    category: 'Payment Gateways',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-checkoutLogo',
    name: 'Checkout',
    brandLogo: brandsLogos.checkoutLogo,
    category: 'Payment Gateways',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-braintreeLogo',
    name: 'Braintree',
    brandLogo: brandsLogos.braintreeLogo,
    category: 'Payment Gateways',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-towCheckoutLogo',
    name: 'TowCheckout',
    brandLogo: brandsLogos.towCheckoutLogo,
    category: 'Payment Gateways',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-AWEBER',
    name: 'AWeber',
    brandLogo: brandsLogos.aweber,
    category: 'Auto Responders',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-MAILCHIMP',
    name: 'MailChimp',
    brandLogo: brandsLogos.mailChimp,
    category: 'Auto Responders',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-ACTIVECAMPAIGN',
    name: 'ActiveCampaign',
    brandLogo: brandsLogos.activeCampaign,
    category: 'Auto Responders',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-getresponse',
    name: 'Getresponse',
    brandLogo: brandsLogos.getresponse,
    category: 'Auto Responders',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-drip',
    name: 'Drip',
    brandLogo: brandsLogos.drip,
    category: 'Auto Responders',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-ontraport',
    name: 'OntraPort',
    brandLogo: brandsLogos.ontraport,
    category: 'Auto Responders',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-convertkit',
    name: 'Convertkit',
    brandLogo: brandsLogos.convertkit,
    category: 'Auto Responders',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-infusionSoft',
    name: 'InfusionSoft',
    brandLogo: brandsLogos.infusionSoft,
    category: 'Auto Responders',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-mooSend',
    name: 'MooSend',
    brandLogo: brandsLogos.mooSend,
    category: 'Auto Responders',
    active: false,
    connected: false,
    supported: false,
  },
];

