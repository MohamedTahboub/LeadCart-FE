import React from 'react';

import common from 'components/common';
import clx from 'classnames';
import { useContext } from '../../../../../../../../actions';

import './style.css';

const { ResizableInput, FlexBox } = common;

const CompleteOrderBtn = ({
  className,
  text,
  onChange,
  name = 'custom.orderButtonText'
}) => {
  const { state: { product: { sections } = {} } = {} } = useContext();
  const section = sections.find(({ type }) => type === 'checkoutSection') || {};
  const completeOrderButtonStyle = section?.styles?.completeOrderButton || {};


  const {
    position = 'justified',
    background = '#4da1ff',
    textColor = '#fff',
    borderStyle = 'hidden',
    borderColor = '#4da1ff',
    shadowColor = '#fff',
    hasShadow,
    boxShadowOffsetX,
    boxShadowOffsetY,
    boxShadowBlur,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderWidth = '2px'
  } = completeOrderButtonStyle;


  const buttonContainerClasses = clx(
    `justify-${position === 'left' ? 'start' : position === 'right' ? 'end' : 'center'}`,
    { justified: position === 'justified' }
  );

  const buttonClasses = clx(className, 'template-complete-order', { justified: position === 'justified' });

  const buttonStyle = {
    background,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderStyle,
    borderColor,
    borderWidth,
    boxShadow: hasShadow ? `${boxShadowOffsetX || 0}px ${boxShadowOffsetY || 0}px ${boxShadowBlur || 0}px ${shadowColor || '#FFF'}` : ''
  };

  const buttonTextStyle = { color: textColor, fontWeight: 'bold' };


  return (
    <FlexBox className={buttonContainerClasses}>
      <div style={buttonStyle} className={buttonClasses}>
        <ResizableInput
          onChange={onChange}
          name={name}
          defaultValue='Complete Order'
          value={text}
          style={buttonTextStyle}
        />
      </div>
    </FlexBox>
  );
};

export default CompleteOrderBtn;
