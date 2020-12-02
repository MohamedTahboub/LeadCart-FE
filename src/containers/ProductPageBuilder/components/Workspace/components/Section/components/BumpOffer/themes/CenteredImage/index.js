import React from 'react';

import defaultCenteredImage from 'assets/images/bumpOffers_templates/defaultCenteredImage.png';
import common from 'components/common';
import { Image, MainTitle } from '../../components';

import './style.css';

const { FlexBox, ResizableTextarea } = common;

const SecondTheme = ({
  introText,
  bodyText,
  img = defaultCenteredImage,
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
    <FlexBox className='bump-offer-centered-image' style={containerStyle} column>
      <MainTitle {...mainTitleProps} />
      <Image className='my-2' {...imageProps}/>

      <FlexBox className='bump-offer-texts' column>
        <ResizableTextarea
          className='bump-offer-headline'
          style={{ color: contentHeadlineTextColor, fontWeight: 'bold' }}
          value={introText}
          name='content.introText'
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
    </FlexBox>
  );
};


export default SecondTheme;
