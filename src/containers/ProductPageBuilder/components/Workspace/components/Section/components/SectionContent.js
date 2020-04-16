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
  HeadingText,
  Button,
  Spacer
} from '.';

const SectionContent = ({ type, ...props }) => {
  switch (type) {
  case 'heading': return <HeadingText {...props} />;
  case 'text': return <TextContent {...props} />;
  case 'button': return <Button {...props} />;
  case 'spacer': return <Spacer {...props} />;
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
  default: return null;
  }
};

SectionContent.propTypes = {

};

export default SectionContent;
