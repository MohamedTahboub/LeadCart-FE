import React from 'react';

import defaultBottomImage from 'assets/images/bumpOffers_templates/defaultBottomImage.png';
import common from 'components/common';
import { Image, MainTitle } from '../../components';

import './style.css';

const { FlexBox, ResizableTextarea } = common;

const SecondTheme = ({
  introText,
  bodyText,
  img = defaultBottomImage,
  contentHeadlineTextColor,
  containerTextColor,
  containerStyle,
  mainTitleProps,
  onChange,
  onImageChange,
  hasBlurBackgroundImage
}) => {
  const imageProps = { img, onImageChange, hasBlurBackgroundImage };


  return (
    <FlexBox className='bump-offer-bottom-image' style={containerStyle} column>
      <FlexBox className='bump-offer-texts' column>
        <ResizableTextarea
          className='bump-offer-headline'
          style={{ color: contentHeadlineTextColor, fontWeight: 'bold' }}
          name='content.introText'
          value={introText}
          onChange={onChange}
        />
        <ResizableTextarea
          className='bump-offer-desc small-text'
          style={{ color: containerTextColor }}
          value={bodyText}
          name='content.bodyText'
          onChange={onChange}
        />
      </FlexBox>

      <MainTitle {...mainTitleProps} className='margin-v-10' />
      <Image {...imageProps}/>
    </FlexBox>

  );
};


export default SecondTheme;
