import React from 'react';
import clx from 'classnames';

import common from 'components/common';
import Image from 'components/common/Image';
import { MainTitle } from '../../components';

import './style.css';

const { FlexBox, ResizableTextarea } = common;

const WithSideImage = ({
  introText,
  bodyText,
  img,
  contentHeadlineTextColor,
  containerTextColor,
  theme,
  containerStyle,
  mainTitleProps,
  onChange,
  onImageChange
}) => {
  const isWithRightImgTheme = theme === 'RightImage';

  return (
    <FlexBox className='bump-offer-side-img' style={containerStyle} column>
      <MainTitle {...mainTitleProps} />
      <FlexBox className='bump-offer-main-content v-center' reverse={isWithRightImgTheme}>
        <FlexBox className='bump-offer-side-img-container v-center'>
          <Image
            image={img}
            name='content.img'
            onChange={onImageChange}
          />
        </FlexBox>

        <FlexBox className={clx('bump-offer-texts', { 'mr-3': isWithRightImgTheme }, { 'ml-3': !isWithRightImgTheme })} column>
          <ResizableTextarea
            className='bump-offer-headline'
            style={{ color: contentHeadlineTextColor }}
            name='content.introText'
            value={introText}
            onChange={onChange}
          />

          <ResizableTextarea
            style={{ color: containerTextColor }}
            name='content.bodyText'
            value={bodyText}
            onChange={onChange}
            className='bump-offer-desc'
          />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default WithSideImage;
