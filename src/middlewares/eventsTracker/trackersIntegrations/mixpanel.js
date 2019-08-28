import config from 'config';

const { mixPanelId } = config;


export const onAppLaunch = (eventData) => {
  if (window.mixpanel) window.mixpanel.init(mixPanelId);
};

export const onSignup = ({ token, ...eventData }) => {
  if (window.mixpanel) {
    window.mixpanel.register(eventData);
    window.mixpanel.track('SignUp', eventData);
  }
};


export const onUpdateBrandSettings = (eventData) => {
  if (window.mixpanel) window.mixpanel.track('Brand Settings Change', eventData);
};

export const onConnectPaymentGateway = (eventData) => {
  if (window.mixpanel) window.mixpanel.track('Connect Payment Gateway', eventData);
};

export const onCreateProduct = (eventData) => {
  if (window.mixpanel) window.mixpanel.track('Created A Product', eventData);

  // fire on first Product creation
  // fire on 3  Products creation
};

export const onGetProducts = ({ products = [] }) => {
  if (window.mixpanel) {
    if (products.length === 1) window.mixpanel.track('First Product', products[0]);
    if (products.length === 3) window.mixpanel.track('First 3 Product', products);
  }
};

export const onOrders = ({ orders = [] }) => {
  if (window.mixpanel) {
    if (orders.length === 1) window.mixpanel.track('First Order', orders[0]);
    if (orders.length === 3) window.mixpanel.track('First 3 Orders', orders);
  }
};

export const onLogin = ({ token, ...eventData }) => {
  if (window.mixpanel) window.mixpanel.track('Loged In', eventData);
};
export const onLogout = (eventData) => {
  if (window.mixpanel) window.mixpanel.anonymous();
};

export const onUserUpgrade = (eventData) => {
  if (window.mixpanel) window.mixpanel.track('User Package Upgrade', eventData);
};
