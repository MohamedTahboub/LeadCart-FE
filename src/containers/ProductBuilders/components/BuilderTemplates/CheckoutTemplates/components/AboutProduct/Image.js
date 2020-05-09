import React from 'react';
import PropTypes from 'prop-types';

const Image = ({
  className = '',
  src
}) => (
  <div className={`image-container ${className}`}>
    <img src={src} alt='element' className='image-element' />
  </div>
);

Image.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired
};

export default Image;
