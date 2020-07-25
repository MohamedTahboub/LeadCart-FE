/* eslint-disable indent */
import React from 'react';

import {
  BumpOffer,
  Button,
  CodeSection,
  CountDownTimer,
  CouponSection,
  FeaturesListSection,
  FigureSection,
  GuaranteeSection,
  HeadingText,
  ImageContent,
  LayoutContent,
  ProgressBar,
  ShippingDetails,
  Spacer,
  StaticSections,
  TestimonialsSection,
  TextContent,
  VideoContent
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
    case 'figure': return <FigureSection {...props} />;
    case 'code': return <CodeSection {...props} />;
    case 'guaranteeWidget': return <GuaranteeSection {...props} />;
    case 'countDownWidget': return <CountDownTimer {...props} />;
    case 'progressbarWidget': return <ProgressBar {...props} />;
    case 'staticSections': return <StaticSections {...props} />;
    default: return null;
  }
};

SectionContent.propTypes = {};

export default SectionContent;
