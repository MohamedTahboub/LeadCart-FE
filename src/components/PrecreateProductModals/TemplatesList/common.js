import React from 'react';
import PropTypes from 'prop-types';

export const TemplateThumbnail = ({
  image,
  className,
  order,
  onSelect
}) => (
  <div className={`template-thumbnail-element box-shadow ${className}`}>
    <img src={image} alt='template thumbnail' className='template-thumbnail-image' />
    <div
      onClick={onSelect(`temp${order}`, 'upsell')}
      className='template-thumbnail-select-btn box-shadow'
      role='presentation'
    >
      <div className='select-btn'>
                    Choose This One
      </div>
    </div>
  </div>
);

TemplateThumbnail.propTypes = {
  image: PropTypes.string.isRequired,
  className: PropTypes.string,
  order: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};
TemplateThumbnail.defaultProps = {
  className: ''
};

