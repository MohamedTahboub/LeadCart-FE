import React from 'react';

import './style.css';
const templateBackground = (image) => ({
  background: `url(${image})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
});
export default ({ active, image, ...props }) => (
  <div className='template-preview-container'>
    <div style={templateBackground(image)} className='preview-image'>
      <i className='fas fa-eye' />
      <div>Preview</div>
    </div>
    <div className='template-preview-footer'>
      <span className='template-preview-name'>Classic</span>
      <span className={!active ? 'btn preview-select-btn ' : 'preview-select-btn active-template-preview'}>{!active ? 'Select' : 'active'}</span>
    </div>
  </div>
);
