import React from 'react';

import common from 'components/common';
import ImageUploader from 'components/common/Image';

import './style.css';

const { FlexBox } = common;

export const Image = ({ img, onImageChange, className, hasBlurBackgroundImage, ...props }) => {
  const imageStyle = hasBlurBackgroundImage ? { backgroundImage: `url(${img})` } : {};

  return (
    <FlexBox className={`blur-bg-img-container ${className}`} style={imageStyle} {...props}>
      <div className='blur-bg-img' style={imageStyle} />
      <ImageUploader
        image={img}
        name='content.img'
        onChange={onImageChange}
      />
    </FlexBox>
  );
};

export default Image;
