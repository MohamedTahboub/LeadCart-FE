import React from 'react';
import 'react-toggle/style.css';

import common from 'components/common';
import { MainTitle } from '../../components';
import './style.css';
const {
  ResizableTextarea,
  FlexBox
} = common;


const BumpOffer = ({
  introText,
  bodyText,
  contentHeadlineTextColor,
  containerTextColor,
  containerStyle,
  mainTitleProps,
  onChange
}) => {


  return (
    <FlexBox style={containerStyle} className='product-template-bump-offer'>

      <MainTitle {...mainTitleProps} className='margin-v-10' />

      <FlexBox className='bump-offer-texts' column>
        <ResizableTextarea
          className='bump-offer-headline'
          style={{ color: contentHeadlineTextColor }}
          name='content.introText'
          value={introText}
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

export default BumpOffer;
