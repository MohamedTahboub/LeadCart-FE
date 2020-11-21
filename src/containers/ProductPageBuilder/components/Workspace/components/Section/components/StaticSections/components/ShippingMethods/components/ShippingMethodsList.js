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
  onChange,
  selected,
  onSelect,
  currency,
  className
}) => {
  const classes = clx('shipping-methods-group', className);

  const _onSelect = ({ target: { value } }) => {
    onSelect(value);
  };

  const _onChange = ({ target: { name, value, id } }) => {
    onChange({
      id,
      name,
      value
    });
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
                <ResizableInput
                  onChange={_onChange}
                  name={'name'}
                  id={id}
                  value={name}
                  style={{ background: 'transparent' }}
                  defaultValue={'Shipping Method Label/Name'}
                />
              </span>
              <FlexBox className='method-cost' center='v-center h-center'>
                {getCurrencySymbol(currency)}
                {isFree ? '(' : ''}
                <ResizableInput
                  onChange={_onChange}
                  name={'cost'}
                  type='number'
                  id={id}
                  min={0}
                  value={cost}
                  style={{ background: 'transparent' }}
                  defaultValue={'Shipping Method Cost'}
                />
                {isFree ? '/Free)' : ''}
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
