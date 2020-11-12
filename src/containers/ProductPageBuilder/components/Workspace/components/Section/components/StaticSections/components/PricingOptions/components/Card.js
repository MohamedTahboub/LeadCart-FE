import React from 'react';
import clx from 'classnames';

import common from 'components/common';
import { formatPricingValue } from 'libs';

const { FlexBox: Flex, LayoutSwitch, InputRow } = common;
const { Radio } = InputRow;
const { Group } = Radio;

const DefaultTheme = ({
  onClick,
  className,
  active,
  value,
  label
}) => {

  return (
    <Flex flex className={className} onClick={onClick}>
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
        {formatPricingValue(value)}
      </Flex>
    </Flex >
  );
};

// const Radio = ({ children, active = true, ...props }) => {
//   return (
//     <div {...props} className={clx('standalone-radio-input', { active })} >
//       {children}
//     </div>
//   );
// };


const RadioTheme = ({
  onClick,
  className,
  active,
  value,
  label
}) => {

  return (
    <Flex column flex className={clx(className)} onClick={onClick}>
      <Group disabled>
        <Radio className='custom-pricing-radio'>
          <Flex column flex>
            <Flex className='title-text bold-text truncate'>
              {label}
            </Flex>
            <Flex className='max-width-100 v-center small-text bold-text primary-text-color ml-2'>
              {formatPricingValue(value)}
            </Flex>
          </Flex >
        </Radio>
      </Group >
    </Flex >
  );
};

const Card = ({
  onSelect,
  label = 'Price Label',
  active = 0,
  theme,
  ...priceDetails
}) => {
  const classes = clx('min-width-250 product-pricing-card', { active, [`theme-${theme}`]: theme });

  const commonProps = {
    className: theme === 'default' ? clx(classes, 'm-2 p-3 v-center') : classes,
    active,
    value: priceDetails,
    label,
    onClick: onSelect
  };

  return (
    <LayoutSwitch active={theme} fallback={<DefaultTheme id='default' {...commonProps} />}>
      <DefaultTheme id='default' {...commonProps} />
      <RadioTheme id='radio' {...commonProps} />
    </LayoutSwitch>
  );
};

Card.defaultProps = { theme: 'default' };

export default Card;
