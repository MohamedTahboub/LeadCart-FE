import React from 'react';
import './style.css';

import Text from './Text';
import Image from './Image';
import Video from './Video';
import Layout from './Layout';
import BumpOffer from './BumpOffer';
import ShippingAddress from './ShippingAddress';
import CouponSection from './CouponSection';
import TestimonialsSection from './TestimonialsSection';
import FeaturesSection from './FeaturesSection';
import GuaranteeWidget from './GuaranteeWidget';

export default ({ type, ...props }) => {
  switch (type) {
  case 'text': return <Text {...props} />;
  case 'image': return <Image {...props} />;
  case 'video': return <Video {...props} />;
  case 'layout': return <Layout {...props} />;
  case 'bumpOffer': return <BumpOffer {...props} />;
  case 'shippingDetails': return <ShippingAddress {...props} />;
  case 'couponSection': return <CouponSection {...props} />;
  case 'testimonialsSection': return <TestimonialsSection {...props} />;
  case 'featuresSection': return <FeaturesSection {...props} />;
  case 'guaranteeWidget': return <GuaranteeWidget {...props} />;
  default: return null;
  }
};
