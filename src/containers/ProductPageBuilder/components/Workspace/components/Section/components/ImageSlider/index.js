import React, { useEffect, useState } from 'react';
import clx from 'classnames';

import common from 'components/common';
import FlexibleBox from 'components/FlexibleBox';
import { useContext } from '../../../../../../actions';
import Image from './Image';
import { getIcon } from 'data/imageSliderIcons';
import PrevButton from './PrevButton';
import NextButton from './NextButton';

import './style.css';

const { FlexBox } = common;


const ImageSlider = ({ section, ...props }) => {
  const [currentContent, setCurrentContent] = useState({});
  const [currentStyle, setCurrentStyle] = useState({});

  const { actions } = useContext();
  const { content = {}, styles = {} } = section;

  const {
    list = [],
    autoPlay,
    duration,
    transitionDuration,
    infinity,
    hasArrows,
    customArrows,
    hasThumbnail,
    effect,
    customNextArrow,
    customPrevArrow
  } = content;


  const { PrevArrow, NextArrow } = getIcon(customArrows);
  const hasContent = currentContent?.id;


  const effectStyle = (() => {
    const hideScalableEffectStyle = { transform: 'scale(0)', opacity: 0, transition: `.${transitionDuration}s all ease-in-out` };
    const showScalableEffectStyle = { transform: 'scale(1)', opacity: 1, transition: `.${transitionDuration}s all ease-in-out` };
    const hideOpacityEffectStyle = { opacity: 0, transition: `.${transitionDuration}s opacity ease-in-out` };
    const showOpacityEffectStyle = { opacity: 1, transition: `.${transitionDuration}s opacity ease-in-out` };

    switch (effect) {
    case 'none':
      return false;
    case 'scale':
      return { hide: hideScalableEffectStyle, show: showScalableEffectStyle };
    case 'opacity':
      return { hide: hideOpacityEffectStyle, show: showOpacityEffectStyle };
    default:
      return {};
    }
  })();


  useEffect(() => {
    !hasContent && setCurrentContent(list[0]);
  }, []);


  useEffect(() => {
    (hasContent && autoPlay) && setTimeout(onMoveToNext, duration);
  }, [autoPlay, hasContent, duration]);


  const onImageChange = ({ value: newImage, name }) => {
    const newList = list.map((ele) => {
      if (ele.id === currentContent?.id)
        return { ...ele, img: newImage };
      else
        return ele;
    });

    actions.onSectionSettingChange({
      section,
      field: { name, value: newList }
    });
    setCurrentContent({ ...currentContent, img: newImage });
  };


  const onSizeChange = (size) => {
    actions.onSectionFieldChange({
      ...section,
      styles: {
        ...styles,
        height: size.height
      }
    });
  };


  const onMoveToPrevious = () => {
    const currentIndex = list.findIndex((ele) => ele.id === currentContent?.id);
    const isTheFirstIndex = currentIndex === 0;
    const lastIndex = list.length - 1;
    const prevIndex = currentIndex - 1;
    const targetedIndex = isTheFirstIndex ? lastIndex : prevIndex;

    if (effectStyle) {
      setCurrentStyle(effectStyle.hide);
      setTimeout(() => {
        setCurrentContent(list[targetedIndex]);
        setCurrentStyle(effectStyle.show);
      }, transitionDuration);
    } else {
      setCurrentContent(list[targetedIndex]);
    }
  };


  const onMoveToNext = () => {
    const currentIndex = list.findIndex((ele) => ele.id === currentContent?.id);
    const isTheLastIndex = currentIndex === list.length - 1;
    const firstIndex = 0;
    const nextIndex = currentIndex + 1;
    const targetedIndex = isTheLastIndex ? firstIndex : nextIndex;

    if (effectStyle) {
      setCurrentStyle(effectStyle.hide);
      setTimeout(() => {
        setCurrentContent(list[targetedIndex]);
        setCurrentStyle(effectStyle.show);
      }, transitionDuration);
    } else {
      setCurrentContent(list[targetedIndex]);
    }
  };


  const onMoveToThumb = (id) => () => {
    const currentElement = list.find((ele) => ele?.id === id);

    if (effectStyle) {
      setCurrentStyle(effectStyle.hide);
      setTimeout(() => {
        setCurrentContent(currentElement);
        setCurrentStyle(effectStyle.show);
      }, transitionDuration);
    } else {
      setCurrentContent(currentElement);
    }
  };


  const arrowsProps = {
    hasArrows,
    onMoveToNext,
    onMoveToPrevious,
    customArrows,
    PrevArrow,
    NextArrow,
    customNextArrow,
    customPrevArrow
  };


  return (
    <FlexibleBox className='image-slider-container' size={{ height: styles.height }} onResizeStop={onSizeChange} column>
      <FlexBox className='image-slider-content' column flex>
        <PrevButton {...arrowsProps} />
        <Image
          img={currentContent?.img}
          onImageChange={onImageChange}
          name='content.list'
          className='image-slider-one-slide'
          style={currentStyle}
        />
        <NextButton {...arrowsProps} />
      </FlexBox>


      {hasThumbnail &&
      <FlexBox className='image-slider-thumbnails-container h-center v-center'>
        {list.map((ele) => {
          return (
            <div
              style={{ backgroundImage: `url(${ele.img})` }}
              className={clx('image-slider-thumbnail-image', { 'active-image-slider-thumbnail-image': ele.id === currentContent?.id })}
              onClick={onMoveToThumb(ele.id)}
            />
          );
        })}
      </FlexBox>
      }
    </FlexibleBox>
  );
};

export default ImageSlider;
