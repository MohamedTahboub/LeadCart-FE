import React from 'react';
import PropTypes from 'prop-types';

import {
  TextContent,
  ImageContent,
  VideoContent,
  LayoutContent,
  BumpOffer,
  ShippingDetails,
  CouponSection,
  TestimonialsSection,
  FeaturesListSection,
  GuaranteeSection,
  CountDownTimer,
  ProgressBar,
  ProductMarkWidget
} from '.';

const SectionContent = ({ type, ...props }) => {
  console.log(type);
  switch (type) {
  case 'text': return <TextContent {...props} />;
  case 'image': return <ImageContent {...props} />;
  case 'video': return <VideoContent {...props} />;
  case 'layout': return <LayoutContent {...props} />;
  case 'bumpOffer': return <BumpOffer {...props} />;
  case 'shippingDetails': return <ShippingDetails {...props} />;
  case 'couponSection': return <CouponSection {...props} />;
  case 'testimonialsSection': return <TestimonialsSection {...props} />;
  case 'featuresSection': return <FeaturesListSection {...props} />;
  case 'guaranteeWidget': return <GuaranteeSection {...props} />;
  case 'countDownWidget': return <CountDownTimer {...props} />;
  case 'progressbarWidget': return <ProgressBar {...props} />;
  case 'productMarkWidget': return <ProductMarkWidget {...props} />;
  default: return null;
  }
};

SectionContent.propTypes = {

};

export default SectionContent;
