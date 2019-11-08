import React from 'react';
import CheckoutSidebarButtons from './CheckoutSidebar';
import UpsellSidebarButtons from './UpsellSidebar';


export default ({ category, ...props }) => {
  switch (category) {
  case 'checkout': return <CheckoutSidebarButtons {...props} />;
  case 'upsell': return <UpsellSidebarButtons {...props} />;
  default: return <CheckoutSidebarButtons {...props} />;
  }
};
