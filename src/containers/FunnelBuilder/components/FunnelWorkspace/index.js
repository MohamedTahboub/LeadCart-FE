import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default (props) => (
  <div className='funnel-work-space'>
    <div className='product-first-node' />

    <div className='body-node'>

      <span className='add-upsell-btn' />
      <span className='add-down-btn' />
    </div>
  </div>
);

/*

     <span className='add-upsell-btn'>
        <i className='fas fa-plus' />
      </span>
*/