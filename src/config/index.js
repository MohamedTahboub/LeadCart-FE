import config from 'react-global-configuration';

const env = process.env.NODE_ENV;

config.set({
  PORT: process.env.ENVIRONMENT === 'production' ? 3000 : 3001,
  env: process.env.ENVIRONMENT,
  API_LINK: env === 'dev' ? 'http://localhost:3000' : '',
  DEBUG_API_LINK: env === 'dev' ? 'http://localhost:5001' : '',
  SITE_DOMAIN: env === 'dev' ? 'http://localhost:3000' : '',
  S3_DIR: ''
});

export default {
  development: { // ca_C82XtIMbphaPO4JDiO1TJretDIMhEi3o
    ZAPIER_INVITATION_LINK: 'https://zapier.com/platform/public-invite/9563/25175f8086de29f4464aa004da95b81f/',
    STRIP_AUTH_LINK: 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_C82XtIMbphaPO4JDiO1TJretDIMhEi3o&scope=read_write',
    USER_SUB_DOMAIN_URL: 'http://localhost:3000/',
    packagesPlans: {
      pro: {
        price: {
          Monthly: 99,
          Yearly: 990
        },
        features: [
          '+6 Checkout Templates.',
          'Unlimited Products.',
          'Use Checkout Pages Everywhere.',
          'Built In Credit Card & PayPal processors.',
          'One-Time Payments, Subscriptions, Trials, & Payment Plans.',
          'Advanced Stats & Reports.',
          'Prospects (Cart Abandonment).',
          'Webhooks & Zapier.',
          '1-Click Upsells.',
          'Unlimited Funnels.',
          'Priority Support.'
        ]
      },
      premium: {
        price: {
          Monthly: 199,
          Yearly: 1990
        },
        features: [
          'Everything in Pro Plus:',
          'The Subscription Saver (Dunning).',
          'The Affiliate Center.',
          'Email Builder & Customizations.',
          'Dedicated Training & Support.'
        ]
      },
    },
    mixPanelId: '6f1e8d2fe9734115de1fdcac460bd8ba',
    intercomAppId: 'hegmjd4b'
  },
  staging: { // ca_C82XtIMbphaPO4JDiO1TJretDIMhEi3o
    ZAPIER_INVITATION_LINK: 'https://zapier.com/platform/public-invite/9563/25175f8086de29f4464aa004da95b81f/',
    STRIP_AUTH_LINK: 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_C82XtIMbphaPO4JDiO1TJretDIMhEi3o&scope=read_write',
    USER_SUB_DOMAIN_URL: 'https://subDomain.test.leadcart.io/',
    packagesPlans: {
      pro: {
        price: {
          Monthly: 99,
          Yearly: 990
        },
        features: [
          '+6 Checkout Templates.',
          'Unlimited Products.',
          'Use Checkout Pages Everywhere.',
          'Built In Credit Card & PayPal processors.',
          'One-Time Payments, Subscriptions, Trials, & Payment Plans.',
          'Advanced Stats & Reports.',
          'Prospects (Cart Abandonment).',
          'Webhooks & Zapier.',
          '1-Click Upsells.',
          'Unlimited Funnels.',
          'Priority Support.'
        ]
      },
      premium: {
        price: {
          Monthly: 199,
          Yearly: 1990
        },
        features: [
          'Everything in Pro Plus:',
          'The Subscription Saver (Dunning).',
          'The Affiliate Center.',
          'Email Builder & Customizations.',
          'Dedicated Training & Support.'
        ]
      },
    },
    mixPanelId: '6f1e8d2fe9734115de1fdcac460bd8ba',
    intercomAppId: 'hegmjd4b'
  },
  production: {
    ZAPIER_INVITATION_LINK: 'https://zapier.com/platform/public-invite/9563/25175f8086de29f4464aa004da95b81f/',
    STRIP_AUTH_LINK: 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_C82X3QxgSvqB2WGT6tMgfEV7PCSehFW4&scope=read_write',
    USER_SUB_DOMAIN_URL: 'https://subDomain.leadcart.io/',
    packagesPlans: {
      pro: {
        price: {
          Monthly: 99,
          Yearly: 990
        },
        features: [
          '+6 Checkout Templates.',
          'Unlimited Products.',
          'Use Checkout Pages Everywhere.',
          'Built In Credit Card & PayPal processors.',
          'One-Time Payments, Subscriptions, Trials, & Payment Plans.',
          'Advanced Stats & Reports.',
          'Prospects (Cart Abandonment).',
          'Webhooks & Zapier.',
          '1-Click Upsells.',
          'Unlimited Funnels.',
          'Priority Support.'
        ]
      },
      premium: {
        price: {
          Monthly: 199,
          Yearly: 1990
        },
        features: [
          'Everything in Pro Plus:',
          'The Subscription Saver (Dunning).',
          'The Affiliate Center.',
          'Email Builder & Customizations.',
          'Dedicated Training & Support.'
        ]
      },
    },
    mixPanelId: '9f4e14f1602b54645779337eb660525a',
    intercomAppId: 'oiankyy0'
  }
}[process.env.REACT_APP_ENV || 'development'];

