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
    <FlexBox className='bump-offer-third-theme' style={containerStyle} column>
      <MainTitle {...mainTitleProps} />

      <FlexBox className='bump-offer-img-container v-center h-center' >
        <Image image={img} onChange={onImageChange} name='content.img' alt='' />
      </FlexBox>

      <FlexBox className='bump-offer-texts' column>
        <ResizableTextarea
          className='bump-offer-headline'
          style={{ color: contentHeadlineTextColor }}
          value={introText}
          name='content.introText'
          onChange={onChange}
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
