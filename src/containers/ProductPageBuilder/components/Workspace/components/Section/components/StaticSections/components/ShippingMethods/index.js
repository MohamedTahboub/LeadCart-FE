import React, { useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { useContext } from '../../../../../../../../actions';
import { connect } from 'react-redux'

import ids from 'shortid';
import { AddNewMethodBtn, ShippingMethodsList } from './components';
const { FlexBox, Tooltip } = common;

const defaultMethod = {
  name: 'Method Name',
  cost: 9
};

const calculateCost = (rates, price = 0) => {
  if (!Array.isArray(rates))
    return 0;
  const currentPrice = Number(price)
  const targetRate = rates.find((rate = {},index) =>{
    const isLastRate = index === (rates.length -1)
    return currentPrice >= rate.from && (isLastRate || currentPrice <= rate.to)
  }) || {}

  return targetRate.cost ? targetRate.cost : 0
};

const getReshapedShippingMethods = (shipping = [], price, limit = 5) => {
  const list = shipping
    .map(({ name, rates = [], description, _id: id }) => {
      return {
        name,
        id,
        description,
        cost: calculateCost(rates, price)
      }
    })
    .splice(0, limit)

    
  return list
};

const ShippingMethods = ({ shippingMethods, ...props }) => {
  console.log({shippingMethods})
  const { state: { product: { price: { amount: price = 0 } = {} } = {} } = {}, actions } = useContext();
  const shippingMethodsList = getReshapedShippingMethods(shippingMethods, price)
  const [selected, setSelectedMethod] = useState();

  const selectedMethod = shippingMethods.find(({ _id }) => _id === selected);

  const onSelect = (id) => {
    setSelectedMethod(id);
  };

  const selectedMethodName = selectedMethod?.name;
  const selectedMethodDescription = selectedMethod?.description;
  console.log({shippingMethodsList})
  return (
    <FlexBox flex column className='my-3'>
      {selectedMethodName && (
        <FlexBox flex center='h-center' className='my-2 bold-text'>
          Shipping to {selectedMethodName}
        </FlexBox>
      )}
      <ShippingMethodsList
        list={shippingMethodsList}
        selected={selected}
        onSelect={onSelect}
      />
      {selectedMethodDescription && (
        <FlexBox flex center='h-center' className='my-3'>
          {selectedMethodDescription}
        </FlexBox>
      )}
    </FlexBox>
  );
};

ShippingMethods.propTypes = {};

export default connect(({ shippingRules: shippingMethods = [] }) => ({ shippingMethods }))(ShippingMethods);
