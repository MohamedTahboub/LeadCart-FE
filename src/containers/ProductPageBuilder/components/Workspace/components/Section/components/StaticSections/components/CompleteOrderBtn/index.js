import React from 'react';
import common from 'components/common';
import clx from 'classnames';

import './style.css';

const { ResizableInput, FlexBox, Checkbox } = common;

const CompleteOrderBtn = ({
  className,
  text,
  color: background = '#4da1ff',
  onChange,
  content = { termsCheckbox: 'I agree to the' },
  name = 'custom.orderButtonText'
}) => {
  const style = { background };
  return (
    <FlexBox column>
      <FlexBox />
      <div style={style} className={clx(className, 'template-complete-order')}>
        <ResizableInput
          onChange={onChange}
          name={name}
          defaultValue='Complete Order'
          value={text}
          style={{ fontWeight: 'bold' }}
        />
      </div>
    </FlexBox>
  );
};

export default CompleteOrderBtn;
