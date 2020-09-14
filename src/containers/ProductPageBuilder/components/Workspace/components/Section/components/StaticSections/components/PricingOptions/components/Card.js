import React from 'react';
// import PropTypes from 'prop-types';
import clx from 'classnames';
import common from 'components/common';
import { formatPricingValue } from 'libs';
const { FlexBox: Flex } = common;

const Card = ({
  onSelect,
  id,
  label = 'Price Label',
  active = 0,
  ...priceDetails
}) => {


  const classes = clx('min-width-250 m-2 p-2 pl-3 product-pricing-card', { active });
  return (
    <Flex flex className={classes} onClick={onSelect(id)}>
      <Flex column>
        <span className='title-text bold-text'>{label}</span>
        <span className='bold-text'>{formatPricingValue(priceDetails)}</span>
      </Flex>
    </Flex>
  );
};


Card.propTypes = {};

export default Card;
