import React, { useEffect, useRef, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';


import FlexibleBox from 'components/FlexibleBox';
import defaultDropImage from 'assets/images/upload-image.png';
import { getIcon } from 'data/imageSliderIcons';
import { useContext } from '../../../../../../actions';
import ImageContent from './ImageContent';

import './style.css';


const getIndicators = (images) => (currentIndex) => {
  const { src: currentSrc } = images.find((ele, index) => index === currentIndex) || {};
  return (
    <div
      className='image-slider-indicator'
      style={{ backgroundImage: `url(${currentSrc || defaultDropImage})` }}
    />
  );
};


const ImageSlider = ({ section, ...props }) => {
  const { actions } = useContext();
  const { content = {}, styles = {} } = section;
  const {
    images = [],
    autoplay = true,
    transitionDuration = 1000,
    duration = 5000,
    hasArrows = true,
    customPrevArrow,
    customNextArrow,
    infinite = true,
    isCustom = '',
    indicators = true
  } = content;


  const { PrevArrow, NextArrow } = getIcon(isCustom);

  const prevArrow = (customPrevArrow && isCustom === true) ?
    <img src={customPrevArrow} style={{ width: '16px', height: '16px', cursor: 'pointer' }} alt='' /> : <PrevArrow className='item-clickable' size={20} />;

  const nextArrow = (customNextArrow && isCustom === true) ?
    <img src={customNextArrow} style={{ width: '16px', height: '16px', cursor: 'pointer' }} alt='' /> : <NextArrow className='item-clickable' size={20} />;


  const onSizeChange = (size) => {
    actions.onSectionFieldChange({
      ...section,
      styles: {
        ...(section?.styles || {}),
        height: size.height
      }
    });
  };

  const sliderProps = {
    autoplay,
    transitionDuration,
    prevArrow,
    nextArrow,
    infinite,
    arrows: hasArrows,
    duration
  };


  return (
    <FlexibleBox
      size={{ height: styles.height }}
      onResizeStop={onSizeChange}
      showOnParentHover
      className='image-slider-container'
    >

      <Slide
        className='image-slider-main-content'
        indicators={indicators ? getIndicators(images) : false}
        {...sliderProps}
      >

        {images.map(({ src, id }) => (<ImageContent src={src} id={id} section={section} actions={actions} />))}

      </Slide>
    </FlexibleBox>
  );
};

export default ImageSlider;
