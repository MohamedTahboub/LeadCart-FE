import React, { useState } from 'react';
import ids from 'shortid';
import clx from 'classnames';

import common from 'components/common';
import ShippingRatesRow from './Row';

const { FlexBox, Button } = common;
const getFixedFormat = (number) => Number(number).toFixed(2);

const Title = ({ className, children, color = '#83898e', style }) => <p style={{ color, ...style }} className={clx(`gray-text bold-text m-0 ${className}`)} >{children}</p>;


const ShippingRates = ({ shippingRates = [], onChange, setHasInvalidRate, shippingRuleId }) => {
  const [invalidRate, setInvalidRate] = useState({});
  const sortedShippingRates = shippingRates.sort(((first, second) => Number(first.rowNumber) - Number(second.rowNumber)));

  const onShippingRateChange = ({ value, _id, currentIndex }) => {
    const hasInvalidNextRate = shippingRates.find((ele, index) => index > currentIndex && Number(ele.to) <= Number(value));
    const hasInvalidPreviousRate = shippingRates.find((ele, index) => index < currentIndex && Number(ele.to) >= Number(value));

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

    const updatedList = [...sortedShippingRates];
    updatedList.forEach((ele, index) => {
      if (ele._id === _id) {
        updatedList[index] = { ...ele, to: value };
        updatedList[index + 1] = { ...updatedList[index + 1], from: getFixedFormat(Number(value) + 0.01) };
      }
    });
    onChange({ target: { value: updatedList, name: 'shippingRates' } });
  };


  const onShippingCostChange = ({ value, _id }) => {
    const updatedList = [...sortedShippingRates];
    updatedList.forEach((ele, index) => {
      if (ele._id === _id)
        updatedList[index] = { ...ele, cost: value };
    });

    onChange({ target: { value: updatedList, name: 'shippingRates' } });
  };


  const onAddRow = () => {
    const updatedList = [...sortedShippingRates];
    const lastIndex = updatedList.length - 1;
    const lastRate = updatedList[lastIndex];

    updatedList[lastIndex] = { ...lastRate, to: getFixedFormat(Number(lastRate.from) + 0.01) };
    const newRate = { _id: ids.generate(), from: getFixedFormat(Number(lastRate.from) + 0.02), to: 'and up', cost: 0, rowNumber: lastIndex + 1 };

    onChange({ target: { value: [...updatedList, newRate], name: 'shippingRates' } });
  };

  const onDeleteRow = () => {
    const updatedList = [...sortedShippingRates];
    updatedList.pop();
    const lastIndex = updatedList.length - 1;
    const lastRate = updatedList[lastIndex];
    updatedList[lastIndex] = { ...lastRate, to: 'and up' };

    onChange({ target: { value: updatedList, name: 'shippingRates' } });
  };


  const shippingRatesProps = {
    onShippingRateChange,
    onShippingCostChange,
    shippingRates,
    onDeleteRow,
    invalidRate
  };

  return (
    <FlexBox className='shipping-rates-container' id={`shipping-rates-${shippingRuleId}`} column flexStart>
      <Title className='my-3'>Shipping Rates</Title>

      <FlexBox className='mb-2'>
        <Title className='small-text pl-2' style={{ minWidth: '540px' }}> SubTotal Range (From - To) </Title>
        <Title className='small-text'>Cost</Title>
      </FlexBox>

      <FlexBox className='shipping-rates-body' id='shipping-rates-body' column>
        {sortedShippingRates.map((shippingRate, index) => (
          <ShippingRatesRow
            key={shippingRate._id}
            currentIndex={index}
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
