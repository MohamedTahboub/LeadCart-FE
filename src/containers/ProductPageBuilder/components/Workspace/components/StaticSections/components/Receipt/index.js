import React from 'react';
import clx from 'classnames';
import common from 'components/common';
import OrderRecept from './components/OrderReceipt';

import './style.css';
const { FlexBox } = common;

const mock = {
  details: {
    purchases: [
      { amount: 150, name: 'Valuable item' }
    ],
    date: new Date()
  }
};

const Receipt = ({ className }) => {
  return (
    <FlexBox
      center='h-center'
      className={clx('figure-section', className)}
    >
      <OrderRecept {...mock} />
    </FlexBox>
  );
};

Receipt.propTypes = {};
Receipt.defaultProps = {};

export default Receipt;
