import React from 'react';
import common from 'components/common';
import { connect } from 'react-redux';
import { useContext } from '../../../../../../../../actions';
import { PricingOptionCard } from './components';
const { FlexBox } = common;


const PricingOptions = ({ defaultBrandCurrency }) => {

  const {
    state: {
      funnel: { currency = defaultBrandCurrency } = {},
      product: { pricingOptions = [] } = {}
    },
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
          pricingOptions.map((pricingOption) => (
            <PricingOptionCard
              key={pricingOption.id}
              {...pricingOption}
              onSelect={onSelectPriceOption}
              currency={currency}
            />
          ))
        }
      </FlexBox>
    </FlexBox>
  );
};

PricingOptions.propTypes = {};

const mapStateToProps = ({ settings: { generalModel: { currency: defaultBrandCurrency = 'USD' } = {} } = {} }) => ({ defaultBrandCurrency });
export default connect(mapStateToProps)(PricingOptions);
