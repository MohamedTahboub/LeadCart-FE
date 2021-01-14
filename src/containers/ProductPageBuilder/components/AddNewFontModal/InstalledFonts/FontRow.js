import React, { useEffect } from 'react';

import common from 'components/common';

import './style.css';

const { FlexBox, Title, CustomCheckbox } = common;


const FontRow = ({ family, _id, isSelectedFont, onSelectFont, url }) => {
  useEffect(() => {
    const onLoadCustomFontFile = async () => {
      try {
        const fn = new FontFace(family, `url(${url})`);
        await fn.load().catch(console.error);
        window.document.fonts.add(fn);
      } catch (error) {
        console.log(error.message, error);
      }
    };

    onLoadCustomFontFile();
  });


  return (
    <FlexBox className='my-2 px-3 h-center products-custom-fonts-row' column >
      <FlexBox className='v-center py-2'>
        <Title className='m-0 truncate flex-1' >
          {family}
        </Title>

        <CustomCheckbox
          active={isSelectedFont(_id)}
          className='products-installed-fonts-checkbox-row'
          onClick={onSelectFont({ _id })}
        />

      </FlexBox>

      <p className='m-0 large-text' style={{ 'font-family': family }}>
        This text for display the result for this font with the selected variant
      </p>
    </FlexBox>
  );
};

export default FontRow;
