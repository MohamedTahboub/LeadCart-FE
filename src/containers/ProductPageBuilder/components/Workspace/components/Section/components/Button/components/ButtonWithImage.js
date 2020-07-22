import React from 'react';
import common from 'components/common';
import Image from 'components/common/Image';
import clx from 'classnames';

const { FlexBox } = common;

const ButtonWithImage = ({ layout, containerClasses, buttonComponent, image, onImageChange, section }) => {

  return (
    <FlexBox className='fluid py-5' reverse={layout === 'withImageLeft'}>
      <FlexBox className={clx(containerClasses, 'col-6', 'align-center')}>
        {buttonComponent}
      </FlexBox>
      <FlexBox className='col-6 justify-center'>
        <Image
          className='figure-section-image'
          image={image}
          alt='figure illustration photo'
          name={`figure-image-${section.id}`}
          onChange={onImageChange}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default ButtonWithImage;
