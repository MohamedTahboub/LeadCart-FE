import React from 'react';
import common from 'components/common';
import clx from 'classnames';

const { ResizableInput } = common;

const OrderButton = ({
  themeColor = '#2d3d68',
  onChange,
  name,
  className,
  text = 'Continue to Payment',
  style = {},
  prefix = '',
  suffix = '',
  ...props
}) => {

  const styles = {
    ...style,
    '--custom-form-btn-text': 'white',
    '--custom-form-btn-background': themeColor
  };

  return (
    <div
      className={clx(className, 'form-order-button')}
      {...props}
      style={styles}
    >
      {prefix}
      <ResizableInput
        onChange={onChange}
        name={name}
        defaultValue='Edit'
        value={text}
        style={{ background: 'transparent' }}
      />
      {suffix}
    </div>
  );
};

OrderButton.propTypes = {};

export default OrderButton;
