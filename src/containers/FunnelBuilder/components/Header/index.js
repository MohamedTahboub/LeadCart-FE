import React from 'react';
import common from 'components/common';

import { FunnelHeader } from './components';

import './style.css';

const { FlexBox } = common;

const Header = (props) => (
  <FlexBox column>
    <FunnelHeader {...props} />
  </FlexBox>
);

Header.propTypes = {};

export default Header;
