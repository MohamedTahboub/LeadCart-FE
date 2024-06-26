import React from 'react';
import './style.css';

import Text from './Text';
import Button from './Button';
import BumpOffer from './BumpOffer';
import TestimonialsSection from './TestimonialsSection';
import FeaturesSection from './FeaturesSection';
import GuaranteeWidget from './GuaranteeWidget';
import CountDowTimerWidget from './CountDowTimerWidget';
import ProgressBar from './ProgressBar';
import PageSettings from './PageSettings';
import StaticSection from './StaticSection';
import FigureSection from './FigureSection';
import FAQs from './FAQs';
import Image from './Image';
import Video from './Video';

export default ({ type, ...props }) => {
  switch (type) {
  case 'text': return <Text {...props} />;
  case 'heading': return <Text {...props} />;
  case 'button': return <Button {...props} />;
  case 'bumpOffer': return <BumpOffer {...props} />;
  case 'testimonialsSection': return <TestimonialsSection {...props} />;
  case 'featuresSection': return <FeaturesSection {...props} />;
  case 'guaranteeWidget': return <GuaranteeWidget {...props} />;
  case 'countDownWidget': return <CountDowTimerWidget {...props} />;
  case 'progressbarWidget': return <ProgressBar {...props} />;
  case 'checkoutSection': return <StaticSection {...props} />;
  case 'figure': return <FigureSection {...props} />;
  case 'pageSetting': return <PageSettings {...props} />;
  case 'faqs': return <FAQs {...props} />;
  case 'image': return <Image {...props} />;
  case 'video': return <Video {...props} />;
  default: return null;
  }
};
