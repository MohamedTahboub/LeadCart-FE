import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import common from 'components/common';

import './style.css';

const { FlexBox } = common;

const LabelFontOption = ({ family }) => {
  return (
    <FlexBox column wrappable>
      <span style={{ fontFamily: family }} className='small-text bold-text'>{family}</span>
    </FlexBox>
  );
};

const Fonts = ({ productsFonts = [], onChange, productPage = {} }) => {
  const { font: { url: currentFontUrl } = {} } = productPage;


  const fontsOptions = productsFonts.map(({ url, family } = {}) =>
    ({ value: url, label: <LabelFontOption family={family} /> }));


  const onSelectFont = ({ label: family, value: url }) => {
    const fontName = family?.props?.family;
    if (!fontName) return;
    onChange({
      target: {
        name: 'pageStyles.productPage.font',
        value: {
          family: fontName,
          url
        }
      }
    });
  };


  const selectedFont = productsFonts
    .map(({ family: label, url: value }) => ({ value, label: <LabelFontOption family={label} /> }))
    .find(({ value: fontUrl }) => fontUrl === currentFontUrl);


  return (
    <FlexBox id='custom-font' className='v-center' spaceBetween >
      <Select
        options={fontsOptions}
        onChange={onSelectFont}
        value={selectedFont}
        className='flex-1 mr-2'
        closeMenuOnSelect={false}
      />
    </FlexBox>
  );
};


const mapStateToProps = ({ productsFonts }) => ({ productsFonts });
export default connect(mapStateToProps)(Fonts);

