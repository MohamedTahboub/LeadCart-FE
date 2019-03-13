import React from 'react';

import './style.css';
const templateBackground = (image) => ({
  background: `url(${image})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
});
export default ({
  active, image, onSelect, name, className = '', ...props
}) => (
  <div className={`template-preview-container ${className}`}>
    <div
      onClick={() => onSelect(name)} style={templateBackground(image)}
      className={active ? 'preview-image active-template-preview' : 'preview-image'}
    />
  </div>
);
