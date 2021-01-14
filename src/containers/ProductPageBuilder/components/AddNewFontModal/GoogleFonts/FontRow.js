import React, { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';
import ToolTip from 'react-tooltip';


import common from 'components/common';
import useFont from 'libs/hooks/useFont';


import './style.css';
import { connect } from 'react-redux';
import { passProps } from 'helpers/common';

const { FlexBox, Title, CustomCheckbox } = common;


const FontRow = ({ variants = [], family, onSelectFont, isSelectedFont, files = {}, id, productsFonts }) => {
  const [activeVariantValue, setActiveVariantValue] = useState('regular');
  const [variantLoading, setVariantLoading] = useState('regular');
  const url = files[activeVariantValue];
  const fontName = useCallback(useFont({ url: url, family }), [activeVariantValue]);
  const isInstalled = productsFonts.find((ele) => ele.family === family && ele.variant === activeVariantValue);

  const onSelect = ({ value }) => setActiveVariantValue(value);
  const variantsOptions = variants.map((ele) => ({ label: ele, value: ele }));

  useEffect(() => {
    const onLoadCustomFontFile = async () => {
      try {
        setVariantLoading(true);
        const fn = new FontFace(family, `url(${url})`);
        await fn.load().catch(console.error);
        window.document.fonts.add(fn);
        setVariantLoading(false);
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
          active={isInstalled || isSelectedFont(family)}
          className='products-google-fonts-checkbox-row'
          onClick={onSelectFont({ family, variant: activeVariantValue, id })}
          disabled={isInstalled}
          data-tip='This Font is installed'
          data-tip-disable={!isInstalled}
          data-place='left'

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
        isLoading={variantLoading}
      />

      <ToolTip />
    </FlexBox>
  );
};

export default connect(passProps('productsFonts'))(FontRow);
