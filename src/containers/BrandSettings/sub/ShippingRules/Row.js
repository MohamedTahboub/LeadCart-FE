import React, { Fragment } from 'react';
import clx from 'classnames';
import ReactTooltip from 'rc-tooltip';
import { BsArrowRight } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { connect } from 'react-redux';

import { getCurrencySymbol } from 'libs/currencies';
import common from 'components/common';

const { FlexBox } = common;
const getFixedFormat = (number) => Number(number).toFixed(2);


const Title = ({ className, children, color = '#83898e', style }) => <p style={{ color, ...style }} className={clx(`gray-text bold-text m-0 ${className}`)} >{children}</p>;


const RateInput = ({ value, className, disabled, min = 0, onChange, currency = '$' }) => {
  return (
    <FlexBox className={clx(`shipping-rate-input ${className}`, { disabled })}>
      <span className='shipping-rate-input-prefix'>{currency}</span>

      <input
        type='number'
        value={value}
        className='shipping-rate-input-field'
        disabled={disabled}
        min={min}
        onChange={onChange}
      />
    </FlexBox>
  );
};


const ShippingRatesRow = ({ from, to, cost, _id = '', onShippingRateChange, onShippingCostChange, shippingRates = [], currentIndex, invalidRate, onDeleteRow, defaultBrandCurrency }) => {
  const isTheLastElement = currentIndex === shippingRates.length - 1 && shippingRates.length > 1;
  const isFreeShipping = Number(cost) === 0;

  const hassError = invalidRate?._id === _id;
  const errorMessage = invalidRate?._id === _id ?
  `You have an invalid rate, please make sure that all of 
  ${invalidRate?.invalidPlace === 'top' ? 'previous' : 'next'}
   rates values are 
   ${invalidRate?.invalidPlace === 'top' ? 'smaller' : 'bigger'}
    than this value`
    : '';


  const currency = getCurrencySymbol(defaultBrandCurrency);

  return (
    <Fragment>
      <FlexBox className='shipping-rates-row v-center' id='shipping-role' >
        <RateInput value={getFixedFormat(from)} currency={currency} disabled />
        <BsArrowRight className='shipping-rates-arrow' size={20} />

        {!isNaN(Number(to)) ?
          <RateInput
            value={Number(to)}
            min={from}
            className={clx({ error: hassError })}
            onChange={({ target: { value } }) => onShippingRateChange({ value, _id, currentIndex })}
            currency={currency}
          />
          :
          <Title className='shipping-rates-and-up min-width-200'>{to}</Title>
        }


        <RateInput
          value={cost}
          onChange={({ target: { value } }) => {onShippingCostChange({ value, _id });}}
          className='ml-4'
          currency={currency}
        />

        {isTheLastElement &&
         <ReactTooltip overlay='Delete Row'>
           <MdDelete className='ml-2 item-clickable delete-shipping-role' size={20} onClick={onDeleteRow} color='tomato' />
         </ReactTooltip>
        }
        {isFreeShipping && <Title className='ml-2 small-text free-shipping-role'>(Free)</Title>}
      </FlexBox>

      {errorMessage && <p style={{ color: 'tomato' }} className='error-text'>{errorMessage}</p>}
    </Fragment>
  );

};

const mapStateToProps = ({ settings: { generalModel: { currency: defaultBrandCurrency = 'USD' } = {} } = {} }) => ({ defaultBrandCurrency });

export default connect(mapStateToProps)(ShippingRatesRow);
