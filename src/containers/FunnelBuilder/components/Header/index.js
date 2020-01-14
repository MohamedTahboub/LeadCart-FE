import React from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common'

import {
  MainHeader,
  FunnelHeader
} from './components';

const {
  FlexBox
} = common

const Header = (props) => (
  <FlexBox column>
    <MainHeader {...props} />
    <FunnelHeader {...props} />
  </FlexBox>
);

Header.propTypes = {

};

export default Header;
