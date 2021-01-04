import React from 'react';

import common from 'components/common';
import ImageUploader from './ImageUploader';

import './style.css';

const { FlexBox } = common;

const Image = ({ img, onImageChange, className, hasBlurBackgroundImage, name, style, onOpenImageFile, onCancel, ...props }) => {
  const imageStyle = hasBlurBackgroundImage ? { backgroundImage: `url(${img})` } : {};

  return (
    <FlexBox className={`blur-bg-img-container ${className}`} style={{ ...imageStyle, ...style }} {...props}>
      <div className='blur-bg-img' style={imageStyle} />
      <ImageUploader
        image={img}
        name={name}
        onChange={onImageChange}
        onOpenImageFile={onOpenImageFile}
        onCancel={onCancel}
      />
    </FlexBox>
  );
};

export default Image;
