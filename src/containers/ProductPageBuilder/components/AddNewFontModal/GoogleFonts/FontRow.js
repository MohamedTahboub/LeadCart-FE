import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import ToolTip from 'react-tooltip';
import { connect } from 'react-redux';

import common from 'components/common';
import { passProps } from 'helpers/common';

import { FontDemoCard } from '../components';
import './style.css';
import { isFunction } from 'libs/checks';

const { FlexBox } = common;

const FontRow = ({ variants = [], family, onSelectFont, isSelectedFont, files = {}, id, productsFonts }) => {
  const [activeVariantValue, setActiveVariantValue] = useState('regular');
  const [variantLoading, setVariantLoading] = useState('regular');
  const url = files[activeVariantValue];
  const isInstalled = productsFonts.find((ele) => ele.family === family && ele.variant === activeVariantValue);

  const onSelect = ({ value }, e) => {
    setActiveVariantValue(value);
    preventDefaultEvent(e);
  };

  const variantsOptions = variants.map((ele) => ({ label: ele, value: ele }));

  const preventDefaultEvent = (e) => {
    if (isFunction(e.preventDefault))
      e.preventDefault();
  };
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

  useEffect(() => {
    onLoadCustomFontFile();
  }, [activeVariantValue]);

  const isSelectedFontFamily = isSelectedFont(family);
  const shouldShowCheckBox = Boolean(isInstalled || isSelectedFontFamily);


  return (
    <FontDemoCard
      font={{ url, family }}
      onClick={onSelectFont({ family, variant: activeVariantValue, id })}
      active={shouldShowCheckBox}
      disabled={isInstalled}
    >
      <FlexBox center='v-center' className='p-2'>
        <span className='title-text gray-text mr-2'>Font variant:</span>
        <Select
          options={variantsOptions}
          onClick={preventDefaultEvent}
          onChange={onSelect}
          className='ml-2 max-width-200 flex'
          defaultValue={[{ label: activeVariantValue, value: activeVariantValue }]}
          isLoading={variantLoading}
        />
      </FlexBox>
      <ToolTip />
    </FontDemoCard>

  );
};

export default connect(passProps('productsFonts'))(FontRow);
