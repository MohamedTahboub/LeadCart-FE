import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import ToolTip from 'react-tooltip';
import { connect } from 'react-redux';
import common from 'components/common';
import { passProps } from 'helpers/common';
import { FontDemoCard } from '../components';
import './style.css';
import { isFunction } from 'libs/checks';
import { loadFontLocally } from 'libs';

const { FlexBox } = common;

const FontRow = ({ variants = [], family, onSelectFont, isSelectedFont, files = {}, id, productsFonts }) => {

  const [activeVariantValue, setActiveVariantValue] = useState('regular');
  const [variantLoading, setVariantLoading] = useState('regular');
  const url = files[activeVariantValue];
  const isInstalled = productsFonts.find((ele) => ele.family === family && ele.variant === activeVariantValue);
  const variantsOptions = variants.map((ele) => ({ label: ele, value: ele }));
  const isSelectedFontFamily = isSelectedFont(family);
  const shouldShowCheckBox = Boolean(isInstalled || isSelectedFontFamily);

  const onSelect = ({ value }, e) => {
    setActiveVariantValue(value);
    stopEventPropagation(e);
  };


  const stopEventPropagation = (e) => {
    if (isFunction(e.stopPropagation))
      e.stopPropagation();

    if (isFunction(e.preventDefault))
      e.preventDefault();
  };

  const onLoadCustomFontFile = async () => {
    setVariantLoading(true);
    await loadFontLocally({ family, url });
    setVariantLoading(false);
  };

  useEffect(() => {
    onLoadCustomFontFile();
    // eslint-disable-next-line
  }, [family, url]);


  return (
    <FontDemoCard
      font={{ url, family }}
      onClick={onSelectFont({ family, variant: activeVariantValue, id })}
      active={shouldShowCheckBox}
      loading={variantLoading}
      disabled={isInstalled}
    >
      <FlexBox center='v-center' className='p-2' onClick={stopEventPropagation}>
        <span className='title-text gray-text mr-2'>Font variant:</span>
        <Select
          options={variantsOptions}
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
