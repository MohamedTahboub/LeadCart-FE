import React from 'react';

import './style.css';

export default ({ text, color = 'lightblue' }) => (
  <div className='upsell-action-btn-container'>
    <span style={{ background: color }} className='action-btn'>{text}</span>
  </div>
);

