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
  const [disabledNextButton, setDisabledNextButton] = useState(false);
  const [disabledPrevButton, setDisabledPrevButton] = useState(false);

  const { actions } = useContext();
  const { content = {}, styles = {} } = section;

  const {
    list = [],
    autoPlay,
    duration,
    transitionDuration,
    infinity = true,
    hasArrows,
    customArrows,
    hasThumbnail,
    effect,
    customNextArrow,
    customPrevArrow
  } = content;


  const {
    backgroundColor = '#FFFFFF00',
    borderColor,
    borderStyle = 'solid',
    borderWidth = 0,
    borderTopLeftRadius = 0,
    borderTopRightRadius = 0,
    borderBottomLeftRadius = 0,
    borderBottomRightRadius = 0,
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,
    hasBlurBackgroundImage = false
  } = styles;


  const contentStyle = {
    backgroundColor,
    borderColor,
    borderStyle,
    borderWidth,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft
  };


  const { PrevArrow, NextArrow } = getIcon(customArrows);
  const hasContent = currentContent?.img;


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


  const getItemIndex = (item) => list.findIndex((ele) => item?.img === ele.img);
  const currentIndexItem = getItemIndex(currentContent);


  const onImageChange = ({ value: newImage, name }) => {

    const newList = list.map((ele, index) => {
      if (currentIndexItem === index)
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
    const isTheFirstIndex = currentIndexItem === 0;
    const lastIndex = list.length - 1;
    const prevIndex = currentIndexItem - 1;
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
    const isTheLastIndex = currentIndexItem === list.length - 1;
    const firstIndex = 0;
    const nextIndex = currentIndexItem + 1;
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


  const onMoveToThumb = (ele) => () => {
    const currentIndex = getItemIndex(ele);
    const currentElement = list.find((ele, index) => currentIndex === index);

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


  useEffect(() => {
    !hasContent && setCurrentContent(list[0]);
  }, []);


  useEffect(() => {
    (hasContent && autoPlay) && setTimeout(onMoveToNext, duration);
  }, [autoPlay, hasContent, duration]);


  useEffect(() => {
    const isTheFirstIndex = currentIndexItem === 0;
    const isTheLastIndex = currentIndexItem === list.length - 1;

    if (!infinity && isTheLastIndex)
      setDisabledNextButton(true);
    else
      setDisabledNextButton(false);

    if (!infinity && isTheFirstIndex)
      setDisabledPrevButton(true);
    else
      setDisabledPrevButton(false);
  }, [infinity, currentIndexItem]);


  const arrowsProps = {
    hasArrows,
    onMoveToNext,
    onMoveToPrevious,
    customArrows,
    PrevArrow,
    NextArrow,
    customNextArrow,
    customPrevArrow,
    disabledPrevButton,
    disabledNextButton
  };


  return (
    <FlexibleBox
      className='image-slider-container'
      size={{ height: styles.height }}
      onResizeStop={onSizeChange}
      style={contentStyle}
      column
    >
      <FlexBox className='image-slider-content' column flex>
        <PrevButton {...arrowsProps} />
        <Image
          img={currentContent?.img}
          onImageChange={onImageChange}
          name='content.list'
          className='image-slider-one-slide'
          style={currentStyle}
          hasBlurBackgroundImage={hasBlurBackgroundImage}
        />
        <NextButton {...arrowsProps} />
      </FlexBox>


      {hasThumbnail &&
      <FlexBox className='image-slider-thumbnails-container h-center v-center'>
        {list.map((ele, index) => {
          return (
            <div
              style={{ backgroundImage: `url(${ele.img})` }}
              className={clx('image-slider-thumbnail-image', { 'active-image-slider-thumbnail-image': currentIndexItem === index })}
              onClick={onMoveToThumb(ele)}
            />
          );
        })}
      </FlexBox>
      }
    </FlexibleBox>
  );
};

export default ImageSlider;
