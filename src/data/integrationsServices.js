import * as brandsLogos from './importBrands';

const services = [
  {
    name: 'Stripe',
    key: 'LC_stripe',
    brandLogo: brandsLogos.stripeImage,
    category: 'Payment Gateways',
    active: true,
    connected: true,
    supported: true,
  },
  {
    name: 'Paypal',
    key: 'LC_paypal',
    brandLogo: brandsLogos.paypalImage,
    category: 'Payment Gateways',
    active: true,
    connected: true,
    supported: true,
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
    name: 'Checkout.com',
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
    name: '2Checkout',
    brandLogo: brandsLogos.towCheckoutLogo,
    category: 'Payment Gateways',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-AWeber',
    name: 'AWeber',
    brandLogo: brandsLogos.aweber,
    category: 'Auto Responders',
    active: false,
    connected: false,
    supported: true,
  },
  {
    key: 'LC-mailChimp',
    name: 'MailChimp',
    brandLogo: brandsLogos.mailChimp,
    category: 'Auto Responders',
    active: false,
    connected: false,
    supported: true,
  },
  {
    key: 'LC-activeCampaign',
    name: 'ActiveCampaign',
    brandLogo: brandsLogos.activeCampaign,
    category: 'Auto Responders',
    active: false,
    connected: false,
    supported: true,
  },
  {
    key: 'LC-getresponse',
    name: 'Getresponse',
    brandLogo: brandsLogos.getresponse,
    category: 'Auto Responders',
    active: false,
    connected: false,
    supported: true,
  },
  {
    key: 'LC-drip',
    name: 'Drip',
    brandLogo: brandsLogos.drip,
    category: 'Auto Responders',
    active: false,
    connected: false,
    supported: true,
  },
  {
    key: 'LC-ontraport',
    name: 'OntraPort',
    brandLogo: brandsLogos.ontraport,
    category: 'Auto Responders',
    active: false,
    connected: false,
    supported: true,
  },
  {
    key: 'LC-convertkit',
    name: 'Convertkit',
    brandLogo: brandsLogos.convertkit,
    category: 'Auto Responders',
    active: false,
    connected: false,
    supported: true,
  },
  {
    key: 'LC-infusionSoft',
    name: 'InfusionSoft',
    brandLogo: brandsLogos.infusionSoft,
    category: 'Auto Responders',
    active: false,
    connected: false,
    supported: true,
  },
  {
    key: 'LC-mooSend',
    name: 'MooSend',
    brandLogo: brandsLogos.mooSend,
    category: 'Auto Responders',
    active: false,
    connected: false,
    supported: true,
  },
  {
    key: 'LC-Kajabi',
    name: 'Kajabi',
    brandLogo: brandsLogos.Kajabi,
    category: 'Membership Platforms',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-Thinkific',
    name: 'Thinkific',
    brandLogo: brandsLogos.Thinkific,
    category: 'Membership Platforms',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-teachable',
    name: 'Teachable',
    brandLogo: brandsLogos.teachable,
    category: 'Membership Platforms',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-wishListMember',
    name: 'WishListMember',
    brandLogo: brandsLogos.wishListMember,
    category: 'Membership Platforms',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-memberMouse',
    name: 'MemberMouse',
    brandLogo: brandsLogos.memberMouse,
    category: 'Membership Platforms',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-everlesson',
    name: 'EverLesson',
    brandLogo: brandsLogos.everlesson,
    category: 'Membership Platforms',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-Memberful',
    name: 'Memberful',
    brandLogo: brandsLogos.Memberful,
    category: 'Membership Platforms',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-Demio',
    name: 'Demio',
    brandLogo: brandsLogos.Demio,
    category: 'Webinar Platforms',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-everWebinar',
    name: 'EverWebinar',
    brandLogo: brandsLogos.everWebinar,
    category: 'Webinar Platforms',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-webinarJam',
    name: 'WebinarJam',
    brandLogo: brandsLogos.webinarJam,
    category: 'Webinar Platforms',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-goToWebinar',
    name: 'GoToWebinar',
    brandLogo: brandsLogos.goToWebinar,
    category: 'Webinar Platforms',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-BigMarker',
    name: 'BigMarker',
    brandLogo: brandsLogos.BigMarker,
    category: 'Webinar Platforms',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-dropified',
    name: 'Dropified',
    brandLogo: brandsLogos.dropified,
    category: 'Dropshipping/Shipping',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-BigMarker',
    name: 'ShipStation',
    brandLogo: brandsLogos.shipStation,
    category: 'Dropshipping/Shipping',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-zapier',
    name: 'Zapier',
    brandLogo: brandsLogos.zapierBrand,
    category: 'Misc Integrations',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-twillio',
    name: 'Twillio',
    brandLogo: brandsLogos.twillio,
    category: 'Misc Integrations',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-wordpress',
    name: 'Wordpress',
    brandLogo: brandsLogos.wordpress,
    category: 'Misc Integrations',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-wooCommerce',
    name: 'WooCommerce',
    brandLogo: brandsLogos.wooCommerce,
    category: 'Misc Integrations',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-shopify',
    name: 'Shopify',
    brandLogo: brandsLogos.shopify,
    category: 'Misc Integrations',
    active: false,
    connected: false,
    supported: false,
  },
  {
    key: 'LC-taxamo',
    name: 'Taxamo',
    brandLogo: brandsLogos.taxamo,
    category: 'Misc Integrations',
    active: false,
    connected: false,
    supported: false,
  },
];


export default services.filter((service) => service.supported);

