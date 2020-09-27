import React from 'react';
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
  const classes = clx('min-width-250 m-2 p-3 product-pricing-card v-center', { active });

  return (
    <Flex flex className={classes} onClick={onSelect(id)}>
      <Flex className='v-center' flex>
        <Flex className='checkbox-container'>
          <input type='checkbox' checked={active} />
          <span className='checkmark' />
        </Flex>

        <Flex className='title-text bold-text'>
          {label}
        </Flex>
      </Flex>

      <Flex className='max-width-100 v-center small-text bold-text primary-text-color ml-2'>
        {formatPricingValue(priceDetails)}
      </Flex>
    </Flex >
  );
};

export default Card;
