import React, { Fragment } from 'react';
import clx from 'classnames';
import ReactTooltip from 'rc-tooltip';
import { BsArrowRight } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';


import common from 'components/common';

const { FlexBox, Title, InputRow, ErrorMessage } = common;
const { SmallInput } = InputRow;
const getFixedFormat = (number) => Number(number).toFixed(2);


const ShippingRatesRow = ({ from, to, cost, _id = '', onShippingRateChange, onShippingCostChange, type = '', shippingRates = [], currentIndex, invalidRate, onDeleteRow }) => {
  const isThelastElement = currentIndex === shippingRates.length - 1 && shippingRates.length > 1;
  const isFreeShipping = Number(cost) === 0;

  const hassError = invalidRate?._id === _id;
  const errorMessage = invalidRate?._id === _id ? `You have an invalid rate, please make sure that all of ${invalidRate?.invalidPlace === 'top' ? 'previous' : 'next'} rates values are ${invalidRate?.invalidPlace === 'top' ? 'smaller' : 'bigger'} than this value` : '';


  return (
    <Fragment>
      <FlexBox className='shipping-rates-row v-center'>
        {!isNaN(Number(from)) ?
          <SmallInput
            value={getFixedFormat(from)}
            type='number'
            className='shipping-rates-row-cell'
            disabled
          /> :
          <Title className='shipping-rates-row-cell'>{from}</Title>
        }

        <BsArrowRight className='shipping-rates-row-arrow-cell' opacity={type === 'header' ? 0 : 1} size={20} />

        {!isNaN(Number(to)) ?
          <SmallInput
            value={Number(to)}
            type='number'
            className={clx('shipping-rates-row-cell', { error: hassError })}
            min={from}
            onChange={({ target: { value } }) => onShippingRateChange({ value, _id, currentIndex })}
          />
          :
          <Title className='shipping-rates-row-cell'>{to}</Title>
        }

        {!isNaN(Number(cost)) ?
          <SmallInput
            value={cost}
            type='number'
            className='shipping-rates-row-cell'
            min={0}
            onChange={({ target: { value } }) => {onShippingCostChange({ value, _id });}}
          />
          :
          <Title className='shipping-rates-row-cell'>{cost}</Title>
        }

        {isThelastElement &&
         <ReactTooltip overlay='Delete Row'>
           <MdDelete className='mx-2 item-clickable' size={20} onClick={onDeleteRow} color='tomato' />
         </ReactTooltip>
        }
        {isFreeShipping && <Title>( Free )</Title>}
      </FlexBox>

      <ReactTooltip overlay={errorMessage}>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </ReactTooltip>
    </Fragment>
  );

};


export default ShippingRatesRow;
