import React from 'react';
import PropTypes from 'prop-types';
import CheckoutTemplate from './CheckoutTemplates'
import UpsellTemplate from './UpsellTemplates'

export default ({ category, ...props }) => {
  switch (category) {
  case 'Checkout': return <CheckoutTemplate {...props} />;
  case 'UpSell': return <UpsellTemplate {...props} />;

  default: return <CheckoutTemplate {...props} />;
  }
};
