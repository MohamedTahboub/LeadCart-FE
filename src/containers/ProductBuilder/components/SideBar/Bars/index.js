import React from 'react';
import CheckoutSidebarButtons from './CheckoutSidebar';
import UpsellSidebarButtons from './UpsellSidebar';


export default ({ type, ...props }) => {
  switch (type) {
  case 'checkout': return <CheckoutSidebarButtons {...props} />;
  case 'upsell': return <UpsellSidebarButtons {...props} />;
  default: return <CheckoutSidebarButtons {...props} />;
  }
};
