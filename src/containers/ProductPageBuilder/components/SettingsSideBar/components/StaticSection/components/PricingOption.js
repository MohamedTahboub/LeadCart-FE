import React from 'react';
import common from 'components/common';
import clx from 'classnames';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { formatPricingValue } from 'libs';
const { FlexBox: Flex } = common;


const PricingOption = ({
  onDelete,
  onEdit,
  label = 'Price Option Label',
  ...priceDetails
}) => {

  const classes = clx('min-width-250 my-2 p-2 pl-3 product-pricing-option parent-hover');

  return (
    <Flex flex center='v-center' className={classes} spaceBetween>
      <Flex column>
        <span className='title-text'>{label}</span>
        <span>{formatPricingValue(priceDetails)}</span>
      </Flex>
      <Flex column >
        <FiEdit2
          size={18}
          className='item-clickable show-on-parent-hover mb-3'
          onClick={onEdit}
        />
        <AiOutlineDelete
          size={18}
          className='item-clickable danger-color show-on-parent-hover'
          onClick={onDelete}
        />
      </Flex>
    </Flex>
  );
};

PricingOption.propTypes = {};

export default PricingOption;
