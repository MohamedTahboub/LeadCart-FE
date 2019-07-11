import React from 'react';
import Appearance from './Appearance';
import ConversionBoosters from './ConversionBoosters';
import Fulfillment from './Fulfillment';
import BumpOffer from './BumpOffer';
import Coupons from './Coupons';


export default ({ activeMenu, ...props }) => {
  console.log('activeMenu==>',activeMenu)
  switch (activeMenu) {
  case 'appearance': return <Appearance {...props} />;
  case 'conversionsBoosters': return <ConversionBoosters {...props} />;
  case 'fulfillment': return <Fulfillment {...props} />;
  case 'bumpOffer': return <BumpOffer {...props} />;
  case 'coupon': return <Coupons {...props} />;

  default: return <Appearance {...props} />;
  }
};
