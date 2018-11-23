import React from 'react';

import './style.css';
const templateBackground = (image) => ({
  background: `url(${image})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
});
export default ({
  active, image, onSelect, name, classes = [], ...props
}) => (
  <div className='template-preview-container'>
    <div style={templateBackground(image)} className='preview-image'>
      {!active && <div className='coming-soon-sign'>well be availabe Soon </div>}
    </div>
    <div className='template-preview-footer'>
      <span className='template-preview-name'>{name}</span>
      {active && (
        <span
          onClick={() => !active && onSelect()}
          className={!active ? 'btn preview-select-btn ' : 'preview-select-btn active-template-preview'}
        >
          {!active ? 'Select' : 'active'}
        </span>
      )}
    </div>
  </div>
);
