import React from 'react';

import common from 'components/common';
import Image from 'components/common/Image';
import { MainTitle } from '../../components';

import './style.css';

const { FlexBox, ResizableTextarea } = common;

const SecondTheme = ({
  introText,
  bodyText,
  img,
  contentHeadlineTextColor,
  containerTextColor,
  containerStyle,
  mainTitleProps,
  onChange,
  onImageChange
}) => {


  return (
    <FlexBox className='bump-offer-second-theme' style={containerStyle} column>
      <MainTitle {...mainTitleProps} />

      <FlexBox className='bump-offer-img-container' >
        <div className='bump-offer-img-bg-container' style={{ backgroundImage: `url(${img})` }} />
        <Image
          image={img}
          name='content.img'
          onChange={onImageChange}
        />
      </FlexBox>

      <FlexBox className='bump-offer-texts' column>
        <ResizableTextarea
          className='bump-offer-headline'
          style={{ color: contentHeadlineTextColor }}
          onChange={onChange}
          value={introText}
          name='content.introText'
        />

        <ResizableTextarea
          className='bump-offer-desc'
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
