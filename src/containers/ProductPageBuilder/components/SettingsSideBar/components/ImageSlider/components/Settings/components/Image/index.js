import React from 'react';

import common from 'components/common';
import ImageUploader from 'components/common/Image';

import './style.css';

const { FlexBox } = common;

const Image = ({ img, onImageChange, className, hasBlurBackgroundImage, name, style, ...props }) => {
  const imageStyle = hasBlurBackgroundImage ? { backgroundImage: `url(${img})` } : {};

  return (
    <FlexBox className={`blur-bg-img-container ${className}`} style={{ ...imageStyle, ...style }} {...props}>
      <div className='blur-bg-img' style={imageStyle} />
      <ImageUploader
        image={img}
        name={name}
        onChange={onImageChange}
      />
    </FlexBox>
  );
};

export default Image;
