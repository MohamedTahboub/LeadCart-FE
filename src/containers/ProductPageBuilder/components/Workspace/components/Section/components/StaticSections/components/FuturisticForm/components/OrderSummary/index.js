import React from 'react';
import OrderSummary from '../../../OrderSummary';

import './style.css';

const CustomOrderSummary = (props) => {
  return (
    <div className='customer-order-summary mt-3'>
      <OrderSummary className='m-0' {...props}/>
    </div>
  );
};

CustomOrderSummary.propTypes = {};

export default CustomOrderSummary;
