import React from 'react';

import defaultTopImage from 'assets/images/bumpOffers_templates/defaultTopImage.png';
import common from 'components/common';
import { Image, MainTitle } from '../../components';

import './style.css';

const { FlexBox, ResizableTextarea } = common;

const SecondTheme = ({
  introText,
  bodyText,
  img = defaultTopImage,
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
    <FlexBox className='bump-offer-top-image' style={containerStyle} column>
      <MainTitle {...mainTitleProps} />
      <Image className='my-2' {...imageProps} />

      <FlexBox className='bump-offer-texts' column>
        <ResizableTextarea
          className='bump-offer-headline'
          style={{ color: contentHeadlineTextColor, fontWeight: 'bold' }}
          onChange={onChange}
          value={introText}
          name='content.introText'
        />

        <ResizableTextarea
          className='bump-offer-desc small-text'
          style={{ color: containerTextColor }}
          value={bodyText}
          name='content.bodyText'
          onChange={onChange}
        />
      </FlexBox>
    </FlexBox>
  );
};


export default SecondTheme;
