import React, { useState } from 'react';
import clx from 'classnames';
import Select from 'react-select';

import common from 'components/common';


import './style.css';

const { FlexBox, Title, Button, CustomCheckbox } = common;


const FontRow = ({ variants = [], family, onSelectFont, isSelectedFont }) => {
  const [activeVariantValue, aetActiveVariantValue] = useState('regular');

  // const onToggle = (e) => () => {
  //   console.log('e >>>>>>>>>>>', e);
  //   aetActiveVariantValue(e);
  // };


  const onSelect = ({ value }) => {
    console.log('value >>>>>>>>>', value);
    aetActiveVariantValue(value);
  };

  const variantsOptions = variants.map((ele) => ({ label: ele, value: ele }));


  return (
    <FlexBox className='my-2 h-center products-google-fonts-row' column >

      <FlexBox className='px-3 py-1 mb-2' column >
        <Title className='m-0 mb-1' >
          {family}
        </Title>

        <Title className='m-0' >
          This text for testing the selected font with its variants
        </Title>
      </FlexBox>

      <Select
        options={variantsOptions}
        onChange={onSelect}
        className='mb-2 ml-2 max-width-200'
        defaultValue={[{ label: activeVariantValue, value: activeVariantValue }]}
      />

      <CustomCheckbox
        // id='checkbox'
        active={isSelectedFont(family)}
        className='products-google-fonts-checkbox-row'
        onClick={onSelectFont({ family, variant: activeVariantValue })}
      />


    </FlexBox>
  );
};

export default FontRow;
