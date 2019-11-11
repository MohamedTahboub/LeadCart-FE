import React from 'react';
import CheckoutProducts from './CheckoutProducts';
import UpsellsProducts from './UpsellsProducts';
import Settings from './Settings';


export default ({ activeMenu, ...props }) => {
  switch (activeMenu) {
  case 'checkouts': return <CheckoutProducts {...props} />;
  case 'upsells': return <UpsellsProducts {...props} />;
  case 'settings': return <Settings {...props} />;

  default: return null;
  }
};
