import React from 'react';
import Appearance from './Appearance';
import ConversionBoosters from './ConversionBoosters';
import Fulfillment from './Fulfillment';
import BumpOffer from './BumpOffer';
import Coupons from './Coupons';
import Settings from './Settings';
import Pricing from './Pricing';


export default ({ activeMenu, ...props }) => {
  switch (activeMenu) {
  case 'appearance': return <Appearance {...props} />;
  case 'conversionsBoosters': return <ConversionBoosters {...props} />;
  case 'fulfillment': return <Fulfillment {...props} />;
  case 'bumpOffer': return <BumpOffer {...props} />;
  case 'coupon': return <Coupons {...props} />;
  case 'pricing': return <Pricing {...props} />;
  case 'settings': return <Settings {...props} />;

  default: return <Appearance {...props} />;
  }
};
