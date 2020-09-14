import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
import common from 'components/common';

const {
  Button,
  Tabs,
  Tab,
  InputRow,
  Checkbox,
  FlexBox: Flex
} = common;


const formatPrice = () => {
  return '$39.5';
};

const Card = ({
  onSelect,
  id,
  label = 'Price Label',
  active = 0
  // splits,
  // recurringPeriod,
  // amount
}) => {


  const classes = clx('min-width-250 m-2 p-2 pl-3 product-pricing-card', { active });
  return (
    <Flex flex center='v' className={classes} onClick={onSelect(id)}>
      <Flex column>
        <span className='title-text'>{label}</span>
        <span>{formatPrice()}</span>
      </Flex>
    </Flex>
  );
};


Card.propTypes = {};

export default Card;
