import React from 'react';
import PropTypes from 'prop-types';
import {
  DefaultHeader,
  UpsellHeader,
  CheckoutHeader

} from './components';

const Header = ({ type="upsell", ...props }) => {
  switch (type) {
  case 'checkout': return <CheckoutHeader {...props} />;
  case 'upsell': return <UpsellHeader {...props} />;
    // case 'funnel': return <DefaultHeader {...props} />

  default: return <DefaultHeader {...props} />;
  }
};

Header.propTypes = {

};

export default Header;
