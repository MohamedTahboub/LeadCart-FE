import React from 'react';
import CheckoutSidebarButtons from './CheckoutSidebar';
import UpsellSidebarButtons from './UpsellSidebar';


export default ({ category, ...props }) => {
  switch (category) {
  case 'Checkout': return <CheckoutSidebarButtons {...props} />;
  case 'UpSell': return <UpsellSidebarButtons {...props} />;
  default: return <CheckoutSidebarButtons {...props} />;
  }
};
