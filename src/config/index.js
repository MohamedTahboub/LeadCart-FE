
import commonVars from './common';

const APP_ENV = process.env.REACT_APP_ENV || 'development';

const envsVars = {
  development: {
    ZAPIER_INVITATION_LINK: 'https://zapier.com/developer/public-invite/110760/c6fb681572753e1aad9488f28a22a64c/',
    STRIP_AUTH_LINK: 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_C82XtIMbphaPO4JDiO1TJretDIMhEi3o&scope=read_write',
    USER_SUB_DOMAIN_URL: 'https://subDomain.dev.leadcart.io/',
    mixPanelId: '6f1e8d2fe9734115de1fdcac460bd8ba',
    intercomAppId: 'hegmjd4b',
    logRocketId: 'olwrix/leadcart',
    LEADCART_AFFILIATE_CENTER_URL: 'https://lc-affiliates.netlify.app',
    AFFILIATE_ENCODING_KEY: 'strong-key!'
  },
  staging: {
    ZAPIER_INVITATION_LINK: 'https://zapier.com/developer/public-invite/110760/c6fb681572753e1aad9488f28a22a64c/',
    STRIP_AUTH_LINK: 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_C82XtIMbphaPO4JDiO1TJretDIMhEi3o&scope=read_write',
    USER_SUB_DOMAIN_URL: 'https://subDomain.staging.leadcart.io/',
    mixPanelId: '6f1e8d2fe9734115de1fdcac460bd8ba',
    intercomAppId: 'hegmjd4b',
    logRocketId: 'olwrix/leadcart',
    LEADCART_AFFILIATE_CENTER_URL: 'https://lc-affiliates.netlify.app',
    AFFILIATE_ENCODING_KEY: 'strong-key!'
  },
  production: {
    ZAPIER_INVITATION_LINK: 'https://zapier.com/developer/public-invite/110760/c6fb681572753e1aad9488f28a22a64c/',
    STRIP_AUTH_LINK: 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_C82X3QxgSvqB2WGT6tMgfEV7PCSehFW4&scope=read_write',
    USER_SUB_DOMAIN_URL: 'https://subDomain.leadcart.io/',
    mixPanelId: '9f4e14f1602b54645779337eb660525a',
    intercomAppId: 'tkvaxlsr',
    logRocketId: '7mxnqn/leadcart',
    LEADCART_AFFILIATE_CENTER_URL: 'https://affiliates.leadcart.io',
    AFFILIATE_ENCODING_KEY: 'the-strongest-key-ever!!'
  }
};

const activeEnvironment = {
  ...commonVars,
  ...envsVars[APP_ENV]
};
export default activeEnvironment;
