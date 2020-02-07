import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

import {
  Header,
  SideBar,
  Workspace,
  ComponentSettingSideBar
} from './components';

const {
  Page,
  FlexBox
} = common;

const ProductBuilder = (props) => (
  <Page fullSize className='flex-container flex-column'>
    <Header />
    <FlexBox id='blocks' flex className='relative-element'>
      <SideBar />
      <Workspace />
      <ComponentSettingSideBar />
    </FlexBox>
  </Page>
);

ProductBuilder.propTypes = {

};

export default ProductBuilder;
