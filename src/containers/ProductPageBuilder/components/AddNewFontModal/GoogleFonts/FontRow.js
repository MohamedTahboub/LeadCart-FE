import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import common from 'components/common';


import './style.css';

const { FlexBox, Title, CustomCheckbox } = common;


const FontRow = ({ variants = [], family, onSelectFont, isSelectedFont, files = {} }) => {
  const [activeVariantValue, setActiveVariantValue] = useState('regular');

  const onSelect = ({ value }) => setActiveVariantValue(value);

  const variantsOptions = variants.map((ele) => ({ label: ele, value: ele }));

  useEffect(() => {
    const onLoadCustomFontFile = async () => {
      try {
        const fn = new FontFace(family, `url(${files[activeVariantValue]})`);
        await fn.load().catch(console.error);
        window.document.fonts.add(fn);
      } catch (error) {
        console.log(error.message, error);
      }
    };

    onLoadCustomFontFile();
  }, [activeVariantValue]);


  return (
    <FlexBox className='my-2 h-center px-3 products-google-fonts-row' column >
      <FlexBox className='v-center py-2' >
        <Title className='m-0 truncate flex-1' >
          {family}
        </Title>

        <CustomCheckbox
          active={isSelectedFont(family)}
          className='products-google-fonts-checkbox-row'
          onClick={onSelectFont({ family, variant: activeVariantValue })}
        />
      </FlexBox>

      <p className='m-0 large-text' style={{ 'font-family': family }}>
        This text for display the result for this font with the selected variant
      </p>

      <Select
        options={variantsOptions}
        onChange={onSelect}
        className='mb-2 ml-2 max-width-200'
        defaultValue={[{ label: activeVariantValue, value: activeVariantValue }]}
      />
    </FlexBox>
  );
};

export default FontRow;
