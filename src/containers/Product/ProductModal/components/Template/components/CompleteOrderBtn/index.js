import React from 'react';
import common from 'components/common'

import './style.css'

const { EditableField } = common

const CompleteOrderBtn = ({ text, color: background, onChange }) => {

  const style = { background };
  return (
    <div style={style} className="template-complete-order">
      <EditableField
        name='checkoutPage.checkoutButtonText'
        onChange={onChange}
        value={text}
        defaultValue='Complete Order'
        className='template-complete-order-input'
      />
    </div>
  );
};

export default CompleteOrderBtn;