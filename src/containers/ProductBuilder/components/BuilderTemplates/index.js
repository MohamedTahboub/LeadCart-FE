import React from 'react';
import PropTypes from 'prop-types';
import CheckoutTemplate from './CheckoutTemplates'
import UpsellTemplate from './UpsellTemplates'

export default ({ type="upsell", ...props }) => {
  switch (type) {
  case 'checkout': return <CheckoutTemplate {...props} />;
  case 'upsell': return <UpsellTemplate {...props} />;

  default: return <CheckoutTemplate {...props} />;
  }
};
