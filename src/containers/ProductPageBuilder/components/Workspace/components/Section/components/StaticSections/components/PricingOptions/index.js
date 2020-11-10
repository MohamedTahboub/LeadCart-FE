import React from 'react';
import common from 'components/common';
import { connect } from 'react-redux';
import { useContext } from '../../../../../../../../actions';
import { PricingOptionCard } from './components';
import Title from '../FuturisticForm/components/Title';

const { FlexBox } = common;


const PricingOptions = ({ title = 'Choose a pricing option', format, defaultBrandCurrency, theme }) => {

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
      <Title className='my-2'>{title}</Title>
      <FlexBox wrappable>
        {
          pricingOptions.map((pricingOption) => (
            <PricingOptionCard
              key={pricingOption.id}
              {...pricingOption}
              format={format}
              onSelect={onSelectPriceOption}
              currency={currency}
              theme={theme}
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
