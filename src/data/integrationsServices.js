import * as brandsLogos from './importBrands';
import { mapListToObject } from 'libs';
import config from 'config';
const { ZAPIER_INVITATION_LINK } = config;

const services = [
  {
    name: 'Stripe',
    key: 'lc_stripe',
    brandLogo: brandsLogos.stripeImage,
    category: 'Payment Gateways',
    description: 'Online payment processing for internet businesses',
    active: false,
    connected: false,
    supported: true
  },
  {
    name: 'Paypal',
    key: 'lc_paypal',
    brandLogo: brandsLogos.paypalImage,
    category: 'Payment Gateways',
    description: 'An online financial service that allows you to pay for items using a secure internet account',
    active: false,
    connected: false,
    supported: true
  }, {
    key: 'lc_razorpay',
    name: 'Razorpay',
    brandLogo: brandsLogos.razorpayLogo,
    category: 'Payment Gateways',
    description: 'An Indian payment gateway that accepts payments from customers. Automate payouts to vendors and employees.',
    active: false,
    connected: false,
    supported: true
  },
  {
    key: 'lc_offlinepayment',
    name: 'Offline Payment Method',
    brandLogo: brandsLogos.offlinePaymentLogo,
    category: 'Payment Gateways',
    description: 'Add a custom offline payment for your customers, with notes of what they should do to complete the purchases using this method.',
    action: 'create_offline_payment',
    active: false,
    connected: false,
    customCard: {
      enabled: true,
      hasHover: false,
      actionLabel: 'Create'
    },
    supported: true
  },
  {
    key: 'lc_authorizenetlogo',
    name: 'Authorize.Net',
    brandLogo: brandsLogos.authorizeNetLogo,
    category: 'Payment Gateways',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_checkoutlogo',
    name: 'Checkout.com',
    brandLogo: brandsLogos.checkoutLogo,
    category: 'Payment Gateways',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_braintreelogo',
    name: 'Braintree',
    brandLogo: brandsLogos.braintreeLogo,
    category: 'Payment Gateways',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_towcheckoutlogo',
    name: '2Checkout',
    brandLogo: brandsLogos.towCheckoutLogo,
    category: 'Payment Gateways',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_aweber',
    name: 'AWeber',
    brandLogo: brandsLogos.aweber,
    category: 'Auto Responders',
    description: 'Email marketing software, Build your email lists, send emails, and connect with your audience.',
    active: false,
    connected: false,
    supported: true
  },
  {
    key: 'lc_moosend',
    name: 'MooSend',
    brandLogo: brandsLogos.mooSend,
    category: 'Auto Responders',
    description: 'Email marketing & marketing automation platform, with newsletter templates, list segmentation.',
    active: false,
    connected: false,
    supported: true
  },
  {
    key: 'lc_hubspot',
    name: 'HubSpot',
    brandLogo: brandsLogos.hubspot,
    category: 'Auto Responders',
    description: 'Full stack of software for marketing, sales, and customer service, with a completely free CRM at its core.',
    active: false,
    connected: false,
    supported: true
  },
  {
    key: 'lc_mailchimp',
    name: 'MailChimp',
    brandLogo: brandsLogos.mailChimp,
    category: 'Auto Responders',
    description: 'Marketing automation platform and an email marketing service.',
    active: false,
    connected: false,
    supported: true
  }, {
    key: 'lc_convertkit',
    name: 'Convertkit',
    brandLogo: brandsLogos.convertkit,
    category: 'Auto Responders',
    fields: [{ name: 'apiKey', label: 'API Secret' }],
    description: 'Email marketing software for creators',
    active: false,
    connected: false,
    supported: true
  },
  {
    key: 'lc_activecampaign',
    name: 'ActiveCampaign',
    brandLogo: brandsLogos.activeCampaign,
    category: 'Auto Responders',
    description: 'Email marketing, marketing automation, sales automation, and CRM software platform',
    active: false,
    fields: [
      { name: 'apiUrl', label: 'API Url' },
      { name: 'apiKey', label: 'API Key' }
    ],
    connected: false,
    supported: true
  }, {
    key: 'lc_mailerlite',
    name: 'MailerLite',
    brandLogo: brandsLogos.mailerLite,
    category: 'Auto Responders',
    description: 'Email marketing tool that support landing pages and automation for your campaigns.',
    active: false,
    connected: false,
    supported: true
  },
  {
    key: 'lc_kirim',
    name: 'Kirim Email',
    brandLogo: brandsLogos.kirimEmailLogo,
    category: 'Auto Responders',
    description: 'An Email Marketing Software with built-in email validation & automatic list cleaner',
    active: false,
    connected: false,
    fields: [
      { name: 'username', label: 'Username' },
      { name: 'apiKey', label: 'API Key' }
    ],
    supported: true
  },
  {
    key: 'lc_automizy',
    name: 'Automizy',
    brandLogo: brandsLogos.automizyLogo,
    category: 'Auto Responders',
    description: 'An Email Marketing Software that is designed to increase your open rates.',
    active: false,
    connected: false,
    supported: true
  },
  {
    key: 'lc_getresponse',
    name: 'Getresponse',
    brandLogo: brandsLogos.getresponse,
    category: 'Auto Responders',
    description: 'Email marketing platform that enables entrepreneurs develop relationships with clients.',
    active: false,
    connected: false,
    supported: true
  }, {
    key: 'lc_drip',
    name: 'Drip',
    brandLogo: brandsLogos.drip,
    category: 'Auto Responders',
    description: 'Personalized marketing to current and prospective customers through a marketing automation platform.',
    active: false,
    connected: false,
    supported: true
  },
  {
    key: 'lc_ontraport',
    name: 'OntraPort',
    brandLogo: brandsLogos.ontraport,
    category: 'Auto Responders',
    description: 'Business automation software for entrepreneurs, solopreneurs and small businesses',
    active: false,
    connected: false,
    supported: true
  },
  {
    key: 'lc_infusionsoft',
    name: 'InfusionSoft',
    brandLogo: brandsLogos.infusionSoft,
    category: 'Auto Responders',
    description: 'Email marketing platform that provides automation, marketing & sales tools',
    active: false,
    connected: false,
    supported: true
  },
  {
    key: 'lc_kajabi',
    name: 'Kajabi',
    brandLogo: brandsLogos.Kajabi,
    category: 'Membership Platforms',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_thinkific',
    name: 'Thinkific',
    brandLogo: brandsLogos.Thinkific,
    category: 'Membership Platforms',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_teachable',
    name: 'Teachable',
    brandLogo: brandsLogos.teachable,
    category: 'Membership Platforms',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_wishlistmember',
    name: 'WishListMember',
    brandLogo: brandsLogos.wishListMember,
    category: 'Membership Platforms',
    fields: [
      { name: 'apiUrl', label: 'API Url' },
      { name: 'apiKey', label: 'API Key' }
    ],
    active: false,
    connected: false,
    supported: true
  },
  {
    key: 'lc_membermouse',
    name: 'MemberMouse',
    brandLogo: brandsLogos.memberMouse,
    category: 'Membership Platforms',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_everlesson',
    name: 'EverLesson',
    brandLogo: brandsLogos.everlesson,
    category: 'Membership Platforms',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_memberful',
    name: 'Memberful',
    brandLogo: brandsLogos.Memberful,
    category: 'Membership Platforms',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_demio',
    name: 'Demio',
    brandLogo: brandsLogos.Demio,
    category: 'Webinar Platforms',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_everwebinar',
    name: 'EverWebinar',
    brandLogo: brandsLogos.everWebinar,
    category: 'Webinar Platforms',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_webinarjam',
    name: 'WebinarJam',
    brandLogo: brandsLogos.webinarJam,
    category: 'Webinar Platforms',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_gotowebinar',
    name: 'GoToWebinar',
    brandLogo: brandsLogos.goToWebinar,
    category: 'Webinar Platforms',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_bigmarker',
    name: 'BigMarker',
    brandLogo: brandsLogos.BigMarker,
    category: 'Webinar Platforms',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_dropified',
    name: 'Dropified',
    brandLogo: brandsLogos.dropified,
    category: 'Dropshipping/Shipping',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_bigmarker',
    name: 'ShipStation',
    brandLogo: brandsLogos.shipStation,
    category: 'Dropshipping/Shipping',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_zapier',
    name: 'Zapier',
    brandLogo: brandsLogos.zapierBrand,
    category: 'Misc Integrations',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_twillio',
    name: 'Twillio',
    brandLogo: brandsLogos.twillio,
    category: 'Misc Integrations',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_wordpress',
    name: 'Wordpress',
    brandLogo: brandsLogos.wordpress,
    category: 'Misc Integrations',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_woocommerce',
    name: 'WooCommerce',
    brandLogo: brandsLogos.wooCommerce,
    category: 'Misc Integrations',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_shopify',
    name: 'Shopify',
    brandLogo: brandsLogos.shopify,
    category: 'Misc Integrations',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_taxamo',
    name: 'Taxamo',
    brandLogo: brandsLogos.taxamo,
    category: 'Misc Integrations',
    active: false,
    connected: false,
    supported: false
  },
  {
    key: 'lc_webhook',
    name: 'Webhooks',
    brandLogo: brandsLogos.webhookLogo,
    category: 'Misc Integrations',
    active: true,
    connected: true,
    supported: true,
    customCard: {
      enabled: true,
      hasHover: false,
      actionLabel: 'Connect',
      action: 'link',
      linkPath: 'https://youtu.be/zNxy7AdvzTw'
    }
  },
  {
    key: 'lc_pabbly',
    name: 'Pabbly',
    brandLogo: brandsLogos.pabblyLogo,
    category: 'Misc Integrations',
    active: true,
    connected: true,
    supported: true,
    customCard: {
      enabled: true,
      hasHover: false,
      actionLabel: 'Connect',
      action: 'link',
      linkPath: 'https://youtu.be/3OAHebK_aPk'
    }
  },
  {
    key: 'lc_integrately',
    name: 'Integrately',
    brandLogo: brandsLogos.integratelyLogo,
    category: 'Misc Integrations',
    active: true,
    connected: true,
    supported: true,
    customCard: {
      enabled: true,
      hasHover: false,
      actionLabel: 'Connect',
      action: 'link',
      linkPath: 'https://youtu.be/0ctNixnlDg0'
    }
  },
  {
    key: 'lc_konnectzit',
    name: 'KonnectZit',
    brandLogo: brandsLogos.konnectzitLogo,
    category: 'Misc Integrations',
    active: true,
    connected: true,
    supported: true,
    customCard: {
      enabled: true,
      hasHover: false,
      actionLabel: 'Connect',
      action: 'link',
      linkPath: 'https://intercom.help/leadcart/en/articles/4352491-connect-leadcart-with-konnectzit'
    }
  },
  {
    key: 'lc_zapier',
    name: 'Zapier',
    brandLogo: brandsLogos.zapierBrand,
    category: 'Misc Integrations',
    description: 'Zapier moves info between your web apps automatically',
    active: true,
    connected: true,
    supported: true,
    customCard: {
      enabled: true,
      hasHover: false,
      actionLabel: 'Connect',
      action: 'link',
      linkPath: ZAPIER_INVITATION_LINK
    }
  }
];


export const servicesMap = mapListToObject(services, 'key');

export const getServiceBrand = (key) => {
  return servicesMap[key] ? servicesMap[key].brandLogo : undefined;
};

export default services.filter((service) => service.supported);
