import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import clx from 'classnames';
import { getCurrencySymbol } from 'libs';

const { FlexBox, InputRow, ResizableInput } = common;
const { Radio } = InputRow;
const { Group } = Radio;


const ShippingMethodRow = ({
  list,
  selected,
  onSelect,
  currency,
  className
}) => {
  const classes = clx('shipping-methods-group', className);

  const _onSelect = ({ target: { value } }) => {
    onSelect(value);
  };

  return (
    <Group onChange={_onSelect} value={selected} className={classes}>
      {list.map(({ id, cost, name, ...props }) => {

        const isFree = `${cost}` === '0';

        return (
          <Radio
            key={id}
            value={id}
            className='shipping-method-option'
            {...props}
          >
            <FlexBox flex spaceBetween>
              <span className='method-name'>
                {name}
              </span>
              <FlexBox className='method-cost' center='v-center h-center'>
                {getCurrencySymbol(currency)}
                {isFree ? `${cost}/Free` : cost}
              </FlexBox>
            </FlexBox>
          </Radio>
        );
      })}
    </Group>
  );
};

ShippingMethodRow.propTypes = {};

export default ShippingMethodRow;
