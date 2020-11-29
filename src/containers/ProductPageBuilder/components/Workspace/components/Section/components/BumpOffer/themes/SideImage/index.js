import React from 'react';
import clx from 'classnames';

import defaultSideImage from 'assets/images/bumpOffers_templates/defaultSideImage.png';
import common from 'components/common';
import Image from 'components/common/Image';
import { MainTitle } from '../../components';

import './style.css';

const { FlexBox, ResizableTextarea } = common;

const WithSideImage = ({
  introText,
  bodyText,
  img = defaultSideImage,
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
    <FlexBox className='bump-offer-side-image' style={containerStyle} column>
      <MainTitle {...mainTitleProps} />
      <FlexBox className='bump-offer-main-content v-center' reverse={isWithRightImgTheme}>
        <FlexBox className='bump-offer-side-image-container v-center'>
          <Image
            image={img}
            name='content.img'
            onChange={onImageChange}
          />
        </FlexBox>

        <FlexBox className={clx('bump-offer-texts', { 'mr-3': isWithRightImgTheme }, { 'ml-3': !isWithRightImgTheme })} column>
          <ResizableTextarea
            className='bump-offer-headline'
            style={{ color: contentHeadlineTextColor, fontWeight: 'bold' }}
            name='content.introText'
            value={introText}
            onChange={onChange}
          />

          <ResizableTextarea
            style={{ color: containerTextColor }}
            name='content.bodyText'
            value={bodyText}
            onChange={onChange}
            className='bump-offer-desc small-text'
          />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default WithSideImage;
