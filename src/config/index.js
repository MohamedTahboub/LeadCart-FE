
import commonVars from './common';

const APP_ENV = process.env.REACT_APP_ENV || 'development';

const envsVars = {
  development: {
    ZAPIER_INVITATION_LINK: 'https://zapier.com/platform/public-invite/9563/25175f8086de29f4464aa004da95b81f/',
    STRIP_AUTH_LINK: 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_C82XtIMbphaPO4JDiO1TJretDIMhEi3o&scope=read_write',
    USER_SUB_DOMAIN_URL: 'https://subDomain.dev.leadcart.io/',
    mixPanelId: '6f1e8d2fe9734115de1fdcac460bd8ba',
    intercomAppId: 'hegmjd4b',
    logRocketId: 'olwrix/leadcart'
  },
  staging: {
    ZAPIER_INVITATION_LINK: 'https://zapier.com/platform/public-invite/9563/25175f8086de29f4464aa004da95b81f/',
    STRIP_AUTH_LINK: 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_C82XtIMbphaPO4JDiO1TJretDIMhEi3o&scope=read_write',
    USER_SUB_DOMAIN_URL: 'https://subDomain.dev.leadcart.io/',
    mixPanelId: '6f1e8d2fe9734115de1fdcac460bd8ba',
    intercomAppId: 'hegmjd4b',
    logRocketId: 'olwrix/leadcart'
  },
  production: {
    ZAPIER_INVITATION_LINK: 'https://zapier.com/platform/public-invite/9563/25175f8086de29f4464aa004da95b81f/',
    STRIP_AUTH_LINK: 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_C82X3QxgSvqB2WGT6tMgfEV7PCSehFW4&scope=read_write',
    USER_SUB_DOMAIN_URL: 'https://subDomain.leadcart.io/',
    mixPanelId: '9f4e14f1602b54645779337eb660525a',
    intercomAppId: 'oiankyy0',
    logRocketId: 'olwrix/leadcart'
  }
};

const activeEnvironment = {
  ...envsVars[APP_ENV],
  ...commonVars
};
export default activeEnvironment;
