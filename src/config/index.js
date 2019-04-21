import config from 'react-global-configuration';

const env = process.env.ENVIRONMENT;
config.set({
  PORT: process.env.ENVIRONMENT === 'production' ? 3000 : 3001,
  env: process.env.ENVIRONMENT,
  API_LINK: env === 'dev' ? 'http://localhost:3000' : '',
  DEBUG_API_LINK: env === 'dev' ? 'http://localhost:5001' : '',
  SITE_DOMAIN: env === 'dev' ? 'http://localhost:3000' : '',
  S3_DIR: ''
});

export const paymentMethodsLinks = {
  dev: { // ca_C82XtIMbphaPO4JDiO1TJretDIMhEi3o
    stripe: 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_C82XtIMbphaPO4JDiO1TJretDIMhEi3o&scope=read_write',
  },
  production: {
    stripe: 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_C82X3QxgSvqB2WGT6tMgfEV7PCSehFW4&scope=read_write'
  }
}[env || 'dev'];
