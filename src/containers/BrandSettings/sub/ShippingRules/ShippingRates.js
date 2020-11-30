import React, { useEffect, useState } from 'react';
import ids from 'shortid';
import clx from 'classnames';

import common from 'components/common';
import ShippingRatesRow from './Row';

const { FlexBox, Button } = common;
const getFixedFormat = (number) => Number(number).toFixed(2);

const Title = ({ className, children, color = '#83898e', style }) => <p style={{ color, ...style }} className={clx(`gray-text bold-text m-0 ${className}`)} >{children}</p>;

const getValidity = (shippingRates = [], currentIndex, currentToValue) => {
  let hasInvalidNextRate, hasInvalidPreviousRate;

  shippingRates.forEach((rate, index) => {
    const isLastRate = shippingRates.length === (index + 1)

    if (currentIndex < index && (!isLastRate && (Number(rate.to) <= Number(currentToValue)))) {
      hasInvalidNextRate = rate;
    }

    if (currentIndex > index && (!isLastRate &&  (Number(rate.to) >= Number(currentToValue))))
      hasInvalidPreviousRate = rate;
  })

  return {
    hasInvalidNextRate,
    hasInvalidPreviousRate
  }
}
const ShippingRates = ({ shippingRates = [], onChange, setHasInvalidRate, shippingRuleId }) => {
  const [invalidRate, setInvalidRate] = useState({});
  const [shippingTitlesWidth, setShippingTitlesWidth] = useState(200);

  const onShippingRateChange = ({ value, _id, currentIndex }) => {
    const { hasInvalidNextRate, hasInvalidPreviousRate } = getValidity(shippingRates, currentIndex, value)

    if (hasInvalidNextRate) {
      setInvalidRate({ _id, invalidPlace: 'bottom' });
      setHasInvalidRate(true);
    } else if (hasInvalidPreviousRate) {
      setHasInvalidRate(true);
      setInvalidRate({ _id, invalidPlace: 'top' });
    } else {
      setHasInvalidRate(false);
      setInvalidRate({});
    }

    const updatedList = [...shippingRates];
    updatedList.forEach((ele, index) => {
      if (ele._id === _id) {
        updatedList[index] = { ...ele, to: value };
        updatedList[index + 1] = { ...updatedList[index + 1], from: getFixedFormat(Number(value) + 0.01) };
      }
    });
    onChange({ target: { value: updatedList, name: 'rates' } });
  };


  const onShippingCostChange = ({ value, _id }) => {
    const updatedList = [...shippingRates];
    updatedList.forEach((ele, index) => {
      if (ele._id === _id)
        updatedList[index] = { ...ele, cost: value };
    });

    onChange({ target: { value: updatedList, name: 'rates' } });
  };


  const onAddRow = () => {
    const updatedList = [...shippingRates];
    const lastIndex = updatedList.length - 1;
    const lastRate = updatedList[lastIndex];

    updatedList[lastIndex] = { ...lastRate, to: getFixedFormat(Number(lastRate.from) + 0.01) };
    const newRate = { _id: ids.generate(), from: getFixedFormat(Number(lastRate.from) + 0.02), to: 0, cost: 0, rowNumber: lastIndex + 1 };

    onChange({ target: { value: [...updatedList, newRate], name: 'rates' } });
  };

  const onDeleteRow = () => {
    const updatedList = [...shippingRates];
    updatedList.pop();
    const lastIndex = updatedList.length - 1;
    const lastRate = updatedList[lastIndex];
    updatedList[lastIndex] = { ...lastRate, to: 0 };

    onChange({ target: { value: updatedList, name: 'rates' } });
  };


  const shippingRatesProps = {
    onShippingRateChange,
    onShippingCostChange,
    shippingRates,
    onDeleteRow,
    invalidRate
  };


  useEffect(() => {
    const firstShippingRole = document.querySelector('#shipping-role');
    if (firstShippingRole?.getBoundingClientRect()?.width)
      setShippingTitlesWidth(firstShippingRole?.getBoundingClientRect()?.width);
  });

  return (
    <FlexBox className='shipping-rates-container' id={`shipping-rates-${shippingRuleId}`} column flexStart>
      <Title className='my-3'>Shipping Rates</Title>

      <FlexBox className='mb-2' style={{ width: `${shippingTitlesWidth}px` }} spaceBetween >
        <Title className='text-center small-text flex'> SubTotal Range (From - To)</Title>
        <Title className='text-center small-text flex' />
        <Title className='text-center small-text flex'>Cost</Title>
      </FlexBox>

      <FlexBox className='shipping-rates-body' id='shipping-rates-body' column>
        {shippingRates.map((shippingRate, index) => (
          <ShippingRatesRow
            key={shippingRate._id}
            currentIndex={index}
            lastRateElement={shippingRates.length === (index + 1)}
            {...shippingRate}
            {...shippingRatesProps}
          />
        ))}
      </FlexBox>

      <Button className='primary-color mt-3 py-1 px-4 shipping-rates-add-row' onClick={onAddRow} >Add Row</Button>
    </FlexBox>
  );
};

export default ShippingRates;
