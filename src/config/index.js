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
    prices: {
      pro: {
        monthly: 99,
        yearly: 990
      },
      premium: {
        monthly: 199,
        yearly: 1990
      },
    }
  },
  staging: { // ca_C82XtIMbphaPO4JDiO1TJretDIMhEi3o
    ZAPIER_INVITATION_LINK: 'https://zapier.com/platform/public-invite/9563/25175f8086de29f4464aa004da95b81f/',
    STRIP_AUTH_LINK: 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_C82XtIMbphaPO4JDiO1TJretDIMhEi3o&scope=read_write',
    USER_SUB_DOMAIN_URL: 'https://subDomain.test.leadcart.io/'
  },
  production: {
    ZAPIER_INVITATION_LINK: 'https://zapier.com/platform/public-invite/9563/25175f8086de29f4464aa004da95b81f/',
    STRIP_AUTH_LINK: 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_C82X3QxgSvqB2WGT6tMgfEV7PCSehFW4&scope=read_write',
    USER_SUB_DOMAIN_URL: 'https://subDomain.leadcart.io/'
  }
}[process.env.NODE_ENV || 'development'];

