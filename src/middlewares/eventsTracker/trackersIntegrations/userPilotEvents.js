

export const onSignup = (eventData) => {
  if (window.userpilot) {
    window.userpilot.identify(
      eventData.id, // Used to identify users
      eventData
    );
    window.userpilot.track('SignUp', eventData);
  }
};


export const onUpdateBrandSettings = (eventData) => {
  if (window.userpilot) window.userpilot.track('Brand Settings Change', eventData);
};

export const onConnectPaymentGateway = (eventData) => {
  if (window.userpilot) window.userpilot.track('Connect Payment Gateway', eventData);
};

export const onCreateProduct = (eventData) => {
  if (window.userpilot) window.userpilot.track('Created A Product', eventData);

  // fire on first Product creation
  // fire on 3  Products creation
};

export const onOrders = (eventData) => {
  if (window.userpilot) window.userpilot.track('Orders Made', eventData);
};

export const onLogin = ({ token, ...eventData }) => {
  if (window.userpilot) {
    window.userpilot.identify(
      eventData.id, // Used to identify users
      eventData
    );
    window.userpilot.track('Loged In', eventData);
  }
};
export const onLogout = (eventData) => {
  if (window.userpilot) window.userpilot.anonymous();
};

export const onUserUpgrade = (eventData) => {
  if (window.userpilot) window.userpilot.track('User Package Upgrade', eventData);
};
