import React from 'react';
import PropTypes from 'prop-types';
import {
  FunnelHeader
} from './components';

const Header = ({ category, ...props }) => {
  return <FunnelHeader {...props} />
};

Header.propTypes = {

};

export default Header;
