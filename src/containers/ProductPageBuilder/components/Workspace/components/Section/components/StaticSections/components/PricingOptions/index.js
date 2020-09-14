import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { useContext } from '../../../../../../../../actions';

import { PricingOptionCard } from './components';
const {
  Button,
  Tabs,
  Tab,
  InputRow,
  FlexBox
} = common;


const PricingOptions = (props) => {

  const {
    state: { product: { pricingOptions = [] } = {} },
    actions
  } = useContext();


  const onSelectPriceOption = (id) => () => {
    actions.selectProductPriceOption(id);
  };

  if (!(Array.isArray(pricingOptions) && pricingOptions.length)) return null;
  return (
    <FlexBox column>
      <span className='title-text'>Choose a pricing option</span>
      <FlexBox wrappable>
        {
          pricingOptions.map((pricingOption) =>
            <PricingOptionCard key={pricingOption.id} {...pricingOption} onSelect={onSelectPriceOption} />)
        }
      </FlexBox>
    </FlexBox>
  );
};

PricingOptions.propTypes = {};

export default PricingOptions;
