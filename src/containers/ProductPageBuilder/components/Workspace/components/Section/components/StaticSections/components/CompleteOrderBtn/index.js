import React from 'react';
import common from 'components/common';

import './style.css';

const { ResizableInput } = common;

const CompleteOrderBtn = ({
  text,
  color: background = '#4da1ff',
  onChange,
  name = 'custom.orderButtonText'
}) => {
  const style = { background };
  return (
    <div style={style} className='template-complete-order'>
      <ResizableInput
        onChange={onChange}
        name={name}
        defaultValue='Complete Order'
        value={text}
        style={{ fontWeight: 'bold' }}
      />
    </div>
  );
};

export default CompleteOrderBtn;
