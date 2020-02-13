import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import {
  reducers,
  connectActions,
  productActions,
  store as ProductContext
} from './actions';


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

const ProductBuilder = (props) => {
  const [state, dispatch] = useReducer(reducers, { fetchingProduct: true, product: {} });


  const actions = connectActions(productActions, { state, dispatch });
  return (
    <ProductContext value={{ state, actions }}>
      <Page fullSize className='flex-container flex-column'>
        <Header />
        <FlexBox id='blocks' flex className='relative-element'>
          <SideBar />
          <Workspace />
          <ComponentSettingSideBar />
        </FlexBox>
      </Page>
    </ProductContext>
  );
};

ProductBuilder.propTypes = {

};

export default ProductBuilder;
