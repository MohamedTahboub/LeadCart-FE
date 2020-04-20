import React from 'react';
import './style.css';

import Text from './Text';
// import Image from './Image';
import Video from './Video';
import Button from './Button';
import BumpOffer from './BumpOffer';
import ShippingAddress from './ShippingAddress';
import CouponSection from './CouponSection';
import TestimonialsSection from './TestimonialsSection';
import FeaturesSection from './FeaturesSection';
import GuaranteeWidget from './GuaranteeWidget';
import CountDowTimerWidget from './CountDowTimerWidget';
import ProgressBar from './ProgressBar';
import ProductBadgeWidget from './ProductBadgeWidget';
import PageSettings from './PageSettings';
import StaticSection from './StaticSection';

export default ({ type, ...props }) => {
  switch (type) {
  case 'text': return <Text {...props} />;
  // case 'image': return <Image {...props} />;
  case 'video': return <Video {...props} />;
  case 'button': return <Button {...props} />;
  case 'bumpOffer': return <BumpOffer {...props} />;
  case 'shippingDetails': return <ShippingAddress {...props} />;
  case 'couponSection': return <CouponSection {...props} />;
  case 'testimonialsSection': return <TestimonialsSection {...props} />;
  case 'featuresSection': return <FeaturesSection {...props} />;
  case 'guaranteeWidget': return <GuaranteeWidget {...props} />;
  case 'countDownWidget': return <CountDowTimerWidget {...props} />;
  case 'progressbarWidget': return <ProgressBar {...props} />;
  case 'productMarkWidget': return <ProductBadgeWidget {...props} />;
  case 'staticSectionSetting': return <StaticSection {...props} />;
  case 'pageSetting': return <PageSettings {...props} />;
  default: return null;
  }
};
