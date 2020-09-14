import React from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common';
import clx from 'classnames';
import { AiOutlineDelete } from 'react-icons/ai';

const {
  // Button,
  // Tabs,
  // Tab,
  // InputRow,
  // Checkbox,
  FlexBox: Flex
} = common;

const formatPricingValue = ({ amount, type, splits, recurringPeriod }) => {
  if (type === 'Subscription') return `$${amount} each ${recurringPeriod}`;
  if (type === 'Split') return `$${amount} X ${splits}`;
  return `$ ${amount}`;
};

const PricingOption = ({
  onDelete,
  label = 'Price Label',
  ...priceDetails
}) => {

  const classes = clx('min-width-250 my-2 p-2 pl-3 product-pricing-option parent-hover');

  return (
    <Flex flex center='v-center' className={classes} spaceBetween>
      <Flex column>
        <span className='title-text'>{label}</span>
        <span>{formatPricingValue(priceDetails)}</span>
      </Flex>
      <AiOutlineDelete
        className='item-clickable larger-text danger-color show-on-parent-hover'
        onClick={onDelete}
      />
    </Flex>
  );
};

PricingOption.propTypes = {};

export default PricingOption;
